// Brute force - c30 / Q235
// Rebuilds the whole component picture from scratch after every road, with a
// BFS flood fill over the roads built so far. No DSU, no incremental
// bookkeeping, no running maximum. O(m * (n + m)), small inputs only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> ea(m), eb(m);
    for (int i = 0; i < m; i++) scanf("%d %d", &ea[i], &eb[i]);

    string out;
    vector<vector<int>> adj(n + 1);
    vector<char> seen(n + 1);
    vector<int> q;

    for (int k = 0; k < m; k++) {
        adj[ea[k]].push_back(eb[k]);
        adj[eb[k]].push_back(ea[k]);

        fill(seen.begin(), seen.end(), 0);
        int components = 0, largest = 0;
        for (int s = 1; s <= n; s++) {
            if (seen[s]) continue;
            components++;
            q.clear();
            q.push_back(s);
            seen[s] = 1;
            for (size_t i = 0; i < q.size(); i++)
                for (int v : adj[q[i]]) if (!seen[v]) { seen[v] = 1; q.push_back(v); }
            largest = max(largest, (int)q.size());
        }
        out += to_string(components);
        out += ' ';
        out += to_string(largest);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
