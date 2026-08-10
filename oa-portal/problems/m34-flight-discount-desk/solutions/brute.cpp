// Brute force - m34 / Q77
// Bellman-Ford over the same two-layer state space: sweep every transition
// until nothing improves. No heap, no visited set.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> U(m), V(m);
    vector<long long> C(m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &U[i], &V[i], &C[i]);

    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> d(2, vector<long long>(n + 1, INF));
    d[0][1] = 0;

    bool changed = true;
    int guard = 0;
    while (changed && guard <= 2 * n + 4) {
        changed = false;
        guard++;
        for (int i = 0; i < m; i++) {
            if (d[0][U[i]] < INF) {
                if (d[0][U[i]] + C[i] < d[0][V[i]]) { d[0][V[i]] = d[0][U[i]] + C[i]; changed = true; }
                if (d[0][U[i]] + C[i] / 2 < d[1][V[i]]) { d[1][V[i]] = d[0][U[i]] + C[i] / 2; changed = true; }
            }
            if (d[1][U[i]] < INF && d[1][U[i]] + C[i] < d[1][V[i]]) {
                d[1][V[i]] = d[1][U[i]] + C[i];
                changed = true;
            }
        }
    }

    long long best = min(d[0][n], d[1][n]);
    printf("%lld\n", best >= INF ? -1LL : best);
    return 0;
}
