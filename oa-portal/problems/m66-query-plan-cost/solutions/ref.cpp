// Reference - m66 / Q161 Query Plan Cost
//
// Interval DP with Knuth optimisation. The weight of a group is
// w(i,j) = sum(c[i..j]) + (j - i), a plain interval sum, so it satisfies the
// quadrangle inequality and opt[i][j-1] <= opt[i][j] <= opt[i+1][j].
// That turns the O(n^3) split search into O(n^2) overall.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> c(n + 1, 0), pre(n + 1, 0);
    for (int i = 1; i <= n; i++) { scanf("%lld", &c[i]); pre[i] = pre[i - 1] + c[i]; }

    // w(i,j) = sum of c over [i..j], plus the (j-i) joins inside it
    auto w = [&](int i, int j) { return pre[j] - pre[i - 1] + (long long)(j - i); };

    vector<vector<long long>> dp(n + 2, vector<long long>(n + 2, 0));
    vector<vector<int>> opt(n + 2, vector<int>(n + 2, 0));
    for (int i = 1; i <= n; i++) { dp[i][i] = 0; opt[i][i] = i; }

    for (int len = 2; len <= n; len++)
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            long long best = LLONG_MAX;
            int bestK = opt[i][j - 1];
            int loK = opt[i][j - 1], hiK = opt[i + 1][j];
            if (loK < i) loK = i;
            if (hiK > j - 1) hiK = j - 1;
            for (int k = loK; k <= hiK; k++) {
                long long v = dp[i][k] + dp[k + 1][j];
                if (v < best) { best = v; bestK = k; }
            }
            dp[i][j] = best + w(i, j);
            opt[i][j] = bestK;
        }

    printf("%lld\n", dp[1][n]);
    return 0;
}
