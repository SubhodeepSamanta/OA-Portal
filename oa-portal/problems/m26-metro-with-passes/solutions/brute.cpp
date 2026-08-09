// Brute force - m26 / Q69
// Bellman-Ford style: relax every state transition repeatedly until nothing
// improves. No priority queue, no visited set - just the fixpoint.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return 0;
    vector<int> U(m), V(m);
    vector<long long> C(m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &U[i], &V[i], &C[i]);

    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> d(k + 1, vector<long long>(n + 1, INF));
    d[0][1] = 0;

    bool changed = true;
    int guard = 0;
    while (changed && guard <= (k + 1) * (n + 1) + 2) {
        changed = false;
        guard++;
        for (int used = 0; used <= k; used++) {
            for (int i = 0; i < m; i++) {
                for (int dir = 0; dir < 2; dir++) {
                    int a = dir ? V[i] : U[i], b = dir ? U[i] : V[i];
                    if (d[used][a] >= INF) continue;
                    if (d[used][a] + C[i] < d[used][b]) { d[used][b] = d[used][a] + C[i]; changed = true; }
                    if (used < k && d[used][a] < d[used + 1][b]) { d[used + 1][b] = d[used][a]; changed = true; }
                }
            }
        }
    }

    long long best = INF;
    for (int used = 0; used <= k; used++) best = min(best, d[used][n]);
    printf("%lld\n", best >= INF ? -1LL : best);
    return 0;
}
