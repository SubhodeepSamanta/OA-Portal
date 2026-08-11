// Brute force - c9 / Q79
// BFS the other way round: distances measured from B, then walk forward from A
// always stepping to a neighbour one closer to B. No parent pointers and no
// reversing, and it usually picks a DIFFERENT shortest route from the
// reference - which is exactly what the checker has to tolerate.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<string> g(n);
    for (int i = 0; i < n; i++) { char buf[1024]; scanf("%s", buf); g[i] = buf; }

    int start = -1, goal = -1;
    for (int r = 0; r < n; r++)
        for (int c = 0; c < m; c++) {
            if (g[r][c] == 'A') start = r * m + c;
            else if (g[r][c] == 'B') goal = r * m + c;
        }

    const int dr[4] = { 0, 0, -1, 1 };    // deliberately a different order
    const int dc[4] = { -1, 1, 0, 0 };
    const char mv[4] = { 'L', 'R', 'U', 'D' };

    vector<int> dist(n * m, -1), q;
    q.push_back(goal);
    dist[goal] = 0;
    for (size_t i = 0; i < q.size(); i++) {
        int cur = q[i], r = cur / m, c = cur % m;
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
            int nxt = nr * m + nc;
            if (dist[nxt] != -1 || g[nr][nc] == '#') continue;
            dist[nxt] = dist[cur] + 1;
            q.push_back(nxt);
        }
    }

    if (dist[start] == -1) { printf("NO\n"); return 0; }

    string path;
    int cur = start;
    while (cur != goal) {
        int r = cur / m, c = cur % m;
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
            int nxt = nr * m + nc;
            if (dist[nxt] == dist[cur] - 1) { path += mv[d]; cur = nxt; break; }
        }
    }

    printf("YES\n%d\n%s\n", (int)path.size(), path.c_str());
    return 0;
}
