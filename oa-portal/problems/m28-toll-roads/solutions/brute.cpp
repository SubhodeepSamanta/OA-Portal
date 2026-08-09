// Brute force - m28 / Q71
// Bellman-Ford: sweep every edge until no distance improves. No deque, no
// heap, no assumption at all about the weights being 0 and 1.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> U(m), V(m), W(m);
    for (int i = 0; i < m; i++) scanf("%d %d %d", &U[i], &V[i], &W[i]);

    const int INF = INT_MAX / 4;
    vector<int> d(n + 1, INF);
    d[1] = 0;

    bool changed = true;
    int guard = 0;
    while (changed && guard <= n + 2) {
        changed = false;
        guard++;
        for (int i = 0; i < m; i++) {
            if (d[U[i]] < INF && d[U[i]] + W[i] < d[V[i]]) { d[V[i]] = d[U[i]] + W[i]; changed = true; }
            if (d[V[i]] < INF && d[V[i]] + W[i] < d[U[i]]) { d[U[i]] = d[V[i]] + W[i]; changed = true; }
        }
    }
    printf("%d\n", d[n] >= INF ? -1 : d[n]);
    return 0;
}
