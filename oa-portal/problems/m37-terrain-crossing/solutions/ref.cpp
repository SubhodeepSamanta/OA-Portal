// Reference - m37 / Q110 Terrain Crossing
// Bottleneck DP in reading order: best[i][j] = min over the two predecessors
// of max(best[pred], |h[i][j] - h[pred]|).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<vector<long long>> h(r, vector<long long>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%lld", &h[i][j]);

    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> best(r, vector<long long>(c, INF));
    best[0][0] = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            if (i == 0 && j == 0) continue;
            long long v = INF;
            if (i > 0 && best[i - 1][j] < INF)
                v = min(v, max(best[i - 1][j], llabs(h[i][j] - h[i - 1][j])));
            if (j > 0 && best[i][j - 1] < INF)
                v = min(v, max(best[i][j - 1], llabs(h[i][j] - h[i][j - 1])));
            best[i][j] = v;
        }

    printf("%lld\n", best[r - 1][c - 1]);
    return 0;
}
