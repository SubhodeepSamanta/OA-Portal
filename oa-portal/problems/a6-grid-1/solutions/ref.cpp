// Reference - a6 / Q95 Grid 1 (AtCoder EDPC H)
// ways[r][c] = ways[r-1][c] + ways[r][c-1], zero on walls, reduced each step.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int H, W;
    if (scanf("%d %d", &H, &W) != 2) return 0;
    vector<string> g(H);
    for (int r = 0; r < H; r++) {
        static char buf[1005];
        scanf("%s", buf);
        g[r] = buf;
    }

    const long long MOD = 1000000007LL;
    vector<long long> prev(W, 0), cur(W, 0);

    for (int r = 0; r < H; r++) {
        for (int c = 0; c < W; c++) {
            if (g[r][c] == '#') { cur[c] = 0; continue; }
            if (r == 0 && c == 0) { cur[c] = 1; continue; }
            long long total = 0;
            if (r > 0) total += prev[c];
            if (c > 0) total += cur[c - 1];
            cur[c] = total % MOD;              // reduce inside the loop
        }
        prev.swap(cur);
    }
    printf("%lld\n", prev[W - 1]);
    return 0;
}
