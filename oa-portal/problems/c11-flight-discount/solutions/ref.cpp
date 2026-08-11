// Reference - c11 / Q81 Flight Discount (CSES 1195)
// One Dijkstra over 2n states: (city, coupon already used).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    vector<int> head(n + 1, -1), nxt(m), to(m);
    vector<long long> cost(m);
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        scanf("%d %d %lld", &a, &b, &c);
        to[i] = b; cost[i] = c; nxt[i] = head[a]; head[a] = i;
    }

    const long long INF = (long long)4e18;
    // state = city * 2 + used
    vector<long long> dist(2 * (n + 1), INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;

    dist[1 * 2 + 0] = 0;
    pq.push({ 0, 1 * 2 + 0 });

    while (!pq.empty()) {
        auto [d, s] = pq.top();
        pq.pop();
        if (d > dist[s]) continue;              // stale entry
        int u = s >> 1, used = s & 1;
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            // take the flight at full price, coupon state unchanged
            int s1 = v * 2 + used;
            if (d + cost[e] < dist[s1]) { dist[s1] = d + cost[e]; pq.push({ dist[s1], s1 }); }
            // or spend the coupon here, if it is still unspent
            if (!used) {
                int s2 = v * 2 + 1;
                long long nd = d + cost[e] / 2;
                if (nd < dist[s2]) { dist[s2] = nd; pq.push({ nd, s2 }); }
            }
        }
    }

    printf("%lld\n", min(dist[n * 2 + 0], dist[n * 2 + 1]));
    return 0;
}
