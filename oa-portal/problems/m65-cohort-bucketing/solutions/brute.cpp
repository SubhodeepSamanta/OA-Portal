// Brute force - m65 / Q160
// Exact DP over cut positions: best[j][i] = smallest achievable largest piece
// using j pieces to cover the first i counts. No binary search, no greedy.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<int> s(n);
    for (int i = 0; i < n; i++) scanf("%d", &s[i]);
    sort(s.begin(), s.end());

    vector<long long> counts;
    for (int i = 0; i < n;) {
        int j = i;
        while (j < n && s[j] == s[i]) j++;
        counts.push_back(j - i);
        i = j;
    }

    int d = (int)counts.size();
    int K = min(k, d);
    vector<long long> pre(d + 1, 0);
    for (int i = 0; i < d; i++) pre[i + 1] = pre[i] + counts[i];

    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> best(K + 1, vector<long long>(d + 1, INF));
    best[0][0] = 0;
    for (int j = 1; j <= K; j++)
        for (int i = 1; i <= d; i++)
            for (int p = 0; p < i; p++)
                if (best[j - 1][p] < INF)
                    best[j][i] = min(best[j][i], max(best[j - 1][p], pre[i] - pre[p]));

    long long ans = INF;
    for (int j = 1; j <= K; j++) ans = min(ans, best[j][d]);
    printf("%lld\n", ans);
    return 0;
}
