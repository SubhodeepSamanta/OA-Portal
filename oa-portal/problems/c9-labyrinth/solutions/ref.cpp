// Reference - c9 / Q79 Labyrinth (CSES 1193)
// BFS from A, storing for each square the single move character that reached
// it, then walk back from B and reverse. Flat arrays, explicit queue - the
// grid is up to 1e6 squares.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    vector<string> g(n);
    for (int i = 0; i < n; i++) {
        char buf[1024];
        scanf("%s", buf);
        g[i] = buf;
    }

    int start = -1, goal = -1;
    for (int r = 0; r < n; r++)
        for (int c = 0; c < m; c++) {
            if (g[r][c] == 'A') start = r * m + c;
            else if (g[r][c] == 'B') goal = r * m + c;
        }

    const int dr[4] = { 1, -1, 0, 0 };
    const int dc[4] = { 0, 0, 1, -1 };
    const char mv[4] = { 'D', 'U', 'R', 'L' };

    vector<char> from(n * m, 0);          // move that entered this square
    vector<char> seen(n * m, 0);
    vector<int> q;
    q.reserve(n * m);
    q.push_back(start);
    seen[start] = 1;

    for (size_t i = 0; i < q.size() && !seen[goal]; i++) {
        int cur = q[i], r = cur / m, c = cur % m;
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
            int nxt = nr * m + nc;
            if (seen[nxt] || g[nr][nc] == '#') continue;
            seen[nxt] = 1;
            from[nxt] = mv[d];
            q.push_back(nxt);
        }
    }

    if (!seen[goal]) { printf("NO\n"); return 0; }

    string path;
    for (int cur = goal; cur != start; ) {
        char c = from[cur];
        path += c;
        int r = cur / m, cc = cur % m;
        if (c == 'D') r--;
        else if (c == 'U') r++;
        else if (c == 'R') cc--;
        else cc++;
        cur = r * m + cc;
    }
    reverse(path.begin(), path.end());

    printf("YES\n%d\n", (int)path.size());
    path += '\n';
    fwrite(path.data(), 1, path.size(), stdout);
    return 0;
}
