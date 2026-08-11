// Brute force - c7 / Q60
// A separate BFS from every node. No diameter argument at all. O(n^2), so it
// is only usable on small trees.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b; scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    string out;
    vector<int> dist(n + 1), q;
    for (int s = 1; s <= n; s++) {
        fill(dist.begin(), dist.end(), -1);
        q.clear();
        q.push_back(s);
        dist[s] = 0;
        int far = 0;
        for (size_t i = 0; i < q.size(); i++) {
            int u = q[i];
            far = max(far, dist[u]);
            for (int v : adj[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push_back(v); }
        }
        out += to_string(far);
        out += (s == n ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
