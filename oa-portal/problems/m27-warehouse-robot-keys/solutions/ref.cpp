// Reference - m27 / Q70 Warehouse Robot Keys
// BFS over (row, col, key bitmask). Every move costs 1, so a plain queue gives
// the optimum with no priority queue anywhere.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> g(r);
    for (int i = 0; i < r; i++) {
        char buf[128];
        scanf("%s", buf);
        g[i] = buf;
    }

    int sr = 0, sc = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if (g[i][j] == 'S') { sr = i; sc = j; }

    const int FULL = 64;
    vector<int> dist((size_t)r * c * FULL, -1);
    auto idx = [&](int i, int j, int mask) { return ((i * c) + j) * FULL + mask; };

    deque<int> q;
    dist[idx(sr, sc, 0)] = 0;
    q.push_back(idx(sr, sc, 0));

    const int DR[4] = {-1, 1, 0, 0};
    const int DC[4] = {0, 0, -1, 1};

    while (!q.empty()) {
        int st = q.front(); q.pop_front();
        int mask = st % FULL;
        int cell = st / FULL;
        int i = cell / c, j = cell % c;
        int d = dist[st];

        if (g[i][j] == 'X') { printf("%d\n", d); return 0; }

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
            int ns = idx(ni, nj, nm);
            if (dist[ns] == -1) { dist[ns] = d + 1; q.push_back(ns); }
        }
    }
    printf("-1\n");
    return 0;
}
