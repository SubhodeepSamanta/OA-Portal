#include <bits/stdc++.h>
using namespace std;

vector<int> longestRoute(int n, const vector<pair<int, int>>& flights) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> flights(m);
    for (auto &f : flights) scanf("%d %d", &f.first, &f.second);

    vector<int> route = longestRoute(n, flights);
    if (route.empty()) { printf("IMPOSSIBLE\n"); return 0; }

    string out = to_string((int)route.size());
    out += '\n';
    for (size_t i = 0; i < route.size(); i++) {
        out += to_string(route[i]);
        out += (i + 1 == route.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
