// Brute force - c21 / Q115
// Plain array, scanned for the minimum on every query. No tree at all.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> a(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);

    string out;
    for (int i = 0; i < q; i++) {
        int type; scanf("%d", &type);
        if (type == 1) {
            int k, u; scanf("%d %d", &k, &u);
            a[k] = u;
        } else {
            int l, r; scanf("%d %d", &l, &r);
            int best = INT_MAX;
            for (int j = l; j <= r; j++) best = min(best, a[j]);
            out += to_string(best);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
