// Brute force - c29 / Q234
// Prim's algorithm from city 1 with a priority queue - grows one tree instead
// of merging components, and never sorts the edge list or uses a DSU.
// A genuinely different route to the same number.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<vector<pair<int, int>>> adj(n + 1);   // (neighbour, cost)
    for (int i = 0; i < m; i++) {
        int a, b, c; scanf("%d %d %d", &a, &b, &c);
        adj[a].push_back({ b, c });
        adj[b].push_back({ a, c });
    }

    vector<char> inTree(n + 1, 0);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({ 0, 1 });

    long long total = 0;
    int reached = 0;
    while (!pq.empty()) {
        auto [cost, v] = pq.top();
        pq.pop();
        if (inTree[v]) continue;
        inTree[v] = 1;
        total += cost;
        reached++;
        for (auto [w, c] : adj[v]) if (!inTree[w]) pq.push({ c, w });
    }

    if (reached != n) printf("IMPOSSIBLE\n");
    else printf("%lld\n", total);
    return 0;
}
