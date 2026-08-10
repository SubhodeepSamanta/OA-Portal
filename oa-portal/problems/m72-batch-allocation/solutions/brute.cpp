// Brute force - m72 / Q167
// Exact DP over cut positions: best[j][i] = smallest total spread using j
// batches to cover the first i sorted trainees. No greedy, no gap argument.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    sort(a.begin(), a.end());

    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> best(k + 1, vector<long long>(n + 1, INF));
    best[0][0] = 0;
    for (int j = 1; j <= k; j++)
        for (int i = 1; i <= n; i++)
            for (int p = 0; p < i; p++)
                if (best[j - 1][p] < INF)
                    best[j][i] = min(best[j][i], best[j - 1][p] + (a[i - 1] - a[p]));

    printf("%lld\n", best[k][n]);
    return 0;
}
