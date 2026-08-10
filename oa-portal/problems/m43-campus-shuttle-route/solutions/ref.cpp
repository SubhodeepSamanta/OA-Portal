// Reference - m43 / Q130 Campus Shuttle Route
// Held-Karp: dp[mask][i] = cheapest way to have visited exactly the stops in
// mask and be standing at stop i.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int m = n + 1;
    vector<vector<long long>> d(m, vector<long long>(m));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < m; j++) scanf("%lld", &d[i][j]);

    const long long INF = LLONG_MAX / 4;
    int full = 1 << n;
    vector<vector<long long>> dp(full, vector<long long>(n, INF));
    for (int i = 0; i < n; i++) dp[1 << i][i] = d[0][i + 1];

    for (int mask = 1; mask < full; mask++)
        for (int i = 0; i < n; i++) {
            if (dp[mask][i] >= INF || !(mask & (1 << i))) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                int nm = mask | (1 << j);
                long long v = dp[mask][i] + d[i + 1][j + 1];
                if (v < dp[nm][j]) dp[nm][j] = v;
            }
        }

    long long best = INF;
    for (int i = 0; i < n; i++)
        if (dp[full - 1][i] < INF) best = min(best, dp[full - 1][i] + d[i + 1][0]);

    printf("%lld\n", best);
    return 0;
}
