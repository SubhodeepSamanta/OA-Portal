// Reference - c13 / Q83 Longest Flight Route (CSES 1680)
// Kahn's topological order, then a forward DP counting cities, with parent
// pointers for reconstruction.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    vector<int> head(n + 1, -1), nxt(m), to(m), indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b; scanf("%d %d", &a, &b);
        to[i] = b; nxt[i] = head[a]; head[a] = i;
        indeg[b]++;
    }

    vector<int> order;
    order.reserve(n);
    for (int v = 1; v <= n; v++) if (indeg[v] == 0) order.push_back(v);
    for (size_t i = 0; i < order.size(); i++)
        for (int e = head[order[i]]; e != -1; e = nxt[e])
            if (--indeg[to[e]] == 0) order.push_back(to[e]);

    vector<int> best(n + 1, 0), from(n + 1, 0);
    best[1] = 1;
    for (int v : order) {
        if (!best[v]) continue;                 // not reachable from city 1
        for (int e = head[v]; e != -1; e = nxt[e]) {
            int w = to[e];
            if (best[v] + 1 > best[w]) { best[w] = best[v] + 1; from[w] = v; }
        }
    }

    if (!best[n]) { printf("IMPOSSIBLE\n"); return 0; }

    vector<int> route;
    for (int v = n; v; v = from[v]) route.push_back(v);
    reverse(route.begin(), route.end());

    string out = to_string((int)route.size());
    out += '\n';
    for (size_t i = 0; i < route.size(); i++) {
        out += to_string(route[i]);
        out += (i + 1 == route.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
