// Brute force - m32 / Q75
// Recompute from scratch after every unplugging, with a plain flood fill.
// No DSU, no reversal - the definition, straight down.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, q;
    if (scanf("%d %d %d", &n, &m, &q) != 3) return 0;
    vector<int> U(m + 1), V(m + 1);
    for (int i = 1; i <= m; i++) scanf("%d %d", &U[i], &V[i]);
    vector<int> ev(q);
    for (int i = 0; i < q; i++) scanf("%d", &ev[i]);

    vector<char> alive(m + 1, 1);
    string out;
    for (int e = 0; e < q; e++) {
        alive[ev[e]] = 0;

        vector<vector<int>> g(n + 1);
        for (int i = 1; i <= m; i++)
            if (alive[i]) { g[U[i]].push_back(V[i]); g[V[i]].push_back(U[i]); }

        vector<char> seen(n + 1, 0);
        int comps = 0;
        for (int s = 1; s <= n; s++) {
            if (seen[s]) continue;
            comps++;
            vector<int> st{s};
            seen[s] = 1;
            while (!st.empty()) {
                int u = st.back(); st.pop_back();
                for (int v : g[u]) if (!seen[v]) { seen[v] = 1; st.push_back(v); }
            }
        }
        out += to_string(comps);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
