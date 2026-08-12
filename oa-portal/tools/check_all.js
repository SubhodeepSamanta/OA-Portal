'use strict';
/**
 * Full-system check: pushes every problem's reference solution through the
 * real HTTP API and requires AC on the complete hidden suite.
 *
 * Also confirms a deliberately wrong solution is rejected on each problem,
 * so we know the tests actually discriminate rather than passing anything.
 */
const fs = require('node:fs');
const path = require('node:path');

const BASE = process.env.BASE || 'http://localhost:4321';
const PROBLEMS = path.join(__dirname, '..', 'problems');

let token = null;
async function call(p, opts = {}) {
  const r = await fetch(BASE + p, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
  });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}

// A solution that compiles and runs but is wrong, per problem.
// Each is wrong in a realistic way, not "print 0".
const WRONG = {
  m1: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long k;cin>>n>>k;set<long long>s;s.insert(0);long long p=0,a=0;for(int i=0;i<n;i++){long long v;cin>>v;p+=v;if(s.count(p-k))a++;s.insert(p);}cout<<a<<'\\n';}`,
  m2: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,w;cin>>n>>w;vector<int>a(n);for(auto&x:a)cin>>x;for(int i=0;i+w<=n;i++){cout<<a[i]<<(i+w==n?'\\n':' ');}}`,
  m3: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int m,q;cin>>m>>q;vector<long long>d(m+2,0);for(int i=0;i<q;i++){int l,r;long long x;cin>>l>>r>>x;d[l]+=x;}long long c=0,b=-1;int g=1;for(int i=1;i<=m;i++){c+=d[i];if(c>b){b=c;g=i;}}cout<<g<<' '<<b<<'\\n';}`,
  m4: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<int>a(n);for(auto&x:a)cin>>x;sort(a.begin(),a.end());int best=1,cur=1;for(size_t i=1;i<a.size();i++){if(a[i]==a[i-1]+1)cur++;else cur=1;best=max(best,cur);}cout<<best<<'\\n';}`,
  m5: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long k;cin>>n>>k;map<long long,int>f;f[0]=-1;long long p=0;int b=0;for(int i=0;i<n;i++){long long v;cin>>v;p+=v;if(f.count(p-k))b=max(b,i-f[p-k]);f[p]=i;}cout<<b<<'\\n';}`,
  m6: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<pair<int,int>>e;for(int i=0;i<n;i++){int s,t;cin>>s>>t;e.push_back({s,1});e.push_back({t,2});}sort(e.begin(),e.end());int c=0,b=0;for(auto&p:e){c+=(p.second==1?1:-1);b=max(b,c);}cout<<b<<'\\n';}`,
  m7: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>a(n);for(auto&x:a)cin>>x;long long best=a[0],cur=a[0];for(int i=1;i<n;i++){cur=max(a[i],cur+a[i]);best=max(best,cur);}cout<<best<<'\\n';}`,

  // m8: always performs the swap, even when it makes the total worse
  m8: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>a(n);for(auto&x:a)cin>>x;long long base=0,mn=LLONG_MAX,mx=LLONG_MIN;for(int i=0;i<n;i++){if(i%2==0){base+=a[i];mn=min(mn,a[i]);}else mx=max(mx,a[i]);}if(mx==LLONG_MIN||mn==LLONG_MAX){cout<<base<<'\\n';return 0;}cout<<base+(mx-mn)<<'\\n';}`,

  // m9: scores raw values instead of counting only odd amounts
  m9: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>a(n);for(auto&x:a)cin>>x;long long base=0,mn=LLONG_MAX,mx=LLONG_MIN;for(int i=0;i<n;i++){if(i%2==0){base+=a[i];mn=min(mn,a[i]);}else mx=max(mx,a[i]);}long long ans=base;if(mx!=LLONG_MIN&&mn!=LLONG_MAX)ans=max(ans,base+(mx-mn));cout<<ans<<'\\n';}`,

  // m10: forgets that removing EVERYTHING is allowed (no min with 0)
  m10: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>a(n);for(auto&x:a)cin>>x;long long tot=0;for(auto v:a)tot+=v;long long cur=a[0],best=a[0];for(int i=1;i<n;i++){cur=min(a[i],cur+a[i]);best=min(best,cur);}cout<<tot-best<<'\\n';}`,

  // m11: never requires at least one 'b' to survive
  m11: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){string s;cin>>s;int n=s.size();long long tA=0,tB=0;for(char c:s)(c=='a'?tA:tB)++;long long best=LLONG_MAX,aB=0,bB=0;for(int i=0;i<=n;i++){if(aB>=1)best=min(best,bB+(tA-aB));if(i<n){if(s[i]=='a')aB++;else bB++;}}cout<<(best==LLONG_MAX?-1:best)<<'\\n';}`,

  // m13: maximises the SUM of (a-t) instead of the LENGTH of a qualifying run
  m13: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long t;cin>>n>>t;vector<long long>b(n);for(int i=0;i<n;i++){long long v;cin>>v;b[i]=v-t;}long long cur=0,best=0;int len=0,bl=0;for(int i=0;i<n;i++){if(cur+b[i]>=0){cur+=b[i];len++;}else{cur=0;len=0;}if(cur>best){best=cur;bl=len;}}cout<<bl<<'\\n';}`,

  // m14: walks up one step at a time - correct but O(n) per query, so it TLEs
  m14: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<int>par(n+1,1);for(int i=2;i<=n;i++)scanf("%d",&par[i]);vector<char>on(n+1,0);while(q--){int u,v;scanf("%d %d",&u,&v);for(int x=u;;x=par[x]){on[x]=1;if(x==1)break;}int a=1;for(int x=v;;x=par[x]){if(on[x]){a=x;break;}if(x==1)break;}printf("%d\\n",a);for(int x=u;;x=par[x]){on[x]=0;if(x==1)break;}}}`,

  // m15: plain no-two-adjacent DP - never uses the concession
  m15: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>p(n);for(auto&x:p)cin>>x;long long no=0,yes=p[0];for(int i=1;i<n;i++){long long nn=max(no,yes),ny=no+p[i];no=nn;yes=ny;}cout<<max(no,yes)<<'\\n';}`,

  // m16: counts EVERY descendant, ignoring the depth budget k
  m16: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,k;scanf("%d %d",&n,&k);vector<int>par(n+1,0);for(int i=2;i<=n;i++)scanf("%d",&par[i]);vector<long long>sz(n+1,1);for(int i=n;i>=2;i--)sz[par[i]]+=sz[i];string o;for(int i=1;i<=n;i++){if(i>1)o+=' ';o+=to_string(sz[i]-1);}o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,

  // m17: always prices as if there were a single tier
  m17: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,k;cin>>n>>k;vector<long long>v(n);for(auto&x:v)cin>>x;sort(v.begin(),v.end(),greater<long long>());long long best=0;for(int i=0;i<n;i++)best=max(best,v[i]*(long long)(i+1));cout<<best<<'\\n';}`,

  // m12: charges r for every deletion, ignoring the cheaper front/back trims
  m12: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){string s;long long p,q,r;cin>>s>>p>>q>>r;int n=s.size();long long tA=0,tB=0;for(char c:s)(c=='a'?tA:tB)++;long long best=LLONG_MAX,aB=0,bB=0;for(int i=0;i<=n;i++){if(aB>=1&&(tB-bB)>=1)best=min(best,r*(bB+(tA-aB)));if(i<n){if(s[i]=='a')aB++;else bB++;}}cout<<(best==LLONG_MAX?-1:best)<<'\\n';}`,

  m18: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long k;cin>>n>>k;long long tot=0,mx=0;for(int i=0;i<n;i++){long long v;cin>>v;tot+=v;mx=max(mx,v);}cout<<max(mx,(tot+k-1)/k)<<'\\n';}`,

  m19: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;cin>>n>>m;vector<long long>t((size_t)2*m,0);for(int i=0;i<n;i++)cin>>t[i];sort(t.rbegin(),t.rend());long long best=0;for(int i=0;i<m;i++)best=max(best,t[2*i]+t[2*i+1]);cout<<best<<'\\n';}`,

  m20: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<array<long long,3>>e(n);for(int i=0;i<n;i++){long long a,b;cin>>a>>b;e[i]={a,b,(long long)(i+1)};}sort(e.begin(),e.end());vector<long long>endOf;vector<int>h1;for(auto&x:e){long long s=x[0],t=x[1];int h=-1;for(size_t j=0;j<endOf.size();j++)if(endOf[j]<s){h=(int)j;break;}if(h<0){endOf.push_back(t);h=(int)endOf.size()-1;}else endOf[h]=t;if(h==0)h1.push_back((int)x[2]);}cout<<endOf.size()<<'\\n'<<h1.size();for(int v:h1)cout<<' '<<v;cout<<'\\n';}`,

  m21: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>L(n);for(auto&x:L)cin>>x;sort(L.begin(),L.end());long long cur=L[0],tot=0;for(int i=1;i<n;i++){cur+=L[i];tot+=cur;}cout<<tot<<'\\n';}`,

  m22: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<long long>h(n);for(auto&x:h)cin>>x;sort(h.rbegin(),h.rend());long long best=0;for(int i=0;i<n;i++)best=max(best,h[i]*(long long)(i+1));cout<<best<<'\\n';}`,

  m23: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;cin>>n;vector<pair<long long,long long>>j(n);for(auto&x:j)cin>>x.first>>x.second;sort(j.begin(),j.end());priority_queue<long long,vector<long long>,greater<long long>>pq;long long t=0,tot=0;int i=0;while(i<n||!pq.empty()){if(pq.empty())t=max(t,j[i].first);while(i<n&&j[i].first<=t)pq.push(j[i++].second);long long c=pq.top();pq.pop();t+=c;tot+=t;}cout<<tot<<'\\n';}`,

  // m24: checks descendants but forgets to check the ancestors on lock
  m24: `#include <bits/stdc++.h>\nusing namespace std;\nint n,q;vector<int>par,lb;vector<vector<int>>ch;\nvoid col(int v,vector<int>&o){for(int c:ch[v]){if(lb[c])o.push_back(c);col(c,o);}}\nint main(){scanf("%d %d",&n,&q);par.assign(n+1,0);for(int i=2;i<=n;i++)scanf("%d",&par[i]);ch.assign(n+1,{});for(int i=2;i<=n;i++)ch[par[i]].push_back(i);lb.assign(n+1,0);string out;for(int i=0;i<q;i++){int t,v,u;scanf("%d %d %d",&t,&v,&u);bool ok=false;if(t==1){vector<int>d;col(v,d);if(!lb[v]&&d.empty()){lb[v]=u;ok=true;}}else if(t==2){if(lb[v]&&lb[v]==u){lb[v]=0;ok=true;}}else{if(!lb[v]){vector<int>d;col(v,d);bool a=!d.empty();for(int x:d)if(lb[x]!=u)a=false;if(a){for(int x:d)lb[x]=0;lb[v]=u;ok=true;}}}out+=ok?"true\\n":"false\\n";}fwrite(out.data(),1,out.size(),stdout);}`,

  // m25: count forgets that v itself may be locked
  m25: `#include <bits/stdc++.h>\nusing namespace std;\nint n,q;vector<int>par,lb;vector<vector<int>>ch;\nvoid col(int v,vector<int>&o){for(int c:ch[v]){if(lb[c])o.push_back(c);col(c,o);}}\nint main(){scanf("%d %d",&n,&q);par.assign(n+1,0);for(int i=2;i<=n;i++)scanf("%d",&par[i]);ch.assign(n+1,{});for(int i=2;i<=n;i++)ch[par[i]].push_back(i);lb.assign(n+1,0);string out;for(int i=0;i<q;i++){int t,v,u;scanf("%d %d %d",&t,&v,&u);if(t==4){vector<int>d;col(v,d);out+=to_string((long long)d.size());out+='\\n';continue;}bool ok=false;if(t==1){bool bad=lb[v]!=0;for(int x=par[v];x&&!bad;x=par[x])if(lb[x])bad=true;if(!bad){vector<int>d;col(v,d);if(!d.empty())bad=true;}if(!bad){lb[v]=u;ok=true;}}else if(t==2){if(lb[v]&&lb[v]==u){lb[v]=0;ok=true;}}else{if(!lb[v]){vector<int>d;col(v,d);bool a=!d.empty();for(int x:d)if(lb[x]!=u)a=false;if(a){for(int x:d)lb[x]=0;lb[v]=u;ok=true;}}}out+=ok?"true\\n":"false\\n";}fwrite(out.data(),1,out.size(),stdout);}`,

  // m26: plain shortest path - the free passes are read and then ignored
  m26: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m,k;scanf("%d %d %d",&n,&m,&k);vector<vector<pair<int,long long>>>g(n+1);for(int i=0;i<m;i++){int u,v;long long c;scanf("%d %d %lld",&u,&v,&c);g[u].push_back({v,c});g[v].push_back({u,c});}const long long INF=LLONG_MAX/4;vector<long long>d(n+1,INF);priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>>pq;d[1]=0;pq.push({0,1});while(!pq.empty()){auto t=pq.top();pq.pop();if(t.first!=d[t.second])continue;for(auto&e:g[t.second])if(t.first+e.second<d[e.first]){d[e.first]=t.first+e.second;pq.push({d[e.first],e.first});}}printf("%lld\\n",d[n]>=INF?-1LL:d[n]);}`,

  // m27: treats every shutter as a wall - never picks a card up
  m27: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int r,c;scanf("%d %d",&r,&c);vector<string>g(r);for(int i=0;i<r;i++){char b[128];scanf("%s",b);g[i]=b;}int sr=0,sc=0;for(int i=0;i<r;i++)for(int j=0;j<c;j++)if(g[i][j]=='S'){sr=i;sc=j;}vector<vector<int>>d(r,vector<int>(c,-1));queue<pair<int,int>>q;d[sr][sc]=0;q.push({sr,sc});int DR[4]={-1,1,0,0},DC[4]={0,0,-1,1};while(!q.empty()){auto p=q.front();q.pop();if(g[p.first][p.second]=='X'){printf("%d\\n",d[p.first][p.second]);return 0;}for(int k=0;k<4;k++){int ni=p.first+DR[k],nj=p.second+DC[k];if(ni<0||nj<0||ni>=r||nj>=c)continue;char ch=g[ni][nj];if(ch=='#'||(ch>='A'&&ch<='F'))continue;if(d[ni][nj]==-1){d[ni][nj]=d[p.first][p.second]+1;q.push({ni,nj});}}}printf("-1\\n");}`,

  // m28: counts roads travelled instead of tolls paid
  m28: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<vector<int>>g(n+1);for(int i=0;i<m;i++){int u,v,w;scanf("%d %d %d",&u,&v,&w);g[u].push_back(v);g[v].push_back(u);}vector<int>d(n+1,-1);queue<int>q;d[1]=0;q.push(1);while(!q.empty()){int u=q.front();q.pop();for(int v:g[u])if(d[v]<0){d[v]=d[u]+1;q.push(v);}}printf("%d\\n",d[n]);}`,

  // m29: adds every task's time, as if there were only one worker
  m29: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);long long s=0;for(int i=0;i<n;i++){long long t;scanf("%lld",&t);s+=t;}printf("%lld\\n",s);}`,

  // m30: finds a profitable loop ANYWHERE, without checking you can reach it
  //      from currency 1 and get back to currency 1 afterwards
  m30: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<int>U(m),V(m);vector<long double>W(m);for(int i=0;i<m;i++){long long p,q;scanf("%d %d %lld %lld",&U[i],&V[i],&p,&q);W[i]=logl((long double)q)-logl((long double)p);}vector<long double>d(n+1,0.0L);bool rel=false;for(int it=0;it<=n;it++){rel=false;for(int i=0;i<m;i++)if(d[U[i]]+W[i]<d[V[i]]-1e-9L){d[V[i]]=d[U[i]]+W[i];rel=true;}if(!rel)break;}printf(rel?"YES\\n":"NO\\n");}`,

  // m31: BFS from only the FIRST R it finds, ignoring every other source
  m31: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int r,c;scanf("%d %d",&r,&c);vector<string>g(r);{vector<char>b(c+8);for(int i=0;i<r;i++){scanf("%s",b.data());g[i]=b.data();}}long long people=0;int sr=-1,sc=-1;for(int i=0;i<r;i++)for(int j=0;j<c;j++){if(g[i][j]=='#')continue;people++;if(g[i][j]=='R'&&sr<0){sr=i;sc=j;}}if(sr<0){printf("%d\\n",people==0?0:-1);return 0;}vector<int>d((size_t)r*c,-1);vector<int>q;d[(size_t)sr*c+sc]=0;q.push_back(sr*c+sc);int DR[4]={-1,1,0,0},DC[4]={0,0,-1,1};long long inf=1;int best=0;for(size_t h=0;h<q.size();h++){int cell=q[h],i=cell/c,j=cell%c,dd=d[cell];best=max(best,dd);for(int k=0;k<4;k++){int ni=i+DR[k],nj=j+DC[k];if(ni<0||nj<0||ni>=r||nj>=c)continue;if(g[ni][nj]=='#')continue;size_t ns=(size_t)ni*c+nj;if(d[ns]!=-1)continue;d[ns]=dd+1;inf++;q.push_back((int)ns);}}printf("%d\\n",inf==people?best:-1);}`,

  // m32: assumes every unplugging splits a cluster, so it just counts upward
  m32: `#include <bits/stdc++.h>\nusing namespace std;\nint par[200005];int fr(int x){while(par[x]!=x){par[x]=par[par[x]];x=par[x];}return x;}\nint main(){int n,m,q;scanf("%d %d %d",&n,&m,&q);vector<int>U(m+1),V(m+1);for(int i=1;i<=m;i++)scanf("%d %d",&U[i],&V[i]);for(int i=1;i<=n;i++)par[i]=i;int comps=n;for(int i=1;i<=m;i++){int a=fr(U[i]),b=fr(V[i]);if(a!=b){par[b]=a;comps--;}}string o;for(int i=0;i<q;i++){int x;scanf("%d",&x);comps++;o+=to_string(comps);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // m33: counts only the tail, forgetting the ring the chain settles into
  m33: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<int>f(n+1);for(int i=1;i<=n;i++)scanf("%d",&f[i]);vector<char>onCyc(n+1,0);vector<int>st(n+1,0);for(int s=1;s<=n;s++){if(st[s])continue;vector<int>path;int u=s;while(st[u]==0){st[u]=1;path.push_back(u);u=f[u];}if(st[u]==1){bool go=false;for(int v:path){if(v==u)go=true;if(go)onCyc[v]=1;}}for(int v:path)st[v]=2;}string o;for(int i=1;i<=n;i++){long long c=0;int u=i;while(!onCyc[u]){c++;u=f[u];}if(i>1)o+=' ';o+=to_string(c+1);}o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,

  // m34: shortest path first, then halve its single most expensive leg
  m34: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<vector<pair<int,long long>>>g(n+1);for(int i=0;i<m;i++){int u,v;long long c;scanf("%d %d %lld",&u,&v,&c);g[u].push_back({v,c});}const long long INF=LLONG_MAX/4;vector<long long>d(n+1,INF),mx(n+1,0),pw(n+1,0);priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>>pq;d[1]=0;pq.push({0,1});while(!pq.empty()){auto t=pq.top();pq.pop();if(t.first!=d[t.second])continue;for(auto&e:g[t.second])if(t.first+e.second<d[e.first]){d[e.first]=t.first+e.second;mx[e.first]=max(mx[t.second],e.second);pq.push({d[e.first],e.first});}}if(d[n]>=INF){printf("-1\\n");return 0;}printf("%lld\\n",d[n]-mx[n]+mx[n]/2);}`,

  // m35: one greedy pass per shift with no displacement, so an early free
  //      choice can block a later forced one
  m35: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m,p;scanf("%d %d %d",&n,&m,&p);vector<vector<int>>cw(m+1);for(int i=0;i<p;i++){int a,b;scanf("%d %d",&a,&b);cw[b].push_back(a);}vector<char>used(n+1,0);for(int s=1;s<=m;s++){bool ok=false;for(int a:cw[s])if(!used[a]){used[a]=1;ok=true;break;}if(!ok){printf("NO\\n");return 0;}}printf("YES\\n");}`,

  // m36: greedy - each server takes its cheapest still-free position
  m36: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<vector<long long>>c(n,vector<long long>(n));for(auto&r:c)for(auto&x:r)scanf("%lld",&x);vector<char>used(n,0);long long tot=0;for(int i=0;i<n;i++){int b=-1;for(int j=0;j<n;j++)if(!used[j]&&(b<0||c[i][j]<c[i][b]))b=j;used[b]=1;tot+=c[i][b];}printf("%lld\\n",tot);}`,

  // m37: minimises the TOTAL climb instead of the worst single step
  m37: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int r,c;scanf("%d %d",&r,&c);vector<vector<long long>>h(r,vector<long long>(c));for(auto&row:h)for(auto&x:row)scanf("%lld",&x);const long long INF=LLONG_MAX/4;vector<vector<long long>>d(r,vector<long long>(c,INF));d[0][0]=0;for(int i=0;i<r;i++)for(int j=0;j<c;j++){if(!i&&!j)continue;long long v=INF;if(i&&d[i-1][j]<INF)v=min(v,d[i-1][j]+llabs(h[i][j]-h[i-1][j]));if(j&&d[i][j-1]<INF)v=min(v,d[i][j-1]+llabs(h[i][j]-h[i][j-1]));d[i][j]=v;}printf("%lld\\n",d[r-1][c-1]);}`,

  // m38: stops at the FIRST rule it passes, reporting the shortest match
  m38: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<array<int,2>>nx;vector<char>ir;nx.push_back({-1,-1});ir.push_back(0);vector<char>b(64);for(int i=0;i<n;i++){scanf("%s",b.data());int cur=0;for(int k=0;b[k];k++){int t=b[k]-'0';if(nx[cur][t]==-1){nx[cur][t]=(int)nx.size();nx.push_back({-1,-1});ir.push_back(0);}cur=nx[cur][t];}ir[cur]=1;}string o;for(int i=0;i<q;i++){scanf("%s",b.data());int cur=0,best=-1;for(int k=0;b[k];k++){int t=b[k]-'0';if(nx[cur][t]==-1)break;cur=nx[cur][t];if(ir[cur]){best=k+1;break;}}o+=to_string(best);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // m39: counts players with score >= instead of strictly greater
  m39: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<long long>sc(n+1,0);char op[16];string o;for(int i=0;i<q;i++){scanf("%s",op);if(op[0]=='U'){int p;long long s;scanf("%d %lld",&p,&s);sc[p]=s;}else{int p;scanf("%d",&p);int h=0;for(int j=1;j<=n;j++)if(j!=p&&sc[j]>=sc[p])h++;o+=to_string(h);o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // m40: starts the running maximum at 0, so all-negative ranges come out wrong
  m40: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<long long>a(n+1);for(int i=1;i<=n;i++)scanf("%lld",&a[i]);char op[16];string o;for(int i=0;i<q;i++){scanf("%s",op);if(op[0]=='A'){int l,r;long long x;scanf("%d %d %lld",&l,&r,&x);for(int j=l;j<=r;j++)a[j]+=x;}else{int l,r;scanf("%d %d",&l,&r);long long b=0;for(int j=l;j<=r;j++)b=max(b,a[j]);o+=to_string(b);o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // m80: XORs everything and prints that, never splitting the two apart
  m80: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);long long all=0,mn=LLONG_MAX;for(int i=0;i<n;i++){long long v;scanf("%lld",&v);all^=v;mn=min(mn,v);}printf("%lld %lld\\n",mn,all);}`,

  // m81: forgets that a role covering everything pairs with itself in the count
  m81: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,b;scanf("%d %d",&n,&b);int F=(1<<b)-1;vector<int>m(n);vector<long long>c(1<<b,0);for(int i=0;i<n;i++){scanf("%d",&m[i]);c[m[i]]++;}for(int t=0;t<b;t++)for(int x=0;x<=F;x++)if(!(x&(1<<t)))c[x]+=c[x|(1<<t)];long long tot=0;for(int i=0;i<n;i++)tot+=c[F^m[i]];printf("%lld\\n",tot/2);}`,

  // m82: records rejected requests too, so the limiter is far too strict
  m82: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int q;long long k,w;scanf("%d %lld %lld",&q,&k,&w);unordered_map<int,deque<long long>>s;string o;o.reserve(q+1);for(int i=0;i<q;i++){int u;long long t;scanf("%d %lld",&u,&t);auto&d=s[u];while(!d.empty()&&d.front()<=t-w)d.pop_front();if((long long)d.size()<k)o+='1';else o+='0';d.push_back(t);}o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,

  // m83: a fresh edit does not clear the redo history
  m83: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int q;scanf("%d",&q);string doc;vector<string>un,re;string o;char c[16];static char b[200005];for(int i=0;i<q;i++){scanf("%s",c);if(c[0]=='A'){scanf("%s",b);un.push_back(doc);doc+=b;}else if(c[0]=='D'){int k;scanf("%d",&k);un.push_back(doc);doc.erase(doc.size()-k);}else if(c[0]=='U'){if(!un.empty()){re.push_back(doc);doc=un.back();un.pop_back();}}else if(c[0]=='R'){if(!re.empty()){un.push_back(doc);doc=re.back();re.pop_back();}}else{int x;scanf("%d",&x);o+=doc[x-1];o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // m84: counts components but never checks the parity, so contradictions pass
  m84: `#include <bits/stdc++.h>\nusing namespace std;\nconst long long MOD=1000000007LL;vector<int>p;int f(int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}\nint main(){int n,m;scanf("%d %d",&n,&m);p.resize(n+1);for(int i=1;i<=n;i++)p[i]=i;int g=n;for(int e=0;e<m;e++){int a,b,t;scanf("%d %d %d",&a,&b,&t);int ra=f(a),rb=f(b);if(ra!=rb){p[ra]=rb;g--;}}long long r=1,base=2;long long ex=g;while(ex){if(ex&1)r=r*base%MOD;base=base*base%MOD;ex>>=1;}printf("%lld\\n",r);}`,

  // m85: greedily takes the larger end
  m85: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>v(n);for(int i=0;i<n;i++)scanf("%lld",&v[i]);int i=0,j=n-1;long long me=0;bool mine=true;while(i<=j){long long take;if(v[i]>=v[j])take=v[i++];else take=v[j--];if(mine)me+=take;mine=!mine;}printf("%lld\\n",me);}`,

  // m86: takes T mod the whole visited length, forgetting the tail before the cycle
  m86: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){long long n,s,T;scanf("%lld %lld %lld",&n,&s,&T);vector<int>nx(n);for(int i=0;i<n;i++)scanf("%d",&nx[i]);vector<int>seen(n,-1);vector<int>ord;int cur=(int)s;while(seen[cur]<0){seen[cur]=(int)ord.size();ord.push_back(cur);cur=nx[cur];}long long L=(long long)ord.size();printf("%d\\n",ord[(int)(T<L?T:T%L)]);}`,

  // m87: raises the matrix to T instead of T-1, so it reports p(T+1)
  m87: `#include <bits/stdc++.h>\nusing namespace std;\nconst long long MOD=1000000007LL;struct M{long long a[2][2];};M mul(M x,M y){M r;for(int i=0;i<2;i++)for(int j=0;j<2;j++){long long s=0;for(int k=0;k<2;k++)s=(s+x.a[i][k]*y.a[k][j])%MOD;r.a[i][j]=s;}return r;}\nint main(){long long p0,p1,a,b,T;scanf("%lld %lld %lld %lld %lld",&p0,&p1,&a,&b,&T);p0%=MOD;p1%=MOD;a%=MOD;b%=MOD;if(T==0){printf("%lld\\n",p0);return 0;}if(T==1){printf("%lld\\n",p1);return 0;}M base;base.a[0][0]=a;base.a[0][1]=b;base.a[1][0]=1;base.a[1][1]=0;M r;r.a[0][0]=1;r.a[0][1]=0;r.a[1][0]=0;r.a[1][1]=1;long long e=T;while(e){if(e&1)r=mul(r,base);base=mul(base,base);e>>=1;}printf("%lld\\n",(r.a[0][0]*p1+r.a[0][1]*p0)%MOD);}`,

  // m88: subtracts count(L) instead of count(L-1), so it drops L itself
  m88: `#include <bits/stdc++.h>\nusing namespace std;\nstring S;long long memo[20][11][2];bool vis[20][11][2];\nlong long go(int pos,int prev,int st,int tight){if(pos==(int)S.size())return 1;if(!tight&&vis[pos][prev][st])return memo[pos][prev][st];int hi=tight?S[pos]-'0':9;long long r=0;for(int d=0;d<=hi;d++){int nst=st||d>0;if(st&&nst&&d==prev)continue;r+=go(pos+1,nst?d:10,nst,tight&&d==hi);}if(!tight){vis[pos][prev][st]=1;memo[pos][prev][st]=r;}return r;}\nlong long cnt(long long x){if(x<0)return 0;S=to_string(x);memset(vis,0,sizeof(vis));return go(0,10,0,1);}\nint main(){long long L,R;scanf("%lld %lld",&L,&R);printf("%lld\\n",cnt(R)-cnt(L));}`,

  // m89: greedy - heaviest first onto whichever machine is lighter
  m89: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>w(n);for(int i=0;i<n;i++)scanf("%lld",&w[i]);sort(w.rbegin(),w.rend());long long A=0,B=0;for(int i=0;i<n;i++){if(A<=B)A+=w[i];else B+=w[i];}printf("%lld\\n",llabs(A-B));}`,

  // m90: puts the antenna at the median, which minimises absolute distance, not squared
  m90: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>x(n);for(int i=0;i<n;i++)scanf("%lld",&x[i]);sort(x.begin(),x.end());long long p=x[n/2];long long s=0;for(int i=0;i<n;i++){long long d=x[i]-p;s+=d*d;}printf("%lld\\n",s);}`,

  // m91: sum minus n(n+1)/2 - only correct when the duplicate appears exactly twice
  m91: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){long long n;scanf("%lld",&n);long long s=0;for(long long i=0;i<=n;i++){long long v;scanf("%lld",&v);s+=v;}printf("%lld\\n",s-n*(n+1)/2);}`,

  // c1: keys the map on pref % n without normalising, so a prefix of -2 and a
  // prefix of 3 land in different buckets even though both are residue 3 mod 5
  c1: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);unordered_map<long long,long long>cnt;cnt[0]=1;long long pref=0,ans=0;for(int i=0;i<n;i++){long long v;scanf("%lld",&v);pref+=v;long long r=pref%n;ans+=cnt[r];cnt[r]++;}printf("%lld\\n",ans);}`,

  // c2: reuses a room when it frees up ON the arrival day, so it under-counts
  // rooms and hands out overlapping stays
  c2: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<int>a(n),b(n),idx(n);for(int i=0;i<n;i++){scanf("%d %d",&a[i],&b[i]);idx[i]=i;}sort(idx.begin(),idx.end(),[&](int p,int q){if(a[p]!=a[q])return a[p]<a[q];return b[p]<b[q];});priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>>q;vector<int>room(n);int k=0;for(int t=0;t<n;t++){int i=idx[t];if(!q.empty()&&q.top().first<=a[i]){int r=q.top().second;q.pop();room[i]=r;q.push({b[i],r});}else{room[i]=++k;q.push({b[i],k});}}printf("%d\\n",k);for(int i=0;i<n;i++)printf("%d%c",room[i],i+1==n?'\\n':' ');}`,

  // c3: predicate asks for strictly MORE than t products, so it lands one
  // second late whenever the answer is exact
  c3: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){long long n,t;scanf("%lld %lld",&n,&t);vector<long long>k(n);long long mn=LLONG_MAX;for(long long i=0;i<n;i++){scanf("%lld",&k[i]);mn=min(mn,k[i]);}auto ok=[&](long long T){long long m=0;for(long long i=0;i<n;i++){m+=T/k[i];if(m>t)return true;}return m>t;};long long lo=1,hi=t*mn;while(lo<hi){long long mid=lo+(hi-lo)/2;if(ok(mid))hi=mid;else lo=mid+1;}printf("%lld\\n",lo);}`,

  // c4: closes the current piece when the sum REACHES the cap instead of
  // exceeding it, so it over-splits and reports a larger maximum
  c4: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){long long n,k;scanf("%lld %lld",&n,&k);vector<long long>x(n);long long lo=0,hi=0;for(long long i=0;i<n;i++){scanf("%lld",&x[i]);lo=max(lo,x[i]);hi+=x[i];}auto need=[&](long long cap){long long p=1,cur=0;for(long long i=0;i<n;i++){if(cur+x[i]>=cap){p++;cur=x[i];}else cur+=x[i];}return p;};while(lo<hi){long long mid=lo+(hi-lo)/2;if(need(mid)<=k)hi=mid;else lo=mid+1;}printf("%lld\\n",lo);}`,

  // c5: erases by VALUE, so selling one ticket removes every ticket that
  // happens to share its price
  c5: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);multiset<int>s;for(int i=0;i<n;i++){int h;scanf("%d",&h);s.insert(h);}string o;for(int j=0;j<m;j++){int t;scanf("%d",&t);auto it=s.upper_bound(t);if(it==s.begin())o+="-1\\n";else{--it;int v=*it;o+=to_string(v);o+='\\n';s.erase(v);}}fwrite(o.data(),1,o.size(),stdout);}`,

  // c6: counts DIRECT reports only, never the whole subtree
  c6: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<int>par(n+1,0),cnt(n+1,0);for(int i=2;i<=n;i++){scanf("%d",&par[i]);cnt[par[i]]++;}for(int i=1;i<=n;i++)printf("%d%c",cnt[i],i==n?'\\n':' ');}`,

  // c7: uses only ONE diameter endpoint, so nodes on that endpoint's side
  // report distances that are far too small
  c7: `#include <bits/stdc++.h>\nusing namespace std;\nint n;vector<vector<int>>adj;\nint bfs(int s,vector<int>&d){d.assign(n+1,-1);vector<int>q;q.push_back(s);d[s]=0;int b=s;for(size_t i=0;i<q.size();i++){int u=q[i];if(d[u]>d[b])b=u;for(int v:adj[u])if(d[v]==-1){d[v]=d[u]+1;q.push_back(v);}}return b;}\nint main(){scanf("%d",&n);adj.assign(n+1,{});for(int i=0;i<n-1;i++){int a,b;scanf("%d %d",&a,&b);adj[a].push_back(b);adj[b].push_back(a);}vector<int>d0,dA;int a=bfs(1,d0);bfs(a,dA);string o;for(int v=1;v<=n;v++){o+=to_string(dA[v]);o+=(v==n?'\\n':' ');}fwrite(o.data(),1,o.size(),stdout);}`,

  // c8: stops one step short - after rising together both nodes sit just BELOW
  // the common boss, and this returns that child instead of up[a][0]
  c8: `#include <bits/stdc++.h>\nusing namespace std;\nstatic const int LG=18;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<array<int,LG>>up(n+1);vector<int>dep(n+1,0);for(int k=0;k<LG;k++)up[1][k]=1;for(int i=2;i<=n;i++){int p;scanf("%d",&p);up[i][0]=p;dep[i]=dep[p]+1;for(int k=1;k<LG;k++)up[i][k]=up[up[i][k-1]][k-1];}string o;for(int i=0;i<q;i++){int a,b;scanf("%d %d",&a,&b);if(dep[a]<dep[b])swap(a,b);int d=dep[a]-dep[b];for(int k=0;k<LG;k++)if(d>>k&1)a=up[a][k];if(a!=b){for(int k=LG-1;k>=0;k--)if(up[a][k]!=up[b][k]){a=up[a][k];b=up[b][k];}}o+=to_string(a);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // c9: DFS instead of BFS - it finds A route to B, just not a shortest one
  c9: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<string>g(n);for(int i=0;i<n;i++){char b[1024];scanf("%s",b);g[i]=b;}int st=-1,go=-1;for(int r=0;r<n;r++)for(int c=0;c<m;c++){if(g[r][c]=='A')st=r*m+c;else if(g[r][c]=='B')go=r*m+c;}const int dr[4]={1,-1,0,0},dc[4]={0,0,1,-1};const char mv[4]={'D','U','R','L'};vector<char>from(n*m,0),seen(n*m,0);vector<int>stk;stk.push_back(st);seen[st]=1;while(!stk.empty()){int cur=stk.back();stk.pop_back();if(cur==go)break;int r=cur/m,c=cur%m;for(int d=0;d<4;d++){int nr=r+dr[d],nc=c+dc[d];if(nr<0||nr>=n||nc<0||nc>=m)continue;int nx=nr*m+nc;if(seen[nx]||g[nr][nc]=='#')continue;seen[nx]=1;from[nx]=mv[d];stk.push_back(nx);}}if(!seen[go]){printf("NO\\n");return 0;}string p;for(int cur=go;cur!=st;){char c=from[cur];p+=c;int r=cur/m,cc=cur%m;if(c=='D')r--;else if(c=='U')r++;else if(c=='R')cc--;else cc++;cur=r*m+cc;}reverse(p.begin(),p.end());printf("YES\\n%d\\n%s\\n",(int)p.size(),p.c_str());}`,

  // c10: chains the components in a RING, so it builds one road too many
  c10: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int>p;int f(int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}\nint main(){int n,m;scanf("%d %d",&n,&m);p.resize(n+1);for(int i=1;i<=n;i++)p[i]=i;for(int i=0;i<m;i++){int a,b;scanf("%d %d",&a,&b);p[f(a)]=f(b);}vector<int>r;for(int i=1;i<=n;i++)if(f(i)==i)r.push_back(i);string o=to_string((int)r.size());o+='\\n';for(size_t i=0;i<r.size();i++){o+=to_string(r[i]);o+=' ';o+=to_string(r[(i+1)%r.size()]);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // c11: plain Dijkstra - it never spends the coupon at all
  c11: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<vector<pair<int,long long>>>adj(n+1);for(int i=0;i<m;i++){int a,b;long long c;scanf("%d %d %lld",&a,&b,&c);adj[a].push_back({b,c});}const long long INF=(long long)4e18;vector<long long>d(n+1,INF);priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>>q;d[1]=0;q.push({0,1});while(!q.empty()){auto[dd,u]=q.top();q.pop();if(dd>d[u])continue;for(auto[v,c]:adj[u])if(dd+c<d[v]){d[v]=dd+c;q.push({d[v],v});}}printf("%lld\\n",d[n]);}`,

  // c12: never checks whether the order covers every course, so a cyclic
  // graph makes it print a short list instead of IMPOSSIBLE
  c12: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<vector<int>>adj(n+1);vector<int>ind(n+1,0);for(int i=0;i<m;i++){int a,b;scanf("%d %d",&a,&b);adj[a].push_back(b);ind[b]++;}vector<int>o;for(int v=1;v<=n;v++)if(!ind[v])o.push_back(v);for(size_t i=0;i<o.size();i++)for(int v:adj[o[i]])if(--ind[v]==0)o.push_back(v);string s;for(size_t i=0;i<o.size();i++){s+=to_string(o[i]);s+=(i+1==o.size()?'\\n':' ');}fwrite(s.data(),1,s.size(),stdout);}`,

  // c13: drops the "reachable from city 1" guard, so it happily builds a
  // route starting from some city that city 1 can never get to
  c13: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<vector<int>>adj(n+1);vector<int>ind(n+1,0);for(int i=0;i<m;i++){int a,b;scanf("%d %d",&a,&b);adj[a].push_back(b);ind[b]++;}vector<int>o;for(int v=1;v<=n;v++)if(!ind[v])o.push_back(v);for(size_t i=0;i<o.size();i++)for(int w:adj[o[i]])if(--ind[w]==0)o.push_back(w);vector<int>best(n+1,0),fr(n+1,0);best[1]=1;for(int v:o)for(int w:adj[v])if(best[v]+1>best[w]){best[w]=best[v]+1;fr[w]=v;}if(!best[n]){printf("IMPOSSIBLE\\n");return 0;}vector<int>r;for(int v=n;v;v=fr[v])r.push_back(v);reverse(r.begin(),r.end());string s=to_string((int)r.size());s+='\\n';for(size_t i=0;i<r.size();i++){s+=to_string(r[i]);s+=(i+1==r.size()?'\\n':' ');}fwrite(s.data(),1,s.size(),stdout);}`,

  // c15: LOG = 18 copied from the tree problems, but here the bound follows
  // k (up to 1e9), not n - so every query with k >= 262144 is wrong
  c15: `#include <bits/stdc++.h>\nusing namespace std;\nstatic const int LG=18;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<vector<int>>up(LG,vector<int>(n+1));for(int v=1;v<=n;v++)scanf("%d",&up[0][v]);for(int j=1;j<LG;j++)for(int v=1;v<=n;v++)up[j][v]=up[j-1][up[j-1][v]];string o;for(int i=0;i<q;i++){int x;long long k;scanf("%d %lld",&x,&k);for(int j=0;j<LG;j++)if(k>>j&1)x=up[j][x];o+=to_string(x);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // c16: leaves ways[0] at 0 instead of 1, so the empty sequence never seeds
  // the recurrence and every count collapses to zero
  c16: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);const long long MOD=1000000007LL;vector<long long>w(n+1,0);for(int s=1;s<=n;s++){long long a=0;for(int j=1;j<=6&&j<=s;j++)a+=w[s-j];w[s]=a%MOD;}printf("%lld\\n",w[n]);}`,

  // c17: forgets to skip digit 0, so steps[v-0] reads steps[v] itself - still
  // zero at that point - and every value looks one step from done.
  // (Note: subtracting the largest digit greedily IS optimal here, so that
  // would not be a wrong solution at all.)
  c17: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<int>st(n+1,0);for(int v=1;v<=n;v++){int best=INT_MAX;for(int t=v;t;t/=10){int d=t%10;best=min(best,st[v-d]);}st[v]=best+1;}printf("%d\\n",st[n]);}`,

  // c18: iterates the budget UPWARDS, turning 0/1 into the unbounded knapsack
  // so a cheap book can be bought over and over
  c18: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,x;scanf("%d %d",&n,&x);vector<int>h(n),s(n);for(int i=0;i<n;i++)scanf("%d",&h[i]);for(int i=0;i<n;i++)scanf("%d",&s[i]);vector<int>b(x+1,0);for(int i=0;i<n;i++)for(int c=h[i];c<=x;c++)b[c]=max(b[c],b[c-h[i]]+s[i]);printf("%d\\n",b[x]);}`,

  // c19: swaps the insert and delete moves' base cases - the first row and
  // column are left at zero instead of counting the characters consumed
  c19: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){static char A[5005],B[5005];scanf("%s",A);scanf("%s",B);string a=A,b=B;int n=a.size(),m=b.size();vector<int>p(m+1,0),c(m+1,0);for(int i=1;i<=n;i++){c[0]=0;for(int j=1;j<=m;j++){if(a[i-1]==b[j-1])c[j]=p[j-1];else c[j]=1+min(p[j-1],min(p[j],c[j-1]));}p.swap(c);}printf("%d\\n",p[m]);}`,

  // c20: treats "1 k u" as ADD u rather than SET to u
  c20: `#include <bits/stdc++.h>\nusing namespace std;\nint n;vector<long long>t;\nvoid add(int i,long long v){for(;i<=n;i+=i&-i)t[i]+=v;}\nlong long pref(int i){long long s=0;for(;i>0;i-=i&-i)s+=t[i];return s;}\nint main(){int q;scanf("%d %d",&n,&q);t.assign(n+1,0);for(int i=1;i<=n;i++){long long v;scanf("%lld",&v);add(i,v);}string o;for(int i=0;i<q;i++){int ty;scanf("%d",&ty);if(ty==1){int k;long long u;scanf("%d %lld",&k,&u);add(k,u);}else{int a,b;scanf("%d %d",&a,&b);o+=to_string(pref(b)-pref(a-1));o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // c21: writes the leaf but never climbs to fix its ancestors, so every
  // query spanning more than one leaf reads stale internal nodes
  c21: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);int sz=1;while(sz<n)sz<<=1;vector<int>t(2*sz,INT_MAX);for(int i=0;i<n;i++)scanf("%d",&t[sz+i]);for(int i=sz-1;i>=1;i--)t[i]=min(t[2*i],t[2*i+1]);string o;for(int i=0;i<q;i++){int ty;scanf("%d",&ty);if(ty==1){int k,u;scanf("%d %d",&k,&u);t[sz+k-1]=u;}else{int a,b;scanf("%d %d",&a,&b);int r2=INT_MAX,l=sz+a-1,r=sz+b;while(l<r){if(l&1)r2=min(r2,t[l++]);if(r&1)r2=min(r2,t[--r]);l>>=1;r>>=1;}o+=to_string(r2);o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // c22: cancels the range increment at b instead of b+1, so the last cell of
  // every range misses out entirely
  c22: `#include <bits/stdc++.h>\nusing namespace std;\nint m;vector<long long>t;\nvoid add(int i,long long v){if(i<1)return;for(;i<=m;i+=i&-i)t[i]+=v;}\nlong long pref(int i){long long s=0;for(;i>0;i-=i&-i)s+=t[i];return s;}\nint main(){int n,q;scanf("%d %d",&n,&q);vector<long long>x(n+2,0);for(int i=1;i<=n;i++)scanf("%lld",&x[i]);m=n+1;t.assign(m+1,0);string o;for(int i=0;i<q;i++){int ty;scanf("%d",&ty);if(ty==1){int a,b;long long u;scanf("%d %d %lld",&a,&b,&u);add(a,u);add(b,-u);}else{int k;scanf("%d",&k);o+=to_string(x[k]+pref(k));o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // c23: xors p[b] with p[a] instead of p[a-1], dropping the first element
  c23: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<int>p(n+1,0);for(int i=1;i<=n;i++){int v;scanf("%d",&v);p[i]=p[i-1]^v;}string o;for(int i=0;i<q;i++){int a,b;scanf("%d %d",&a,&b);o+=to_string(p[b]^p[a]);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // c24: trial division that counts d and x/d as two divisors even when they
  // are the same, so every perfect square comes out one too high
  c24: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);string o;for(int i=0;i<n;i++){int x;scanf("%d",&x);int c=0;for(int d=1;(long long)d*d<=x;d++)if(x%d==0)c+=2;o+=to_string(c);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // c25: holds the base in a 32-bit int, so base*base wraps before it is
  // ever widened or reduced
  c25: `#include <bits/stdc++.h>\nusing namespace std;\nstatic const long long MOD=1000000007LL;\nint main(){int n;scanf("%d",&n);string o;for(int i=0;i<n;i++){long long a,b;scanf("%lld %lld",&a,&b);int base=(int)(a%MOD);long long r=1;long long e=b;while(e>0){if(e&1)r=r*base%MOD;base=(int)((long long)(base*base)%MOD);e>>=1;}o+=to_string(r);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // c26: resets the match length to 0 after a hit instead of falling back to
  // fail[m-1], so overlapping occurrences are missed
  c26: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){static char A[1000006],B[1000006];scanf("%s",A);scanf("%s",B);string s=A,p=B;int n=s.size(),m=p.size();if(m>n){printf("0\\n");return 0;}vector<int>f(m,0);for(int i=1,k=0;i<m;i++){while(k>0&&p[i]!=p[k])k=f[k-1];if(p[i]==p[k])k++;f[i]=k;}long long c=0;for(int i=0,k=0;i<n;i++){while(k>0&&s[i]!=p[k])k=f[k-1];if(s[i]==p[k])k++;if(k==m){c++;k=0;}}printf("%lld\\n",c);}`,

  // c27: prints only the longest border instead of chaining down through
  // fail[k-1] to collect them all
  c27: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){static char A[1000006];scanf("%s",A);string s=A;int n=s.size();vector<int>f(n,0);for(int i=1,k=0;i<n;i++){while(k>0&&s[i]!=s[k])k=f[k-1];if(s[i]==s[k])k++;f[i]=k;}string o;if(f[n-1]>0)o+=to_string(f[n-1]);o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,

  // c28: marks values as seen rather than counting them, so a pair made of
  // two EQUAL inputs is never noticed
  c28: `#include <bits/stdc++.h>\nusing namespace std;\nstatic const int L=1000000;\nint main(){int n;scanf("%d",&n);static char seen[L+1];for(int i=0;i<n;i++){int v;scanf("%d",&v);seen[v]=1;}for(int d=L;d>=1;d--){int c=0;for(int m=d;m<=L;m+=d){c+=seen[m];if(c>=2)break;}if(c>=2){printf("%d\\n",d);return 0;}}printf("1\\n");}`,

  // c29: accumulates the spanning tree cost in a 32-bit int, which wraps once
  // the total passes 2^31
  c29: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int>p,sz;\nint f(int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}\nint main(){int n,m;scanf("%d %d",&n,&m);vector<array<int,3>>e(m);for(int i=0;i<m;i++){int a,b,c;scanf("%d %d %d",&a,&b,&c);e[i]={c,a,b};}sort(e.begin(),e.end());p.resize(n+1);sz.assign(n+1,1);for(int i=1;i<=n;i++)p[i]=i;int total=0;int taken=0;for(auto&x:e){int ra=f(x[1]),rb=f(x[2]);if(ra==rb)continue;if(sz[ra]<sz[rb])swap(ra,rb);p[rb]=ra;sz[ra]+=sz[rb];total+=x[0];if(++taken==n-1)break;}if(taken!=n-1)printf("IMPOSSIBLE\\n");else printf("%d\\n",total);}`,

  // m74: builds the lcm first, so a*b overflows long before the division
  m74: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){long long a,b;scanf("%lld %lld",&a,&b);long long g=__gcd(a,b);long long l=a*b/g;printf("%lld\\n",l/a);}`,

  // m75: counts ORDERED seatings, n!/(n-r)!, instead of choices
  m75: `#include <bits/stdc++.h>\nusing namespace std;\nconst long long MOD=1000000007LL;const int MX=200005;long long pw(long long b,long long e){long long r=1;b%=MOD;while(e){if(e&1)r=r*b%MOD;b=b*b%MOD;e>>=1;}return r;}\nint main(){vector<long long>f(MX),iv(MX);f[0]=1;for(int i=1;i<MX;i++)f[i]=f[i-1]*i%MOD;iv[MX-1]=pw(f[MX-1],MOD-2);for(int i=MX-1;i>0;i--)iv[i-1]=iv[i]*i%MOD;int q;scanf("%d",&q);string o;for(int i=0;i<q;i++){int n,r;scanf("%d %d",&n,&r);long long a=(r>n)?0:f[n]*iv[n-r]%MOD;o+=to_string(a);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // m76: treats 1 as prime
  m76: `#include <bits/stdc++.h>\nusing namespace std;\nconst int LIM=1000000;\nint main(){vector<char>comp(LIM+1,0);comp[0]=1;for(int i=2;(long long)i*i<=LIM;i++)if(!comp[i])for(long long j=(long long)i*i;j<=LIM;j+=i)comp[j]=1;vector<int>up(LIM+1,0);for(int i=1;i<=LIM;i++)up[i]=up[i-1]+(comp[i]?0:1);int q;scanf("%d",&q);string o;for(int i=0;i<q;i++){int l,r;scanf("%d %d",&l,&r);o+=to_string(up[r]-up[l-1]);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // m77: looks only at the total's parity, missing n == 1 and odd n entirely
  m77: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);long long s=0;for(int i=0;i<n;i++){long long v;scanf("%lld",&v);s+=v;}printf(s%2==0?"YES\\n":"NO\\n");}`,

  // m78: counts digit sums up to s rather than exactly s
  m78: `#include <bits/stdc++.h>\nusing namespace std;\nconst long long MOD=1000000007LL;string D;int S,L;long long memo[20][170][2];\nlong long go(int p,int s,int t){if(s>S)return 0;if(p==L)return 1;long long&m=memo[p][s][t];if(m>=0)return m;int hi=t?D[p]-'0':9;long long r=0;for(int d=0;d<=hi;d++)r=(r+go(p+1,s+d,(t&&d==hi)?1:0))%MOD;return m=r;}\nint main(){long long N;scanf("%lld %d",&N,&S);D=to_string(N);L=D.size();memset(memo,-1,sizeof(memo));printf("%lld\\n",go(0,0,1));}`,

  // m79: prints the larger shares first, breaking the required order
  m79: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){long long n,m;scanf("%lld %lld",&n,&m);long long b=m/n,e=m%n;string o;for(long long i=0;i<n;i++){if(i)o+=' ';o+=to_string(i<e?b+1:b);}o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,

  // m67: drops the max(0, ...) so an over-stocked shelf pays for an empty one
  m67: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long T;scanf("%d %lld",&n,&T);vector<long long>s(n),c(n);for(int i=0;i<n;i++)scanf("%lld %lld",&s[i],&c[i]);const long long M=1000000;auto ok=[&](long long m){long long need=0;for(int i=0;i<n;i++){long long want=(m*c[i]+M-1)/M;need+=want-s[i];}return need<=T;};long long lo=0,hi=M;while(lo<hi){long long mid=lo+(hi-lo+1)/2;if(ok(mid))lo=mid;else hi=mid-1;}printf("%lld\\n",lo);}`,

  // m68: only reports groups that actually traded, losing the isolated ones
  m68: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<long long>bal(n+1,0);vector<vector<int>>adj(n+1);vector<char>has(n+1,0);for(int j=0;j<m;j++){int a,b;long long x;scanf("%d %d %lld",&a,&b,&x);bal[a]-=x;bal[b]+=x;adj[a].push_back(b);adj[b].push_back(a);has[a]=1;has[b]=1;}vector<char>seen(n+1,0);string body;long long g=0;for(int s=1;s<=n;s++){if(seen[s]||!has[s])continue;g++;long long nz=0,mv=0;vector<int>st{s};seen[s]=1;while(!st.empty()){int u=st.back();st.pop_back();if(bal[u]!=0)nz++;if(bal[u]>0)mv+=bal[u];for(int v:adj[u])if(!seen[v]){seen[v]=1;st.push_back(v);}}body+=to_string(s);body+=' ';body+=to_string(nz);body+=' ';body+=to_string(mv);body+='\\n';}string o=to_string(g);o+='\\n';o+=body;fwrite(o.data(),1,o.size(),stdout);}`,

  // m69: charges for the deficits as well as the surpluses, doubling the bill
  m69: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);long long h=0,w=0,cost=0;for(int i=0;i<n;i++){long long c,t,f;scanf("%lld %lld %lld",&c,&t,&f);h+=c;w+=t;cost+=llabs(c-t)*f;}printf("%lld\\n",h==w?cost:-1LL);}`,

  // m70: subtracts each lower layer's FULL area, never clipping to the top one
  m70: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<array<long long,4>>r(n);for(int i=0;i<n;i++)scanf("%lld %lld %lld %lld",&r[i][0],&r[i][1],&r[i][2],&r[i][3]);long long a=(r[n-1][2]-r[n-1][0])*(r[n-1][3]-r[n-1][1]);for(int i=0;i<n-1;i++)a-=(r[i][2]-r[i][0])*(r[i][3]-r[i][1]);printf("%lld\\n",a);}`,

  // m71: merges only on overlap, so adjacent ranges never combine
  m71: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);map<long long,long long>cv;int sh=0;char act[16];for(int i=0;i<n;i++){long long l,r;scanf("%lld %lld %s",&l,&r,act);auto it=cv.upper_bound(l);if(it!=cv.begin()){--it;if(it->second>=r){sh++;continue;}}long long nl=l,nr=r;auto jt=cv.lower_bound(l);if(jt!=cv.begin()){auto p=prev(jt);if(p->second>=l)jt=p;}while(jt!=cv.end()&&jt->first<=r){nl=min(nl,jt->first);nr=max(nr,jt->second);jt=cv.erase(jt);}cv[nl]=nr;}printf("%d\\n",sh);}`,

  // m72: cuts at the SMALLEST gaps instead of the largest
  m72: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,k;scanf("%d %d",&n,&k);vector<long long>a(n);for(int i=0;i<n;i++)scanf("%lld",&a[i]);sort(a.begin(),a.end());if(k>=n){printf("0\\n");return 0;}vector<long long>g(n-1);for(int i=0;i+1<n;i++)g[i]=a[i+1]-a[i];sort(g.begin(),g.end());long long t=a[n-1]-a[0];for(int i=0;i<k-1;i++)t-=g[i];printf("%lld\\n",t);}`,

  // m73: finds the candidate block but never verifies that reversing it works
  m73: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>a(n);for(int i=0;i<n;i++)scanf("%lld",&a[i]);int f=-1,l=-1;for(int i=0;i+1<n;i++)if(a[i]>=a[i+1]){if(f<0)f=i;l=i;}if(f<0){printf("1 1\\n");return 0;}printf("%d %d\\n",f+1,l+2);}`,

  // m61: returns the number of distinct brands instead of the window length
  m61: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<int>b(n);for(int i=0;i<n;i++)scanf("%d",&b[i]);set<int>s(b.begin(),b.end());printf("%d\\n",(int)s.size());}`,

  // m62: only checks each service against its own window, never the overload
  m62: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);bool ok=true;for(int i=0;i<n;i++){long long l,r,t;scanf("%lld %lld %lld",&l,&r,&t);if(t>r-l)ok=false;}printf(ok?"YES\\n":"NO\\n");}`,

  // m63: assumes stage 1 is the only start and stage n the only end
  m63: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<long long>w(n+1);for(int i=1;i<=n;i++)scanf("%lld",&w[i]);vector<vector<int>>g(n+1);vector<int>deg(n+1,0);for(int i=0;i<m;i++){int a,b;scanf("%d %d",&a,&b);g[a].push_back(b);deg[b]++;}const long long INF=LLONG_MAX/4;vector<long long>best(n+1,INF);best[1]=w[1];vector<int>q;for(int v=1;v<=n;v++)if(deg[v]==0&&v!=1)q.push_back(v);q.insert(q.begin(),1);vector<int>d(deg);vector<int>order;for(int v=1;v<=n;v++)if(d[v]==0)order.push_back(v);for(size_t h=0;h<order.size();h++){int u=order[h];for(int v:g[u]){if(best[u]!=INF&&best[u]+w[v]<best[v])best[v]=best[u]+w[v];if(--d[v]==0)order.push_back(v);}}printf("%lld\\n",best[n]>=INF?-1LL:best[n]);}`,

  // m64: earliest-ending-first greedy, which ignores the values
  m64: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<array<long long,3>>j(n);for(int i=0;i<n;i++){long long s,e,v;scanf("%lld %lld %lld",&s,&e,&v);j[i]={e,s,v};}sort(j.begin(),j.end());long long last=LLONG_MIN,tot=0;for(int i=0;i<n;i++)if(j[i][1]>=last){tot+=j[i][2];last=j[i][0];}printf("%lld\\n",tot);}`,

  // m65: splits the PATIENTS evenly, ignoring that equal scores are indivisible
  m65: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,k;scanf("%d %d",&n,&k);for(int i=0;i<n;i++){int x;scanf("%d",&x);}printf("%d\\n",(n+k-1)/k);}`,

  // m66: always splits down the middle instead of searching
  m66: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>c(n+1,0),pre(n+1,0);for(int i=1;i<=n;i++){scanf("%lld",&c[i]);pre[i]=pre[i-1]+c[i];}vector<vector<long long>>dp(n+2,vector<long long>(n+2,0));for(int len=2;len<=n;len++)for(int i=1;i+len-1<=n;i++){int j=i+len-1,k=(i+j)/2;dp[i][j]=dp[i][k]+dp[k+1][j]+pre[j]-pre[i-1]+(j-i);}printf("%lld\\n",dp[1][n]);}`,

  // m54: ignores the travel needed to reach the passenger in the first place
  m54: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int f,e,n;scanf("%d %d %d",&f,&e,&n);vector<long long>fr(e,0),at(e,1);string o;for(int i=0;i<n;i++){long long t,a,b;scanf("%lld %lld %lld",&t,&a,&b);int best=0;long long bv=LLONG_MAX;for(int j=0;j<e;j++){long long ar=max(t,fr[j]);if(ar<bv){bv=ar;best=j;}}long long d=bv+llabs(a-b);fr[best]=d;at[best]=b;o+=to_string(d);o+='\\n';}fwrite(o.data(),1,o.size(),stdout);}`,

  // m55: routes to the HIGHEST qualifying success rate rather than the cheapest
  m55: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,q;scanf("%d %d",&n,&q);vector<long long>P,C;vector<char>L;for(int i=0;i<n;i++){long long p,c;scanf("%lld %lld",&p,&c);P.push_back(p);C.push_back(c);L.push_back(1);}string o;char op[16];for(int i=0;i<q;i++){scanf("%s",op);if(op[0]=='A'){long long p,c;scanf("%lld %lld",&p,&c);P.push_back(p);C.push_back(c);L.push_back(1);}else if(op[1]=='E'){int id;scanf("%d",&id);L[id-1]=0;}else{long long r;scanf("%lld",&r);int bi=-1;for(size_t j=0;j<P.size();j++)if(L[j]&&P[j]>=r&&(bi<0||P[j]>P[bi]))bi=(int)j;o+=to_string(bi<0?-1LL:C[bi]);o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // m56: clamps into the box but skips the isotonic step entirely
  m56: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long m;scanf("%d %lld",&n,&m);vector<long long>s(n);long long t=0;for(int i=0;i<n;i++){scanf("%lld",&s[i]);t+=s[i];}if(t<(long long)n*m){printf("-1\\n");return 0;}long long cap=t-(long long)n*m,cost=0,pre=0;for(int i=1;i<=n-1;i++){pre+=s[i-1];long long A=pre-(long long)i*m;if(A<0)cost+=-A;else if(A>cap)cost+=A-cap;}printf("%lld\\n",cost);}`,

  // m57: breaks priority ties towards the HIGHEST ticket number
  m57: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<pair<long long,int>>t(n);for(int i=0;i<n;i++){long long p;scanf("%lld",&p);t[i]=make_pair(-p,-(i+1));}sort(t.begin(),t.end());string o;for(int i=0;i<n;i++){if(i)o+=' ';o+=to_string(-t[i].second);}o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,

  // m58: counts only the warehouses that are some customer's ONLY option,
  //      which is a lower bound and never reports -1
  m58: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;long long d;scanf("%d %d %lld",&n,&m,&d);vector<long long>wx(n),wy(n);for(int i=0;i<n;i++)scanf("%lld %lld",&wx[i],&wy[i]);long long d2=d*d;vector<char>need(n,0);for(int j=0;j<m;j++){long long cx,cy;scanf("%lld %lld",&cx,&cy);int cnt=0,last=-1;for(int i=0;i<n;i++){long long dx=cx-wx[i],dy=cy-wy[i];if(dx*dx+dy*dy<=d2){cnt++;last=i;}}if(cnt==1)need[last]=1;}int c=0;for(int i=0;i<n;i++)c+=need[i];printf("%d\\n",c);}`,

  // m59: sorts by START time instead of deadline
  m59: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<pair<long long,long long>>j(n);for(int i=0;i<n;i++){long long s,e;scanf("%lld %lld",&s,&e);j[i]=make_pair(s,e);}sort(j.begin(),j.end());set<long long>used;int done=0;for(int i=0;i<n;i++){long long t=j[i].first;while(used.count(t))t++;if(t<=j[i].second){used.insert(t);done++;}}printf("%d\\n",done);}`,

  // m60: lowercases but forgets to delete the non-letters
  m60: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;cin.ignore(numeric_limits<streamsize>::max(),'\\n');set<string>seen;string line;for(int i=0;i<n;i++){if(!getline(cin,line))line.clear();string t;for(char ch:line)t+=(char)tolower((unsigned char)ch);sort(t.begin(),t.end());seen.insert(t);}cout<<seen.size()<<'\\n';}`,

  // m48: reports the peak overlap, forgetting the cancellation entirely
  m48: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<pair<long long,int>>ev;for(int i=0;i<n;i++){long long a,d;scanf("%lld %lld",&a,&d);ev.push_back({a,1});ev.push_back({d+1,-1});}sort(ev.begin(),ev.end());int c=0,p=0;for(auto&e:ev){c+=e.second;p=max(p,c);}printf("%d\\n",p);}`,

  // m49: sums the signed gap traffic instead of the absolute values
  m49: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>a(n);long long t=0;for(int i=0;i<n;i++){scanf("%lld",&a[i]);t+=a[i];}if(t%n!=0){printf("-1\\n");return 0;}long long av=t/n,pre=0,ops=0;for(int i=0;i<n-1;i++){pre+=a[i];ops+=pre-(long long)(i+1)*av;}printf("%lld\\n",ops);}`,

  // m50: pairs the biggest discounts with the CHEAPEST items
  m50: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,m;scanf("%d %d",&n,&m);vector<long long>p(n),d(m);long long t=0;for(int i=0;i<n;i++){scanf("%lld",&p[i]);t+=p[i];}for(int j=0;j<m;j++)scanf("%lld",&d[j]);sort(p.begin(),p.end());sort(d.rbegin(),d.rend());long long s=0;int k=min(n,m);for(int i=0;i<k;i++)s+=p[i]*d[i];printf("%lld\\n",100LL*t-s);}`,

  // m51: reads the k-th character by counting DOWN from the newest end
  m51: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int q;scanf("%d",&q);vector<int>par(q+1,0),dep(q+1,0);vector<char>ch(q+1,0);int vs=0;string o;char op[16];for(int i=0;i<q;i++){scanf("%s",op);if(op[0]=='E'){int v;char c[8];scanf("%d %s",&v,c);int cur=++vs;par[cur]=v;dep[cur]=dep[v]+1;ch[cur]=c[0];}else{int v,k;scanf("%d %d",&v,&k);int node=v;for(int s=1;s<k;s++)node=par[node];o+=ch[node];o+='\\n';}}fwrite(o.data(),1,o.size(),stdout);}`,

  // m52: uses a STRICTLY increasing subsequence, so equal shifted values are
  //      wrongly treated as incompatible
  m52: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<long long>t;for(int i=0;i<n;i++){long long a;scanf("%lld",&a);long long b=a-i;auto it=lower_bound(t.begin(),t.end(),b);if(it==t.end())t.push_back(b);else *it=b;}printf("%d\\n",n-(int)t.size());}`,

  // m53: forgets that the running total starts at 0 before anything is read
  m53: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){static char b[200006];scanf("%s",b);int n=strlen(b);vector<long long>seen(2*n+2,0);int cur=n;long long ans=0;for(int i=0;i<n;i++){cur+=(b[i]=='1')?1:-1;ans+=seen[cur];seen[cur]++;}printf("%lld\\n",ans);}`,

  // m42: counts palindromic substrings by POSITION, not distinct content
  m42: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){static char b[200006];scanf("%s",b);string s=b;int n=s.size();long long cnt=0;for(int i=0;i<n;i++){for(int j=i;j<n;j++){bool p=true;for(int a=i,c=j;a<c;a++,c--)if(s[a]!=s[c]){p=false;break;}if(p)cnt++;}}printf("%lld\\n",cnt);}`,

  // m43: nearest-unvisited-stop greedy instead of an exact tour
  m43: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);int m=n+1;vector<vector<long long>>d(m,vector<long long>(m));for(int i=0;i<m;i++)for(int j=0;j<m;j++)scanf("%lld",&d[i][j]);vector<char>vis(m,0);vis[0]=1;int at=0;long long tot=0;for(int s=0;s<n;s++){int b=-1;for(int j=1;j<m;j++)if(!vis[j]&&(b<0||d[at][j]<d[at][b]))b=j;vis[b]=1;tot+=d[at][b];at=b;}tot+=d[at][0];printf("%lld\\n",tot);}`,

  // m44: charges for every car, including the ones turned away
  m44: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n,k;scanf("%d %d",&n,&k);long long r=0;for(int i=0;i<n;i++){long long a,d;scanf("%lld %lld",&a,&d);r+=d-a;}printf("%lld\\n",r);}`,

  // m45: sorted greedy - hand each item to whichever heir is behind
  m45: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;scanf("%d",&n);vector<int>a(n);for(auto&x:a)scanf("%d",&x);if(n==1){printf("-1\\n");return 0;}sort(a.rbegin(),a.rend());long long x=0,y=0;for(int v:a){if(x<=y)x+=v;else y+=v;}printf("%lld\\n",llabs(x-y));}`,

  // m46: resets the run length to 1 at a broken key instead of 0
  m46: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){static char b[1000006];scanf("%s",b);int n=strlen(b);int k;scanf("%d",&k);bool w[26]={false};for(int i=0;i<k;i++){char c[8];scanf("%s",c);w[c[0]-'a']=true;}int best=0,run=0;for(int i=0;i<n;i++){if(w[b[i]-'a'])run++;else run=1;if(run>best)best=run;}printf("%d\\n",best);}`,

  // m47: a rejected request still drains what it could
  m47: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){int n;long long C;scanf("%d %lld",&n,&C);long long lv=C,pv=0;int ok=0;for(int i=0;i<n;i++){long long t,c;scanf("%lld %lld",&t,&c);lv=min(C,lv+(t-pv));pv=t;if(lv>=c){lv-=c;ok++;}else lv=0;}printf("%d\\n",ok);}`,

  // m41: restarts from scratch after a match, so overlaps are missed
  m41: `#include <bits/stdc++.h>\nusing namespace std;\nstatic char pb[1000006],sb[1000006];\nint main(){scanf("%s",pb);scanf("%s",sb);int np=(int)strlen(pb),ns=(int)strlen(sb);vector<int>f(np,0);for(int i=1;i<np;i++){int j=f[i-1];while(j>0&&pb[i]!=pb[j])j=f[j-1];if(pb[i]==pb[j])j++;f[i]=j;}vector<int>hits;int j=0;for(int i=0;i<ns;i++){while(j>0&&sb[i]!=pb[j])j=f[j-1];if(sb[i]==pb[j])j++;if(j==np){hits.push_back(i-np+2);j=0;}}string o;o+=to_string(hits.size());o+='\\n';for(size_t k=0;k<hits.size();k++){if(k)o+=' ';o+=to_string(hits[k]);}o+='\\n';fwrite(o.data(),1,o.size(),stdout);}`,
};
// m4's "wrong" one is actually correct except it never dedupes -> duplicates break the run count.
// m5's stores the LAST index instead of the first -> shorter answers.
// m6 sorts starts before ends at equal coords -> breaks the half-open rule.
// m7 is plain Kadane with no mandatory deletion.
// m18 prints the lower bound and ignores that the runs must be contiguous.
// m19 sorts descending and pairs neighbours, putting the two longest together.
// m20 uses a strict `<` and so never reuses a hall on a touching boundary.
// m21 sorts once and merges left to right instead of re-queuing each new segment.
// m22 sorts the heights, forgetting a rectangle needs adjacent bars.
// m23 is shortest-job-first that never preempts.

const WS = path.join(__dirname, '..', 'workspace');

/** Judging writes the posted code to the workspace file, so snapshot first. */
function snapshotWorkspace() {
  if (!fs.existsSync(WS)) return {};
  const snap = {};
  for (const f of fs.readdirSync(WS)) {
    const p = path.join(WS, f);
    if (fs.statSync(p).isFile()) snap[p] = fs.readFileSync(p, 'utf8');
  }
  return snap;
}
/**
 * Write back only what actually differs. A blanket rewrite churns the mtime of
 * every file, which makes VS Code reload buffers and - worse - races with the
 * portal or an editor saving in another window. Untouched files are left
 * completely alone.
 */
function restoreWorkspace(snap) {
  for (const [p, content] of Object.entries(snap)) {
    let cur = null;
    try { cur = fs.readFileSync(p, 'utf8'); } catch (_) {}
    if (cur !== content) fs.writeFileSync(p, content, 'utf8');
  }
}

(async () => {
  console.log('\nFull-system check   ' + BASE + '\n');

  // isolated account: this suite records dozens of submissions
  let r = await call('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username: '_selftest', password: 'selftest' }),
  });
  if (r.status !== 200) { console.log('  cannot sign in - is the server running?\n'); process.exit(1); }
  token = r.body.token;

  const snapshot = snapshotWorkspace();
  process.on('exit', () => restoreWorkspace(snapshot));

  const dirs = fs.readdirSync(PROBLEMS).filter((d) =>
    fs.existsSync(path.join(PROBLEMS, d, 'problem.json')));

  // Optional id filter, same as build_tests.js: `node tools/check_all.js c5 c8`.
  // A full run is ~25 minutes, which is a long way to go to re-read one line.
  const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));

  const rows = [];
  for (const d of dirs) {
    const meta = JSON.parse(fs.readFileSync(path.join(PROBLEMS, d, 'problem.json'), 'utf8'));
    if (only.length && !only.includes(meta.id)) continue;
    const ref = fs.readFileSync(path.join(PROBLEMS, d, 'solutions', 'ref.cpp'), 'utf8');

    const good = await call(`/api/judge/${meta.id}`, {
      method: 'POST', body: JSON.stringify({ mode: 'submit', lang: 'cpp', code: ref }),
    });

    const bad = await call(`/api/judge/${meta.id}`, {
      method: 'POST', body: JSON.stringify({ mode: 'submit', lang: 'cpp', code: WRONG[meta.id] }),
    });

    rows.push({
      id: meta.id, doc: meta.docId, title: meta.title, tl: meta.timeLimitMs,
      refVerdict: good.body.verdict, refPassed: `${good.body.passed}/${good.body.total}`,
      refMs: good.body.maxTimeMs, badVerdict: bad.body.verdict,
      badAt: (bad.body.tests || []).findIndex((t) => t.verdict !== 'AC') + 1,
    });
  }

  console.log('  ' + 'id'.padEnd(4) + 'doc'.padEnd(5) + 'title'.padEnd(28) +
              'reference'.padEnd(20) + 'peak'.padEnd(9) + 'wrong soln');
  console.log('  ' + '-'.repeat(88));

  let fails = 0;
  for (const x of rows) {
    const refOk = x.refVerdict === 'AC';
    const badOk = x.badVerdict !== 'AC';
    if (!refOk || !badOk) fails++;
    const headroom = Math.round((x.refMs / x.tl) * 100);
    console.log(
      '  ' + x.id.padEnd(4) + x.doc.padEnd(5) + x.title.slice(0, 26).padEnd(28) +
      `${refOk ? 'AC' : x.refVerdict} ${x.refPassed}`.padEnd(20) +
      `${x.refMs}ms/${headroom}%`.padEnd(9) +
      (badOk ? `${x.badVerdict} @test ${x.badAt}` : 'NOT CAUGHT')
    );
  }

  console.log('');
  const refBad = rows.filter((x) => x.refVerdict !== 'AC').length;
  const missed = rows.filter((x) => x.badVerdict === 'AC').length;
  console.log(`  reference solutions accepted : ${rows.length - refBad}/${rows.length}`);
  console.log(`  wrong solutions rejected     : ${rows.length - missed}/${rows.length}`);
  const worst = Math.max(...rows.map((x) => Math.round((x.refMs / x.tl) * 100)));
  console.log(`  worst time-limit headroom    : ${worst}% used`);
  restoreWorkspace(snapshot);
  console.log('  workspace restored - your files were not touched');
  console.log('');
  console.log(fails === 0 ? `  ALL ${rows.length} PROBLEMS JUDGE CORRECTLY\n` : `  ${fails} PROBLEM(S) BROKEN\n`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('\n  ' + e.message + '\n'); process.exitCode = 1; });
