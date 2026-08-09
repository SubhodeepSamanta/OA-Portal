#include <bits/stdc++.h>
using namespace std;

/* parent[v] holds the manager of employee v; parent[1] is 1 (the CEO).
   Return one answer per query, in order. */
vector<int> nearestCommonManagers(int n,
                                  const vector<int>& parent,
                                  const vector<pair<int,int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<int> parent(n + 1, 1);
    for (int i = 2; i <= n; i++) cin >> parent[i];
    vector<pair<int,int>> queries(q);
    for (auto &qq : queries) cin >> qq.first >> qq.second;

    string out;
    for (int v : nearestCommonManagers(n, parent, queries)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
