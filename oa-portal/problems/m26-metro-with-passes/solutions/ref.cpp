// Reference - m26 / Q69 Metro with Passes
// Dijkstra over states (station, passes already used).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return 0;

    vector<int> head(n + 1, -1), nxt(2 * m), to(2 * m);
    vector<long long> wt(2 * m);
    int ec = 0;
    auto addEdge = [&](int a, int b, long long c) {
        to[ec] = b; wt[ec] = c; nxt[ec] = head[a]; head[a] = ec++;
    };
    for (int i = 0; i < m; i++) {
        int u, v; long long c;
        scanf("%d %d %lld", &u, &v, &c);
        addEdge(u, v, c);
        addEdge(v, u, c);
    }

    const long long INF = LLONG_MAX / 4;
    // dist[used * (n+1) + node]
    vector<long long> dist((size_t)(k + 1) * (n + 1), INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;   // (cost, used*(n+1)+node)

    dist[1] = 0;
    pq.push(make_pair(0LL, 1));

    while (!pq.empty()) {
        pair<long long, int> top = pq.top(); pq.pop();
        long long d = top.first;
        int state = top.second;
        if (d != dist[state]) continue;
        int used = state / (n + 1), u = state % (n + 1);
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            // pay for the link
            int s2 = used * (n + 1) + v;
            if (d + wt[e] < dist[s2]) { dist[s2] = d + wt[e]; pq.push(make_pair(dist[s2], s2)); }
            // or spend a pass on it
            if (used < k) {
                int s3 = (used + 1) * (n + 1) + v;
                if (d < dist[s3]) { dist[s3] = d; pq.push(make_pair(d, s3)); }
            }
        }
    }

    long long best = INF;
    for (int used = 0; used <= k; used++) best = min(best, dist[(size_t)used * (n + 1) + n]);
    printf("%lld\n", best >= INF ? -1LL : best);
    return 0;
}
