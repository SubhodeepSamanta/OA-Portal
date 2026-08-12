// Brute force - c22 / Q116
// Applies each range add directly to every cell it covers, and reads the
// value straight out. No difference array, no tree. O(n) per update.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> a(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);

    string out;
    for (int i = 0; i < q; i++) {
        int type; scanf("%d", &type);
        if (type == 1) {
            int l, r; long long u;
            scanf("%d %d %lld", &l, &r, &u);
            for (int j = l; j <= r; j++) a[j] += u;
        } else {
            int k; scanf("%d", &k);
            out += to_string(a[k]);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
