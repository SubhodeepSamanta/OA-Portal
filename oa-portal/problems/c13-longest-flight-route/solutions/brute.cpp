// Brute force - c13 / Q83
// Works BACKWARDS: reverse the graph, take a topological order of the reverse,
// and compute how many cities lie on the longest route from each city TO n.
// Then greedily walk forward from 1, each step taking any neighbour whose
// value is one less. Different direction, different reconstruction - and it
// usually picks a different route among ties, which the checker must accept.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<vector<int>> adj(n + 1), radj(n + 1);
    vector<int> outdeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b; scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        radj[b].push_back(a);
        outdeg[a]++;
    }

    // topological order of the reversed graph = reverse topological order
    vector<int> order;
    order.reserve(n);
    for (int v = 1; v <= n; v++) if (outdeg[v] == 0) order.push_back(v);
    for (size_t i = 0; i < order.size(); i++)
        for (int u : radj[order[i]])
            if (--outdeg[u] == 0) order.push_back(u);

    vector<int> toN(n + 1, 0);          // cities on the longest route v..n
    toN[n] = 1;
    for (int v : order) {
        if (v == n) continue;
        for (int w : adj[v]) if (toN[w] && toN[w] + 1 > toN[v]) toN[v] = toN[w] + 1;
    }

    if (!toN[1]) { printf("IMPOSSIBLE\n"); return 0; }

    vector<int> route;
    int cur = 1;
    route.push_back(1);
    while (cur != n) {
        for (int w : adj[cur]) {
            if (toN[w] == toN[cur] - 1) { cur = w; route.push_back(w); break; }
        }
    }

    printf("%d\n", (int)route.size());
    string out;
    for (size_t i = 0; i < route.size(); i++) {
        out += to_string(route[i]);
        out += (i + 1 == route.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
