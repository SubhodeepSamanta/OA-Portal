// Reference - m40 / Q119 Sensor Range Alerts
// Segment tree over maxima with a lazy "pending add" per node. Because the
// pending amounts are sums, a node's own maximum can be kept correct without
// ever descending - the note is only pushed down when someone must.
#include <bits/stdc++.h>
using namespace std;

const long long NEG = LLONG_MIN / 4;
int n, q;
vector<long long> mx, lz;

void build(int node, int l, int r, const vector<long long> &a) {
    lz[node] = 0;
    if (l == r) { mx[node] = a[l]; return; }
    int m = (l + r) >> 1;
    build(node << 1, l, m, a);
    build(node << 1 | 1, m + 1, r, a);
    mx[node] = max(mx[node << 1], mx[node << 1 | 1]);
}

inline void applyAdd(int node, long long v) { mx[node] += v; lz[node] += v; }

inline void push(int node) {
    if (lz[node]) {
        applyAdd(node << 1, lz[node]);
        applyAdd(node << 1 | 1, lz[node]);
        lz[node] = 0;
    }
}

void update(int node, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { applyAdd(node, v); return; }
    push(node);
    int m = (l + r) >> 1;
    update(node << 1, l, m, ql, qr, v);
    update(node << 1 | 1, m + 1, r, ql, qr, v);
    mx[node] = max(mx[node << 1], mx[node << 1 | 1]);
}

long long query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return NEG;
    if (ql <= l && r <= qr) return mx[node];
    push(node);
    int m = (l + r) >> 1;
    return max(query(node << 1, l, m, ql, qr), query(node << 1 | 1, m + 1, r, ql, qr));
}

int main() {
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);

    mx.assign(4 * n + 4, 0);
    lz.assign(4 * n + 4, 0);
    build(1, 1, n, a);

    char op[16];
    string out;
    out.reserve((size_t)q * 8);
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'A') {
            int l, r; long long x;
            scanf("%d %d %lld", &l, &r, &x);
            update(1, 1, n, l, r, x);
        } else {
            int l, r;
            scanf("%d %d", &l, &r);
            out += to_string(query(1, 1, n, l, r));
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
