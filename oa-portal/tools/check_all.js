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
function restoreWorkspace(snap) {
  for (const [p, content] of Object.entries(snap)) fs.writeFileSync(p, content, 'utf8');
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

  const rows = [];
  for (const d of dirs) {
    const meta = JSON.parse(fs.readFileSync(path.join(PROBLEMS, d, 'problem.json'), 'utf8'));
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
