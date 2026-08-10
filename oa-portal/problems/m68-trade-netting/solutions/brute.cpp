// Brute force - m68 / Q163
// Flood fill over an adjacency list instead of union-find, walking the
// counterparties in order so groups come out sorted by smallest member
// without any explicit sort.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> bal(n + 1, 0);
    vector<vector<int>> adj(n + 1);

    for (int j = 0; j < m; j++) {
        int a, b;
        long long x;
        scanf("%d %d %lld", &a, &b, &x);
        bal[a] -= x;
        bal[b] += x;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    vector<char> seen(n + 1, 0);
    string body;
    long long groups = 0;

    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        groups++;
        long long nonzero = 0, moving = 0;
        vector<int> st{s};
        seen[s] = 1;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            if (bal[u] != 0) nonzero++;
            if (bal[u] > 0) moving += bal[u];
            for (int v : adj[u]) if (!seen[v]) { seen[v] = 1; st.push_back(v); }
        }
        body += to_string(s); body += ' ';
        body += to_string(nonzero); body += ' ';
        body += to_string(moving); body += '\n';
    }

    string out = to_string(groups);
    out += '\n';
    out += body;
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
