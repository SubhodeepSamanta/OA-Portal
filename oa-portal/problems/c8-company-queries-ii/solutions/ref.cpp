// Reference - c8 / Q61 Company Queries II (CSES 1688)
// Binary lifting. e[i] <= i-1 means depths come from one forward loop.
#include <bits/stdc++.h>
using namespace std;

static const int LOG = 18;   // 2^18 > 2e5

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    vector<array<int, LOG>> up(n + 1);
    vector<int> depth(n + 1, 0);

    for (int k = 0; k < LOG; k++) up[1][k] = 1;   // the root is its own ancestor
    for (int i = 2; i <= n; i++) {
        int p; scanf("%d", &p);
        up[i][0] = p;
        depth[i] = depth[p] + 1;
        for (int k = 1; k < LOG; k++) up[i][k] = up[up[i][k - 1]][k - 1];
    }

    string out;
    out.reserve(q * 7);
    for (int i = 0; i < q; i++) {
        int a, b; scanf("%d %d", &a, &b);
        if (depth[a] < depth[b]) swap(a, b);

        int diff = depth[a] - depth[b];
        for (int k = 0; k < LOG; k++) if (diff >> k & 1) a = up[a][k];

        if (a != b) {
            for (int k = LOG - 1; k >= 0; k--) {
                if (up[a][k] != up[b][k]) { a = up[a][k]; b = up[b][k]; }
            }
            a = up[a][0];
        }
        out += to_string(a);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
