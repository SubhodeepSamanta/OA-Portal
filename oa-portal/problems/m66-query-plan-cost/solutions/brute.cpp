// Brute force - m66 / Q161
// The plain O(n^3) interval DP: try every split point for every interval.
// No monotonicity assumed, so it independently checks the optimisation.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> c(n + 1, 0), pre(n + 1, 0);
    for (int i = 1; i <= n; i++) { scanf("%lld", &c[i]); pre[i] = pre[i - 1] + c[i]; }

    auto w = [&](int i, int j) { return pre[j] - pre[i - 1] + (long long)(j - i); };

    vector<vector<long long>> dp(n + 2, vector<long long>(n + 2, 0));
    for (int len = 2; len <= n; len++)
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            long long best = LLONG_MAX;
            for (int k = i; k <= j - 1; k++) best = min(best, dp[i][k] + dp[k + 1][j]);
            dp[i][j] = best + w(i, j);
        }

    printf("%lld\n", dp[1][n]);
    return 0;
}
