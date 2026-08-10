// Reference - m70 / Q165 Layer Composite
// Clip every lower layer to the top one, take the union area of what remains
// with a sweep line plus a segment tree over compressed y, and subtract.
#include <bits/stdc++.h>
using namespace std;

int K;                                   // number of y intervals
vector<long long> ys;
vector<int> cnt;
vector<long long> cov;

void update(int node, int l, int r, int ql, int qr, int delta) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) cnt[node] += delta;
    else {
        int m = (l + r) >> 1;
        update(node << 1, l, m, ql, qr, delta);
        update(node << 1 | 1, m + 1, r, ql, qr, delta);
    }
    if (cnt[node] > 0) cov[node] = ys[r + 1] - ys[l];
    else if (l == r) cov[node] = 0;
    else cov[node] = cov[node << 1] + cov[node << 1 | 1];
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 4>> rect(n);
    for (int i = 0; i < n; i++)
        scanf("%lld %lld %lld %lld", &rect[i][0], &rect[i][1], &rect[i][2], &rect[i][3]);

    long long X1 = rect[n - 1][0], Y1 = rect[n - 1][1];
    long long X2 = rect[n - 1][2], Y2 = rect[n - 1][3];
    long long topArea = (X2 - X1) * (Y2 - Y1);

    // clip the lower layers to the top rectangle
    vector<array<long long, 4>> clipped;
    clipped.reserve(n);
    for (int i = 0; i < n - 1; i++) {
        long long a = max(rect[i][0], X1), b = max(rect[i][1], Y1);
        long long c = min(rect[i][2], X2), d = min(rect[i][3], Y2);
        if (a < c && b < d) clipped.push_back({a, b, c, d});
    }
    if (clipped.empty()) { printf("%lld\n", topArea); return 0; }

    for (const auto &r : clipped) { ys.push_back(r[1]); ys.push_back(r[3]); }
    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    K = (int)ys.size() - 1;                      // intervals [ys[i], ys[i+1])

    cnt.assign(4 * max(K, 1), 0);
    cov.assign(4 * max(K, 1), 0);

    // (x, delta, y-interval range)
    vector<array<long long, 4>> ev;
    ev.reserve(clipped.size() * 2);
    for (const auto &r : clipped) {
        int lo = (int)(lower_bound(ys.begin(), ys.end(), r[1]) - ys.begin());
        int hi = (int)(lower_bound(ys.begin(), ys.end(), r[3]) - ys.begin()) - 1;
        ev.push_back({r[0], +1, (long long)lo, (long long)hi});
        ev.push_back({r[2], -1, (long long)lo, (long long)hi});
    }
    sort(ev.begin(), ev.end());

    long long unionArea = 0, prevX = ev[0][0];
    for (size_t i = 0; i < ev.size();) {
        long long x = ev[i][0];
        unionArea += cov[1] * (x - prevX);
        prevX = x;
        while (i < ev.size() && ev[i][0] == x) {
            update(1, 0, K - 1, (int)ev[i][2], (int)ev[i][3], (int)ev[i][1]);
            i++;
        }
    }

    printf("%lld\n", topArea - unionArea);
    return 0;
}
