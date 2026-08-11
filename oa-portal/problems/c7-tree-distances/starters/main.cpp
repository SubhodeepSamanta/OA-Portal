#include <bits/stdc++.h>
using namespace std;

vector<int> farthestDistances(const vector<vector<int>>& adj) {
    int n = (int)adj.size() - 1;
    // write your code here

    return vector<int>(n + 1, 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b; scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    vector<int> ans = farthestDistances(adj);
    string out;
    for (int v = 1; v <= n; v++) { out += to_string(ans[v]); out += (v == n ? '\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
