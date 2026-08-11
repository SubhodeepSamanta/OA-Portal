// Reference - c12 / Q82 Course Schedule (CSES 1679)
// Kahn's algorithm. If the emitted order is shorter than n there is a cycle.
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

    for (size_t i = 0; i < order.size(); i++) {
        for (int e = head[order[i]]; e != -1; e = nxt[e]) {
            if (--indeg[to[e]] == 0) order.push_back(to[e]);
        }
    }

    if ((int)order.size() != n) { printf("IMPOSSIBLE\n"); return 0; }

    string out;
    out.reserve(n * 7);
    for (int i = 0; i < n; i++) { out += to_string(order[i]); out += (i + 1 == n ? '\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
