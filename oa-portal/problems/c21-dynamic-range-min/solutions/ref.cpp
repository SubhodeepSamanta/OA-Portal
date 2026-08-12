// Reference - c21 / Q115 Dynamic Range Minimum Queries (CSES 1649)
// Iterative bottom-up segment tree. Minimum has no inverse, so a Fenwick tree
// cannot answer this - the padding is set above every possible value.
#include <bits/stdc++.h>
using namespace std;

const int INF = INT_MAX;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    int sz = 1;
    while (sz < n) sz <<= 1;
    vector<int> t(2 * sz, INF);                 // padding must never win a min

    for (int i = 0; i < n; i++) scanf("%d", &t[sz + i]);
    for (int i = sz - 1; i >= 1; i--) t[i] = min(t[2 * i], t[2 * i + 1]);

    string out;
    out.reserve(q * 8);
    for (int i = 0; i < q; i++) {
        int type; scanf("%d", &type);
        if (type == 1) {
            int k, u; scanf("%d %d", &k, &u);
            int p = sz + k - 1;
            t[p] = u;
            for (p >>= 1; p >= 1; p >>= 1) t[p] = min(t[2 * p], t[2 * p + 1]);
        } else {
            int a, b; scanf("%d %d", &a, &b);
            int res = INF;
            int l = sz + a - 1, r = sz + b;      // [l, r)
            while (l < r) {
                if (l & 1) res = min(res, t[l++]);
                if (r & 1) res = min(res, t[--r]);
                l >>= 1; r >>= 1;
            }
            out += to_string(res);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
