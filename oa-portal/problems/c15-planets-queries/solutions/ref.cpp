// Reference - c15 / Q85 Planets Queries I (CSES 1750)
// Binary lifting on a functional graph. LOG follows k (<= 1e9), not n.
#include <bits/stdc++.h>
using namespace std;

static const int LOG = 30;   // 2^30 > 1e9

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    vector<vector<int>> up(LOG, vector<int>(n + 1));
    for (int v = 1; v <= n; v++) scanf("%d", &up[0][v]);
    for (int j = 1; j < LOG; j++)
        for (int v = 1; v <= n; v++) up[j][v] = up[j - 1][up[j - 1][v]];

    string out;
    out.reserve(q * 7);
    for (int i = 0; i < q; i++) {
        int x; long long k;
        scanf("%d %lld", &x, &k);
        for (int j = 0; j < LOG; j++) if (k >> j & 1) x = up[j][x];
        out += to_string(x);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
