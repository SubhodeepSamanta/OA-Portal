// Reference - c29 / Q234 Road Reparation (CSES 1675)
// Kruskal with union by size and path compression. The total reaches ~1e14,
// so the accumulator is 64-bit even though each cost fits in an int.
#include <bits/stdc++.h>
using namespace std;

vector<int> parent_, size_;

int find(int x) {
    while (parent_[x] != x) { parent_[x] = parent_[parent_[x]]; x = parent_[x]; }
    return x;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    vector<array<int, 3>> edges(m);          // {cost, a, b}
    for (int i = 0; i < m; i++) {
        int a, b, c; scanf("%d %d %d", &a, &b, &c);
        edges[i] = { c, a, b };
    }
    sort(edges.begin(), edges.end());

    parent_.resize(n + 1);
    size_.assign(n + 1, 1);
    for (int i = 1; i <= n; i++) parent_[i] = i;

    long long total = 0;
    int taken = 0;
    for (auto& e : edges) {
        int ra = find(e[1]), rb = find(e[2]);
        if (ra == rb) continue;
        if (size_[ra] < size_[rb]) swap(ra, rb);
        parent_[rb] = ra;
        size_[ra] += size_[rb];
        total += e[0];
        if (++taken == n - 1) break;
    }

    if (taken != n - 1) printf("IMPOSSIBLE\n");
    else printf("%lld\n", total);        // n == 1 needs 0 roads and prints 0
    return 0;
}
