// Reference - m34 / Q77 Flight Discount Desk
// Dijkstra over two copies of the map: coupon unspent (layer 0) and spent
// (layer 1). Each flight either keeps the layer at full price, or crosses to
// layer 1 at half price.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    vector<int> head(n + 1, -1), nxt(m ? m : 1), to(m ? m : 1);
    vector<long long> wt(m ? m : 1);
    for (int i = 0; i < m; i++) {
        int u, v; long long c;
        scanf("%d %d %lld", &u, &v, &c);
        to[i] = v; wt[i] = c; nxt[i] = head[u]; head[u] = i;
    }

    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(2LL * (n + 1), INF);
    auto id = [&](int layer, int city) { return (size_t)layer * (n + 1) + city; };

    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;
    dist[id(0, 1)] = 0;
    pq.push(make_pair(0LL, (int)id(0, 1)));

    while (!pq.empty()) {
        pair<long long, int> top = pq.top(); pq.pop();
        long long d = top.first;
        int state = top.second;
        if (d != dist[state]) continue;
        int layer = state / (n + 1), u = state % (n + 1);
        for (int e = head[u]; e != -1; e = nxt[e]) {
            int v = to[e];
            size_t s1 = id(layer, v);
            if (d + wt[e] < dist[s1]) { dist[s1] = d + wt[e]; pq.push(make_pair(dist[s1], (int)s1)); }
            if (layer == 0) {
                size_t s2 = id(1, v);
                if (d + wt[e] / 2 < dist[s2]) { dist[s2] = d + wt[e] / 2; pq.push(make_pair(dist[s2], (int)s2)); }
            }
        }
    }

    long long best = min(dist[id(0, n)], dist[id(1, n)]);
    printf("%lld\n", best >= INF ? -1LL : best);
    return 0;
}
