// Reference - c1 / Q10 Subarray Divisibility (CSES 1662)
// a[i..j] is divisible by n exactly when P[j] and P[i-1] share a residue mod n.
// One pass over the prefix sums, counting pairs as they appear.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    vector<long long> cnt(n, 0);
    cnt[0] = 1;                    // P[0] = 0 is a real prefix
    long long pref = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long v; scanf("%lld", &v);
        pref += v;
        int r = (int)(((pref % n) + n) % n);   // C++ % keeps the sign of the dividend
        ans += cnt[r];
        cnt[r]++;
    }
    printf("%lld\n", ans);
    return 0;
}
