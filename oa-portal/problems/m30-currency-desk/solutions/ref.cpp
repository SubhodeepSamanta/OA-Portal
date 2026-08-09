// Reference - m30 / Q72 Currency Desk
//
// Products become sums under a logarithm, and "multiplier > 1" becomes
// "sum of log(q/p) < 0" - a negative cycle. It must be a cycle you can both
// get into from currency 1 and get back to currency 1 from, so restrict the
// graph to that intersection first, then Bellman-Ford over what is left.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> U(m), V(m);
    vector<long double> W(m);
    vector<vector<int>> fwd(n + 1), rev(n + 1);
    for (int i = 0; i < m; i++) {
        long long p, q;
        scanf("%d %d %lld %lld", &U[i], &V[i], &p, &q);
        W[i] = logl((long double)q) - logl((long double)p);
        fwd[U[i]].push_back(V[i]);
        rev[V[i]].push_back(U[i]);
    }

    auto bfs = [&](const vector<vector<int>> &g) {
        vector<char> seen(n + 1, 0);
        vector<int> st{1};
        seen[1] = 1;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int v : g[u]) if (!seen[v]) { seen[v] = 1; st.push_back(v); }
        }
        return seen;
    };
    vector<char> fromOne = bfs(fwd);       // reachable starting at currency 1
    vector<char> toOne = bfs(rev);         // can get back to currency 1

    vector<int> keep;
    for (int i = 0; i < m; i++)
        if (fromOne[U[i]] && toOne[U[i]] && fromOne[V[i]] && toOne[V[i]]) keep.push_back(i);

    // every surviving node starts at 0, so any negative cycle anywhere in the
    // surviving subgraph is found without needing a virtual source
    const long double EPS = 1e-9L;
    vector<long double> d(n + 1, 0.0L);
    bool relaxed = false;
    for (int it = 0; it <= n; it++) {
        relaxed = false;
        for (int e : keep)
            if (d[U[e]] + W[e] < d[V[e]] - EPS) { d[V[e]] = d[U[e]] + W[e]; relaxed = true; }
        if (!relaxed) break;
    }

    printf(relaxed ? "YES\n" : "NO\n");
    return 0;
}
