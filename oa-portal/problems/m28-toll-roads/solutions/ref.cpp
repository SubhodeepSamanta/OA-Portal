// Reference - m28 / Q71 Toll Roads
// 0-1 BFS: free roads go on the front of the deque, toll roads on the back.
// The deque stays sorted by construction, so no priority queue is needed.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    vector<int> head(n + 1, -1), nxt(2 * (size_t)m), to(2 * (size_t)m), wt(2 * (size_t)m);
    int ec = 0;
    auto addEdge = [&](int a, int b, int w) {
        to[ec] = b; wt[ec] = w; nxt[ec] = head[a]; head[a] = ec++;
    };
    for (int i = 0; i < m; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        addEdge(u, v, w);
        addEdge(v, u, w);
    }

    const int INF = INT_MAX / 4;
    vector<int> dist(n + 1, INF);
    deque<int> dq;
    dist[1] = 0;
    dq.push_back(1);

    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e], nd = dist[u] + wt[e];
            if (nd < dist[v]) {
                dist[v] = nd;
                if (wt[e] == 0) dq.push_front(v); else dq.push_back(v);
            }
        }
    }
    printf("%d\n", dist[n] >= INF ? -1 : dist[n]);
    return 0;
}
