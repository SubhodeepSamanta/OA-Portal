// Brute force - a11 / Q99
// Enumerates all 2^N colourings and counts the ones where no edge has both
// ends black. No tree structure is used at all - the edges are just a list of
// forbidden pairs - so it cannot share the reference's rooting or its
// per-subtree reasoning.
//
// Exponential, so above the bound it falls back to the same recurrence driven
// by a BREADTH-first layering: vertices are folded into their parents in order
// of decreasing depth, rather than by reversing a depth-first order.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    const int m = n - 1;
    vector<int> xs(max(m, 0)), ys(max(m, 0));
    for (int i = 0; i < m; i++) scanf("%d %d", &xs[i], &ys[i]);

    if (n <= 20) {
        long long count = 0;
        for (int mask = 0; mask < (1 << n); mask++) {      // bit set = black
            bool ok = true;
            for (int i = 0; i < m && ok; i++) {
                if ((mask >> (xs[i] - 1) & 1) && (mask >> (ys[i] - 1) & 1)) ok = false;
            }
            if (ok) count++;
        }
        printf("%lld\n", count % MOD);
        return 0;
    }

    vector<vector<int>> g(n + 1);
    for (int i = 0; i < m; i++) { g[xs[i]].push_back(ys[i]); g[ys[i]].push_back(xs[i]); }

    // breadth-first layering from vertex 1
    vector<int> par(n + 1, 0), depth(n + 1, 0), bfs;
    vector<char> seen(n + 1, 0);
    bfs.reserve(n);
    bfs.push_back(1); seen[1] = 1;
    for (size_t h = 0; h < bfs.size(); h++) {
        int v = bfs[h];
        for (int u : g[v]) {
            if (seen[u]) continue;
            seen[u] = 1; par[u] = v; depth[u] = depth[v] + 1;
            bfs.push_back(u);
        }
    }

    // deepest first, so a vertex is finished before its parent consumes it
    vector<int> byDepth = bfs;
    stable_sort(byDepth.begin(), byDepth.end(),
                [&](int p, int q) { return depth[p] > depth[q]; });

    vector<long long> white(n + 1, 1), black(n + 1, 1);
    for (int v : byDepth) {
        if (v == 1) continue;
        int p = par[v];
        white[p] = white[p] * ((white[v] + black[v]) % MOD) % MOD;
        black[p] = black[p] * white[v] % MOD;
    }

    printf("%lld\n", (white[1] + black[1]) % MOD);
    return 0;
}
