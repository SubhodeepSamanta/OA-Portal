#include <bits/stdc++.h>
using namespace std;

pair<int, long long> busiestGate(int m, const vector<array<long long, 3>>& grants) {
    // write your code here

    return {1, 0};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int m, q;
    if (!(cin >> m >> q)) return 0;
    vector<array<long long, 3>> grants(q);
    for (auto &g : grants) cin >> g[0] >> g[1] >> g[2];

    auto res = busiestGate(m, grants);
    cout << res.first << ' ' << res.second << '\n';
    return 0;
}
