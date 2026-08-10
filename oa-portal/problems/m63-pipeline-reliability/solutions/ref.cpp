// Reference - m63 / Q158 Pipeline Reliability
// Kahn order over the DAG; best[v] = w[v] + min(best[pred]), seeded at every
// stage with no incoming edge. Answer is the smallest best over stages with
// no outgoing edge.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> w(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &w[i]);

    vector<int> head(n + 1, -1), nxt(m ? m : 1), to(m ? m : 1);
    vector<int> indeg(n + 1, 0), outdeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        to[i] = b; nxt[i] = head[a]; head[a] = i;
        indeg[b]++; outdeg[a]++;
    }

    const long long INF = LLONG_MAX / 4;
    vector<long long> best(n + 1, INF);
    vector<int> order;
    order.reserve(n);
    vector<int> deg(indeg);

    for (int v = 1; v <= n; v++)
        if (deg[v] == 0) { best[v] = w[v]; order.push_back(v); }

    for (size_t h = 0; h < order.size(); h++) {
        int u = order[h];
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            if (best[u] != INF && best[u] + w[v] < best[v]) best[v] = best[u] + w[v];
            if (--deg[v] == 0) order.push_back(v);
        }
    }

    long long ans = INF;
    for (int v = 1; v <= n; v++)
        if (outdeg[v] == 0) ans = min(ans, best[v]);

    printf("%lld\n", ans);
    return 0;
}
