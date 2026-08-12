#include <bits/stdc++.h>
using namespace std;

vector<int> findNegativeCycle(int n, const vector<array<long long, 3>>& edges) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long, 3>> edges(m);
    for (auto &e : edges) scanf("%lld %lld %lld", &e[0], &e[1], &e[2]);

    vector<int> cycle = findNegativeCycle(n, edges);
    if (cycle.empty()) { printf("NO\n"); return 0; }

    string out = "YES\n";
    for (size_t i = 0; i < cycle.size(); i++) {
        out += to_string(cycle[i]);
        out += (i + 1 == cycle.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
