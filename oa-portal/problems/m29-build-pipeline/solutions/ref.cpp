// Reference - m29 / Q73 Build Pipeline
// Kahn topological order; finish[b] = max over predecessors a of finish[a],
// plus t[b]. If the order does not cover every task there is a cycle.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> t(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &t[i]);

    vector<int> head(n + 1, -1), nxt(m ? m : 1), to(m ? m : 1), indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        to[i] = b; nxt[i] = head[a]; head[a] = i;
        indeg[b]++;
    }

    vector<long long> start(n + 1, 0);   // earliest start time
    vector<int> q;
    q.reserve(n);
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.push_back(i);

    long long best = 0;
    size_t done = 0;
    while (done < q.size()) {
        int u = q[done++];
        long long fin = start[u] + t[u];
        best = max(best, fin);
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            start[v] = max(start[v], fin);
            if (--indeg[v] == 0) q.push_back(v);
        }
    }

    if ((int)q.size() != n) { printf("-1\n"); return 0; }
    printf("%lld\n", best);
    return 0;
}
