#include <bits/stdc++.h>
using namespace std;

vector<pair<int, int>> roadsToBuild(int n, const vector<pair<int, int>>& roads) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> roads(m);
    for (auto &r : roads) scanf("%d %d", &r.first, &r.second);

    vector<pair<int, int>> add = roadsToBuild(n, roads);
    string out = to_string((int)add.size());
    out += '\n';
    for (auto &r : add) {
        out += to_string(r.first);
        out += ' ';
        out += to_string(r.second);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
