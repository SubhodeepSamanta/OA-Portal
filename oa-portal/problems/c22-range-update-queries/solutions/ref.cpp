// Reference - c22 / Q116 Range Update Queries (CSES 1651)
// Fenwick tree over a DIFFERENCE array: a range add is two point updates,
// and a point read is a prefix sum.
#include <bits/stdc++.h>
using namespace std;

int m;                                   // tree size, n + 1
vector<long long> tree_;

void add(int i, long long v) { for (; i <= m; i += i & -i) tree_[i] += v; }
long long pref(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += tree_[i]; return s; }

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> x(n + 2, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &x[i]);

    m = n + 1;                           // room to write d[b+1] when b == n
    tree_.assign(m + 1, 0);

    string out;
    out.reserve(q * 8);
    for (int i = 0; i < q; i++) {
        int type; scanf("%d", &type);
        if (type == 1) {
            int a, b; long long u;
            scanf("%d %d %lld", &a, &b, &u);
            add(a, u);
            add(b + 1, -u);
        } else {
            int k; scanf("%d", &k);
            out += to_string(x[k] + pref(k));
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
