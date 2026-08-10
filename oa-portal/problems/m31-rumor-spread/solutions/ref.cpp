// Reference - m31 / Q74 Rumor Spread
// Multi-source BFS: every R starts in the queue at minute 0.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> g(r);
    {
        vector<char> buf(c + 8);
        for (int i = 0; i < r; i++) { scanf("%s", buf.data()); g[i] = buf.data(); }
    }

    vector<int> dist((size_t)r * c, -1);
    vector<int> q;
    q.reserve((size_t)r * c);
    long long people = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            if (g[i][j] == '#') continue;
            people++;
            if (g[i][j] == 'R') { dist[(size_t)i * c + j] = 0; q.push_back(i * c + j); }
        }

    const int DR[4] = {-1, 1, 0, 0};
    const int DC[4] = {0, 0, -1, 1};
    long long informed = q.size();
    int best = 0;
    for (size_t h = 0; h < q.size(); h++) {
        int cell = q[h];
        int i = cell / c, j = cell % c, d = dist[cell];
        best = max(best, d);
        for (int k = 0; k < 4; k++) {
            int ni = i + DR[k], nj = j + DC[k];
            if (ni < 0 || nj < 0 || ni >= r || nj >= c) continue;
            if (g[ni][nj] == '#') continue;
            size_t ns = (size_t)ni * c + nj;
            if (dist[ns] != -1) continue;
            dist[ns] = d + 1;
            informed++;
            q.push_back((int)ns);
        }
    }

    printf("%d\n", informed == people ? best : -1);
    return 0;
}
