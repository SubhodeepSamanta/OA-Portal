// Brute force - c20 / Q114
// Keeps the plain array and adds the range up on every query. No tree, no
// prefix sums, no low-bit arithmetic. O(n) per query.
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
            int k; long long u;
            scanf("%d %lld", &k, &u);
            a[k] = u;
        } else {
            int l, r; scanf("%d %d", &l, &r);
            long long s = 0;
            for (int j = l; j <= r; j++) s += a[j];
            out += to_string(s);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
