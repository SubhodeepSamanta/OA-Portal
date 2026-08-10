// Brute force - m31 / Q74
// Literal simulation: sweep the whole grid once per minute, marking anyone
// adjacent to a knower, until a minute passes with nobody new. No queue.
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

    vector<vector<char>> knows(r, vector<char>(c, 0));
    long long people = 0, informed = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            if (g[i][j] == '#') continue;
            people++;
            if (g[i][j] == 'R') { knows[i][j] = 1; informed++; }
        }

    const int DR[4] = {-1, 1, 0, 0};
    const int DC[4] = {0, 0, -1, 1};
    int minutes = 0;
    while (true) {
        vector<pair<int,int>> fresh;
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++) {
                if (g[i][j] == '#' || knows[i][j]) continue;
                for (int k = 0; k < 4; k++) {
                    int ni = i + DR[k], nj = j + DC[k];
                    if (ni < 0 || nj < 0 || ni >= r || nj >= c) continue;
                    if (g[ni][nj] != '#' && knows[ni][nj]) { fresh.push_back(make_pair(i, j)); break; }
                }
            }
        if (fresh.empty()) break;
        for (size_t t = 0; t < fresh.size(); t++) knows[fresh[t].first][fresh[t].second] = 1;
        informed += (long long)fresh.size();
        minutes++;
    }

    printf("%d\n", informed == people ? minutes : -1);
    return 0;
}
