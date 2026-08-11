#include <bits/stdc++.h>
using namespace std;

vector<int> lowestCommonBosses(const vector<int>& boss,
                               const vector<pair<int, int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 1);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> boss(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &boss[i]);
    vector<pair<int, int>> queries(q);
    for (auto &pr : queries) scanf("%d %d", &pr.first, &pr.second);

    string out;
    for (int v : lowestCommonBosses(boss, queries)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
