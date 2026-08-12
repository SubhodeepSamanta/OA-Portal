// Reference - c20 / Q114 Dynamic Range Sum Queries (CSES 1648)
// Fenwick tree over 64-bit sums. The update SETS a value, so we add the
// difference against a kept copy of the current array.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> tree_;

void add(int i, long long v) { for (; i <= n; i += i & -i) tree_[i] += v; }
long long pref(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += tree_[i]; return s; }

int main() {
    int q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> cur(n + 1, 0);
    tree_.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) { scanf("%lld", &cur[i]); add(i, cur[i]); }

    string out;
    out.reserve(q * 8);
    for (int i = 0; i < q; i++) {
        int type; scanf("%d", &type);
        if (type == 1) {
            int k; long long u;
            scanf("%d %lld", &k, &u);
            add(k, u - cur[k]);            // set, not increment
            cur[k] = u;
        } else {
            int a, b; scanf("%d %d", &a, &b);
            out += to_string(pref(b) - pref(a - 1));
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
