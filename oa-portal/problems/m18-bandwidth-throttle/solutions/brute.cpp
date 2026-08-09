// Brute force - m18 / Q29
// Exact O(k*n^2) DP over cut positions. No binary search, no greedy: this is
// the definition of the problem written out directly.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long k;
    if (scanf("%d %lld", &n, &k) != 2) return 0;
    vector<long long> s(n);
    for (auto &x : s) scanf("%lld", &x);

    int K = (int)min<long long>(k, (long long)n);
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + s[i];

    const long long INF = LLONG_MAX / 4;
    // dp[j][i] = best achievable maximum block sum covering the first i files
    //            with exactly j blocks
    vector<vector<long long>> dp(K + 1, vector<long long>(n + 1, INF));
    dp[0][0] = 0;
    for (int j = 1; j <= K; j++)
        for (int i = 1; i <= n; i++)
            for (int p = 0; p < i; p++)
                if (dp[j - 1][p] < INF)
                    dp[j][i] = min(dp[j][i], max(dp[j - 1][p], pre[i] - pre[p]));

    long long best = INF;
    for (int j = 1; j <= K; j++) best = min(best, dp[j][n]);
    printf("%lld\n", best);
    return 0;
}
