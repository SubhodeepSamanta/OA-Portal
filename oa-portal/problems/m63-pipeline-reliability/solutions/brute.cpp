// Brute force - m63 / Q158
// Walk every start-to-end path explicitly and score it. Exponential, and
// deliberately so - it assumes nothing about orders or dynamic programming.
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<long long> w;
vector<vector<int>> adj;
vector<int> outdeg;
long long best;

void walk(int v, long long acc) {
    acc += w[v];
    if (acc >= best) return;                 // cannot improve
    if (outdeg[v] == 0) { best = min(best, acc); return; }
    for (int u : adj[v]) walk(u, acc);
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    w.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &w[i]);
    adj.assign(n + 1, {});
    outdeg.assign(n + 1, 0);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        indeg[b]++;
        outdeg[a]++;
    }

    best = LLONG_MAX / 4;
    for (int v = 1; v <= n; v++) if (indeg[v] == 0) walk(v, 0);
    printf("%lld\n", best);
    return 0;
}
