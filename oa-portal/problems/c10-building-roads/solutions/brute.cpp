// Brute force - c10 / Q80
// BFS flood fill instead of Union-Find, and it chains the components in the
// order it discovers them while joining the LAST city of one component to the
// FIRST of the next - so it normally emits different roads from the reference,
// which is what the checker has to accept.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b; scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    vector<char> seen(n + 1, 0);
    vector<pair<int, int>> ends;     // (first city found, last city found) per component
    vector<int> q;
    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        q.clear();
        q.push_back(s);
        seen[s] = 1;
        for (size_t i = 0; i < q.size(); i++) {
            for (int v : adj[q[i]]) if (!seen[v]) { seen[v] = 1; q.push_back(v); }
        }
        ends.push_back({ q.front(), q.back() });
    }

    string out = to_string((int)ends.size() - 1);
    out += '\n';
    for (size_t i = 1; i < ends.size(); i++) {
        out += to_string(ends[i - 1].second);
        out += ' ';
        out += to_string(ends[i].first);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
