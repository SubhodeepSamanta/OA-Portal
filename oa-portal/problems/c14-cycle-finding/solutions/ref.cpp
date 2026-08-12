// Reference - c14 / Q84 Cycle Finding (CSES 1197)
// Bellman-Ford from a virtual source (every distance starts at 0, so an
// unreachable cycle is still found). Distances are clamped to stop 64-bit
// values wrapping after thousands of relaxations.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> ea(m), eb(m);
    vector<long long> ec(m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &ea[i], &eb[i], &ec[i]);

    const long long FLOOR = -(long long)4e18;
    vector<long long> dist(n + 1, 0);
    vector<int> parent(n + 1, -1);

    int x = -1;
    for (int pass = 0; pass < n; pass++) {
        x = -1;
        for (int j = 0; j < m; j++) {
            if (dist[ea[j]] + ec[j] < dist[eb[j]]) {
                dist[eb[j]] = max(dist[ea[j]] + ec[j], FLOOR);
                parent[eb[j]] = ea[j];
                x = eb[j];
            }
        }
        if (x == -1) break;
    }

    if (x == -1) { printf("NO\n"); return 0; }

    // x may only be reachable from the cycle - n steps back lands inside it
    for (int i = 0; i < n; i++) x = parent[x];

    vector<int> cycle;
    for (int v = x;; v = parent[v]) {
        cycle.push_back(v);
        if (v == x && cycle.size() > 1) break;
    }
    reverse(cycle.begin(), cycle.end());

    string out = "YES\n";
    for (size_t i = 0; i < cycle.size(); i++) {
        out += to_string(cycle[i]);
        out += (i + 1 == cycle.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
