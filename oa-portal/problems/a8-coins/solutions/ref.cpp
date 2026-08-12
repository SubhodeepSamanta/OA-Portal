// Reference - a8 / Q96 Coins (AtCoder EDPC I)
// dp[k] = probability that exactly k of the coins tossed so far came up heads.
// One rolling array, k walked DOWNWARD so dp[k-1] is still the previous coin's
// value when it is read.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<double> p(n);
    for (int i = 0; i < n; i++) scanf("%lf", &p[i]);

    vector<double> dp(n + 1, 0.0);
    dp[0] = 1.0;
    for (int i = 0; i < n; i++) {
        for (int k = i + 1; k >= 1; k--) {
            dp[k] = dp[k] * (1.0 - p[i]) + dp[k - 1] * p[i];
        }
        dp[0] *= (1.0 - p[i]);
    }

    // n is odd, so "more heads than tails" is exactly k >= (n+1)/2
    double ans = 0.0;
    for (int k = (n + 1) / 2; k <= n; k++) ans += dp[k];

    printf("%.10f\n", ans);
    return 0;
}
