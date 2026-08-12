// Brute force - a6 / Q95
// Walks every path explicitly by recursion, counting them one at a time.
// No table, no recurrence. Exponential in H+W, so tiny grids only; larger
// ones fall back to a full two-dimensional table filled COLUMN by column,
// which visits the squares in a different order from the reference's rows.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;
int H, W;
vector<string> g;

long long walk(int r, int c) {
    if (r >= H || c >= W || g[r][c] == '#') return 0;
    if (r == H - 1 && c == W - 1) return 1;
    return (walk(r + 1, c) + walk(r, c + 1)) % MOD;
}

int main() {
    if (scanf("%d %d", &H, &W) != 2) return 0;
    g.assign(H, "");
    for (int r = 0; r < H; r++) { static char buf[1005]; scanf("%s", buf); g[r] = buf; }

    if (H + W <= 22) { printf("%lld\n", walk(0, 0)); return 0; }

    vector<vector<long long>> ways(H, vector<long long>(W, 0));
    for (int c = 0; c < W; c++) {                 // columns outermost
        for (int r = 0; r < H; r++) {
            if (g[r][c] == '#') { ways[r][c] = 0; continue; }
            if (r == 0 && c == 0) { ways[r][c] = 1; continue; }
            long long t = 0;
            if (r > 0) t += ways[r - 1][c];
            if (c > 0) t += ways[r][c - 1];
            ways[r][c] = t % MOD;
        }
    }
    printf("%lld\n", ways[H - 1][W - 1]);
    return 0;
}
