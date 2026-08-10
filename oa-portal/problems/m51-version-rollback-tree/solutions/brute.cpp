// Brute force - m51 / Q138
// Walk up one parent at a time. No jump table, no cleverness - correct by
// construction and hopeless on a long chain.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;

    vector<int> par(q + 1, 0), depth(q + 1, 0);
    vector<char> ch(q + 1, 0);
    int versions = 0;

    string out;
    char op[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'E') {
            int v;
            char c[8];
            scanf("%d %s", &v, c);
            int cur = ++versions;
            par[cur] = v;
            depth[cur] = depth[v] + 1;
            ch[cur] = c[0];
        } else {
            int v, k;
            scanf("%d %d", &v, &k);
            int node = v;
            while (depth[node] > k) node = par[node];
            out += ch[node];
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
