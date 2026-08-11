// Brute force - c4 / Q27
// Exact dynamic programming, no search at all: best[j][i] is the smallest
// achievable maximum when the first i elements are cut into j pieces.
// O(k * n^2), so it is only usable while n stays small.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> x(n + 1), pre(n + 1, 0);
    for (int i = 1; i <= n; i++) { scanf("%lld", &x[i]); pre[i] = pre[i - 1] + x[i]; }

    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> best(k + 1, vector<long long>(n + 1, INF));
    best[0][0] = 0;

    for (int j = 1; j <= k; j++) {
        for (int i = j; i <= n; i++) {
            // the last piece covers x[p+1..i]
            for (int p = j - 1; p < i; p++) {
                if (best[j - 1][p] == INF) continue;
                long long cand = max(best[j - 1][p], pre[i] - pre[p]);
                best[j][i] = min(best[j][i], cand);
            }
        }
    }

    // fewer pieces is always allowed and never worse, but take the min anyway
    long long ans = INF;
    for (int j = 1; j <= k; j++) ans = min(ans, best[j][n]);
    printf("%lld\n", ans);
    return 0;
}
