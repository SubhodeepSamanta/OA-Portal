// Reference - m14 / Q63 Nearest Common Manager
// Binary lifting: up[k][v] = the 2^k-th manager above v. O((n + q) log n).
// parent[i] < i lets us fill depths in one forward pass - no recursion.
#include <bits/stdc++.h>
using namespace std;

static char ibuf[1 << 26];

int main() {
    size_t len = fread(ibuf, 1, sizeof(ibuf) - 1, stdin);
    ibuf[len] = 0;
    char *p = ibuf;
    auto readInt = [&]() -> int {
        while (*p && (*p < '0' || *p > '9')) p++;
        int v = 0;
        while (*p >= '0' && *p <= '9') { v = v * 10 + (*p - '0'); p++; }
        return v;
    };

    int n = readInt();
    int q = readInt();

    int LOG = 1;
    while ((1 << LOG) < n) LOG++;
    LOG++;

    vector<int> depth(n + 1, 0);
    vector<vector<int>> up(LOG, vector<int>(n + 1, 1));

    up[0][1] = 1;
    for (int i = 2; i <= n; i++) {
        int par = readInt();
        up[0][i] = par;
        depth[i] = depth[par] + 1;     // par < i, so depth[par] is already final
    }
    for (int k = 1; k < LOG; k++)
        for (int v = 1; v <= n; v++)
            up[k][v] = up[k - 1][up[k - 1][v]];

    string out;
    out.reserve((size_t)q * 7);

    for (int i = 0; i < q; i++) {
        int u = readInt(), v = readInt();
        if (depth[u] < depth[v]) swap(u, v);
        int diff = depth[u] - depth[v];
        for (int k = 0; k < LOG; k++) if (diff & (1 << k)) u = up[k][u];
        if (u != v) {
            for (int k = LOG - 1; k >= 0; k--)
                if (up[k][u] != up[k][v]) { u = up[k][u]; v = up[k][v]; }
            u = up[0][u];
        }
        out += to_string(u);
        out += '\n';
    }

    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
