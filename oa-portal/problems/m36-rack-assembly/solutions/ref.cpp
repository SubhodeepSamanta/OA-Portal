// Reference - m36 / Q109 Rack Assembly
// Bitmask DP: dp[mask] = cheapest way to commission the first popcount(mask)
// servers into exactly the positions in mask.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<long long>> c(n, vector<long long>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%lld", &c[i][j]);

    const long long INF = LLONG_MAX / 4;
    vector<long long> dp(1 << n, INF);
    dp[0] = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] >= INF) continue;
        int i = __builtin_popcount(mask);      // next server to place
        if (i == n) continue;
        for (int j = 0; j < n; j++) {
            if (mask & (1 << j)) continue;
            int nm = mask | (1 << j);
            if (dp[mask] + c[i][j] < dp[nm]) dp[nm] = dp[mask] + c[i][j];
        }
    }
    printf("%lld\n", dp[(1 << n) - 1]);
    return 0;
}
