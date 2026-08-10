// Brute force - m70 / Q165
//
// Compress the coordinates and mark the resulting cells one rectangle at a
// time, then add up the marked cells' real areas. Exact, and completely free
// of sweep-line or segment-tree reasoning.
//
// It compresses rather than marking literal pixels because these inputs are
// tiny in BYTES while their coordinates are not: two rectangles spanning the
// whole plane is a 60-character input that would ask for a 2e9 x 2e9 grid.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 4>> rect(n);
    for (int i = 0; i < n; i++)
        scanf("%lld %lld %lld %lld", &rect[i][0], &rect[i][1], &rect[i][2], &rect[i][3]);

    long long X1 = rect[n - 1][0], Y1 = rect[n - 1][1];
    long long X2 = rect[n - 1][2], Y2 = rect[n - 1][3];
    long long topArea = (X2 - X1) * (Y2 - Y1);

    vector<array<long long, 4>> clipped;
    for (int i = 0; i < n - 1; i++) {
        long long a = max(rect[i][0], X1), b = max(rect[i][1], Y1);
        long long c = min(rect[i][2], X2), d = min(rect[i][3], Y2);
        if (a < c && b < d) clipped.push_back({a, b, c, d});
    }
    if (clipped.empty()) { printf("%lld\n", topArea); return 0; }

    vector<long long> xs, ys;
    for (const auto &r : clipped) { xs.push_back(r[0]); xs.push_back(r[2]); ys.push_back(r[1]); ys.push_back(r[3]); }
    sort(xs.begin(), xs.end()); xs.erase(unique(xs.begin(), xs.end()), xs.end());
    sort(ys.begin(), ys.end()); ys.erase(unique(ys.begin(), ys.end()), ys.end());

    int W = (int)xs.size() - 1, H = (int)ys.size() - 1;
    vector<vector<char>> mark((size_t)W, vector<char>((size_t)H, 0));

    for (const auto &r : clipped) {
        int x0 = (int)(lower_bound(xs.begin(), xs.end(), r[0]) - xs.begin());
        int x1 = (int)(lower_bound(xs.begin(), xs.end(), r[2]) - xs.begin());
        int y0 = (int)(lower_bound(ys.begin(), ys.end(), r[1]) - ys.begin());
        int y1 = (int)(lower_bound(ys.begin(), ys.end(), r[3]) - ys.begin());
        for (int i = x0; i < x1; i++)
            for (int j = y0; j < y1; j++) mark[i][j] = 1;
    }

    long long unionArea = 0;
    for (int i = 0; i < W; i++)
        for (int j = 0; j < H; j++)
            if (mark[i][j]) unionArea += (xs[i + 1] - xs[i]) * (ys[j + 1] - ys[j]);

    printf("%lld\n", topArea - unionArea);
    return 0;
}
