// Brute force - m27 / Q70
// Same state space, but relaxed to a fixpoint instead of searched with a
// queue: sweep every state repeatedly until no distance improves.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> g(r);
    for (int i = 0; i < r; i++) { char buf[128]; scanf("%s", buf); g[i] = buf; }

    int sr = 0, sc = 0, er = 0, ec = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            if (g[i][j] == 'S') { sr = i; sc = j; }
            if (g[i][j] == 'X') { er = i; ec = j; }
        }

    const int FULL = 64, INF = 1 << 29;
    vector<vector<vector<int>>> d(r, vector<vector<int>>(c, vector<int>(FULL, INF)));
    d[sr][sc][0] = 0;

    const int DR[4] = {-1, 1, 0, 0};
    const int DC[4] = {0, 0, -1, 1};

    bool changed = true;
    while (changed) {
        changed = false;
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++)
                for (int mask = 0; mask < FULL; mask++) {
                    if (d[i][j][mask] >= INF) continue;
                    for (int k = 0; k < 4; k++) {
                        int ni = i + DR[k], nj = j + DC[k];
                        if (ni < 0 || nj < 0 || ni >= r || nj >= c) continue;
                        char ch = g[ni][nj];
                        if (ch == '#') continue;
                        int nm = mask;
                        if (ch >= 'a' && ch <= 'f') nm |= 1 << (ch - 'a');
                        else if (ch >= 'A' && ch <= 'F') {
                            if (!(mask & (1 << (ch - 'A')))) continue;
                        }
                        if (d[i][j][mask] + 1 < d[ni][nj][nm]) {
                            d[ni][nj][nm] = d[i][j][mask] + 1;
                            changed = true;
                        }
                    }
                }
    }

    int best = INF;
    for (int mask = 0; mask < FULL; mask++) best = min(best, d[er][ec][mask]);
    printf("%d\n", best >= INF ? -1 : best);
    return 0;
}
