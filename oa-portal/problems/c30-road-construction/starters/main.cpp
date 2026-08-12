#include <bits/stdc++.h>
using namespace std;

vector<pair<int, int>> afterEachRoad(int n, const vector<pair<int, int>>& roads) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> roads(m);
    for (auto &r : roads) scanf("%d %d", &r.first, &r.second);

    string out;
    for (auto &pr : afterEachRoad(n, roads)) {
        out += to_string(pr.first);
        out += ' ';
        out += to_string(pr.second);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
