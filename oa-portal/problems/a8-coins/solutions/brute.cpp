// Brute force - a8 / Q96
// Enumerates all 2^n head/tail outcomes and adds up the probability of each
// one that has more heads than tails. No recurrence at all.
//
// Exponential, so above the bound it falls back to a FULL two-dimensional
// table filled forwards, dp[i][k], which neither rolls nor walks k downward -
// so it cannot share the reference's in-place update bug.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<double> p(n);
    for (int i = 0; i < n; i++) scanf("%lf", &p[i]);

    if (n <= 20) {
        double ans = 0.0;
        for (int mask = 0; mask < (1 << n); mask++) {
            int heads = __builtin_popcount(mask);
            if (2 * heads <= n) continue;
            double pr = 1.0;
            for (int i = 0; i < n; i++) pr *= (mask >> i & 1) ? p[i] : (1.0 - p[i]);
            ans += pr;
        }
        printf("%.10f\n", ans);
        return 0;
    }

    vector<vector<double>> dp(n + 1, vector<double>(n + 1, 0.0));
    dp[0][0] = 1.0;
    for (int i = 0; i < n; i++) {
        for (int k = 0; k <= i; k++) {
            dp[i + 1][k + 1] += dp[i][k] * p[i];
            dp[i + 1][k] += dp[i][k] * (1.0 - p[i]);
        }
    }

    double ans = 0.0;
    for (int k = (n + 1) / 2; k <= n; k++) ans += dp[n][k];

    printf("%.10f\n", ans);
    return 0;
}
