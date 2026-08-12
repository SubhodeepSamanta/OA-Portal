// Reference - a11 / Q99 Independent Set (AtCoder EDPC P)
// white[v] / black[v] = colourings of v's subtree with v that colour.
//   white[v] = product over children of (white[c] + black[c])
//   black[v] = product over children of  white[c]
//
// N reaches 1e5 and the tree can be a single path, so the traversal is
// ITERATIVE. A recursive depth-first search overflows the stack on that case,
// which is the whole reason the path test exists.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    const int m = n - 1;
    vector<int> xs(max(m, 0)), ys(max(m, 0));
    vector<int> deg(n + 2, 0);
    for (int i = 0; i < m; i++) {
        scanf("%d %d", &xs[i], &ys[i]);
        deg[xs[i]]++; deg[ys[i]]++;
    }

    // CSR adjacency - one flat array, no per-vertex vector
    vector<int> start(n + 2, 0);
    for (int v = 1; v <= n; v++) start[v + 1] = start[v] + deg[v];
    vector<int> adj(max(2 * m, 0));
    vector<int> fill(start.begin(), start.end());
    for (int i = 0; i < m; i++) {
        adj[fill[xs[i]]++] = ys[i];
        adj[fill[ys[i]]++] = xs[i];
    }

    // iterative traversal: parents always come before their children
    vector<int> order; order.reserve(n);
    vector<int> par(n + 1, 0);
    vector<char> seen(n + 1, 0);
    vector<int> st; st.reserve(n);
    st.push_back(1); seen[1] = 1;
    while (!st.empty()) {
        int v = st.back(); st.pop_back();
        order.push_back(v);
        for (int e = start[v]; e < start[v + 1]; e++) {
            int u = adj[e];
            if (!seen[u]) { seen[u] = 1; par[u] = v; st.push_back(u); }
        }
    }

    // walk it backwards, so every vertex is complete before it folds into its
    // parent
    vector<long long> white(n + 1, 1), black(n + 1, 1);
    for (int idx = n - 1; idx >= 1; idx--) {
        int v = order[idx], p = par[v];
        white[p] = white[p] * ((white[v] + black[v]) % MOD) % MOD;
        black[p] = black[p] * white[v] % MOD;
    }

    printf("%lld\n", (white[1] + black[1]) % MOD);
    return 0;
}
