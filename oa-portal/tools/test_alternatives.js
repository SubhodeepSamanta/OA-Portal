'use strict';
/**
 * "Will ANY correct solution pass, or only the one I had in mind?"
 *
 * This submits deliberately DIFFERENT correct programs and requires AC:
 *   - a different algorithm from the reference
 *   - a slower (but still fast enough) algorithm
 *   - scanf/printf instead of cin/cout
 *   - explicit headers instead of <bits/stdc++.h>
 *   - the function stub deleted entirely, own main()
 *   - Java with a class name other than Main
 *   - sloppy output: trailing spaces, extra blank lines
 */
const BASE = process.env.BASE || 'http://localhost:4321';

let token = null;
async function call(p, opts = {}) {
  const r = await fetch(BASE + p, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
  });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}

const CASES = [
  {
    id: 'm4', lang: 'cpp',
    why: 'different algorithm: hash set O(n), reference sorts',
    code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; scanf("%d",&n);
    unordered_set<int> s; s.reserve(n*2);
    for(int i=0;i<n;i++){ int x; scanf("%d",&x); s.insert(x); }
    int best=1;
    for(int x : s){
        if(s.count(x-1)) continue;
        int len=0; long long v=x;
        while(v<=2000000000LL && s.count((int)v)){ len++; v++; }
        best=max(best,len);
    }
    printf("%d\\n",best);
}`,
  },
  {
    id: 'm1', lang: 'cpp',
    why: 'slower std::map O(n log n) + scanf, no bits/stdc++.h',
    code: `#include <cstdio>
#include <map>
using namespace std;
int main(){
    int n; long long k;
    if(scanf("%d %lld",&n,&k)!=2) return 0;
    map<long long,long long> f;
    f[0]=1;
    long long pref=0, ans=0;
    for(int i=0;i<n;i++){
        long long v; scanf("%lld",&v);
        pref+=v;
        map<long long,long long>::iterator it=f.find(pref-k);
        if(it!=f.end()) ans+=it->second;
        f[pref]++;
    }
    printf("%lld\\n",ans);
}`,
  },
  {
    id: 'm7', lang: 'cpp',
    why: 'prefix/suffix join instead of the two-state DP',
    code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n;
    vector<long long> a(n); for(auto &x:a) cin>>x;
    const long long NEG = LLONG_MIN/4;
    vector<long long> endAt(n), bestL(n), startAt(n), bestR(n);
    endAt[0]=a[0]; bestL[0]=a[0];
    for(int i=1;i<n;i++){ endAt[i]=max(a[i], endAt[i-1]+a[i]); bestL[i]=max(bestL[i-1], endAt[i]); }
    startAt[n-1]=a[n-1]; bestR[n-1]=a[n-1];
    for(int i=n-2;i>=0;i--){ startAt[i]=max(a[i], startAt[i+1]+a[i]); bestR[i]=max(bestR[i+1], startAt[i]); }
    long long ans=NEG;
    for(int d=0; d<n; d++){
        if(d-1>=0) ans=max(ans, bestL[d-1]);
        if(d+1<n)  ans=max(ans, bestR[d+1]);
        if(d-1>=0 && d+1<n) ans=max(ans, endAt[d-1]+startAt[d+1]);
    }
    cout<<ans<<"\\n";
}`,
  },
  {
    id: 'm15', lang: 'cpp',
    why: 'full 2D dp table, own main, stub deleted',
    code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    ios::sync_with_stdio(false); cin.tie(0);
    int n; cin>>n;
    vector<long long> p(n); for(auto &x:p) cin>>x;
    const long long NEG=LLONG_MIN/4;
    vector<array<long long,4>> dp(n);
    for(auto &r:dp) r={NEG,NEG,NEG,NEG};
    dp[0][0]=0; dp[0][1]=p[0];
    for(int i=1;i<n;i++){
        dp[i][0]=max(dp[i-1][0], dp[i-1][1]);
        dp[i][1]=dp[i-1][0]+p[i];
        dp[i][2]=max(dp[i-1][2], dp[i-1][3]);
        long long c=NEG;
        if(dp[i-1][2]>NEG) c=max(c, dp[i-1][2]+p[i]);
        if(dp[i-1][1]>NEG) c=max(c, dp[i-1][1]+p[i]);
        dp[i][3]=c;
    }
    long long best=NEG;
    for(int j=0;j<4;j++) best=max(best, dp[n-1][j]);
    cout<<best<<endl;
}`,
  },
  {
    id: 'm10', lang: 'cpp',
    why: 'sloppy output: trailing spaces and extra blank lines',
    code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; cin>>n;
    vector<long long> a(n); for(auto &x:a) cin>>x;
    long long tot=0; for(auto v:a) tot+=v;
    long long cur=a[0], best=a[0];
    for(int i=1;i<n;i++){ cur=min(a[i], cur+a[i]); best=min(best,cur); }
    cout << "   " << (tot - min(0LL,best)) << "   \\n\\n\\n";
}`,
  },
  {
    id: 'm1', lang: 'java',
    why: 'Java, class named Solution rather than Main',
    code: `import java.io.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        long k = Long.parseLong(st.nextToken());
        HashMap<Long, Long> f = new HashMap<>();
        f.put(0L, 1L);
        long pref = 0, ans = 0;
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            pref += Long.parseLong(st.nextToken());
            Long c = f.get(pref - k);
            if (c != null) ans += c;
            f.merge(pref, 1L, Long::sum);
        }
        System.out.println(ans);
    }
}`,
  },
  {
    id: 'm11', lang: 'java',
    why: 'Java, Scanner instead of fast IO, different loop shape',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int n = s.length();
        long totalA = 0, totalB = 0;
        for (char c : s.toCharArray()) { if (c == 'a') totalA++; else totalB++; }
        long best = Long.MAX_VALUE, aB = 0, bB = 0;
        for (int i = 0; i <= n; i++) {
            if (aB >= 1 && (totalB - bB) >= 1) best = Math.min(best, bB + (totalA - aB));
            if (i < n) { if (s.charAt(i) == 'a') aB++; else bB++; }
        }
        System.out.println(best == Long.MAX_VALUE ? -1 : best);
    }
}`,
  },
  {
    id: 'm13', lang: 'cpp',
    why: 'O(n log n) with a different structure, not the stack sweep',
    code: `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; long long t; cin>>n>>t;
    vector<long long> P(n+1,0);
    for(int i=0;i<n;i++){ long long v; cin>>v; P[i+1]=P[i]+v-t; }
    // for each j, find the smallest i <= j with P[i] <= P[j] using a
    // prefix-minimum array plus binary search
    vector<long long> pmin(n+1);
    pmin[0]=P[0];
    for(int i=1;i<=n;i++) pmin[i]=min(pmin[i-1],P[i]);
    int best=0;
    for(int j=1;j<=n;j++){
        int lo=0, hi=j-1, found=-1;
        while(lo<=hi){ int mid=(lo+hi)/2;
            if(pmin[mid]<=P[j]){ found=mid; hi=mid-1; } else lo=mid+1; }
        if(found>=0) best=max(best, j-found);
    }
    cout<<best<<"\\n";
}`,
  },
];

(async () => {
  console.log('\n  Will any correct solution pass?\n');

  let r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: '_selftest', password: 'selftest' }) });
  if (r.status !== 200) { console.log('  server not running\n'); process.exit(1); }
  token = r.body.token;

  console.log('  ' + 'prob'.padEnd(6) + 'lang'.padEnd(6) + 'verdict'.padEnd(9) + 'what makes it different');
  console.log('  ' + '-'.repeat(84));

  let fails = 0;
  for (const c of CASES) {
    const res = await call(`/api/judge/${c.id}`, {
      method: 'POST', body: JSON.stringify({ mode: 'submit', lang: c.lang, code: c.code }),
    });
    const v = res.body.verdict;
    const ok = v === 'AC';
    if (!ok) fails++;
    let extra = c.why;
    if (!ok) {
      const bad = (res.body.tests || []).find((t) => t.verdict !== 'AC');
      extra += `   << ${bad ? `test ${bad.index}: ${(bad.message || '').split('\n')[0].slice(0, 40)}`
                          : (res.body.compileError || '').split('\n')[0].slice(0, 60)}`;
    }
    console.log('  ' + c.id.padEnd(6) + c.lang.padEnd(6) + (ok ? v : v).padEnd(9) + extra);
  }

  console.log('');
  console.log(fails === 0
    ? `  ALL ${CASES.length} ALTERNATIVE SOLUTIONS ACCEPTED\n`
    : `  ${fails} REJECTED - the judge is too strict\n`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exitCode = 1; });
