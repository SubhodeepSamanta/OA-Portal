// Brute force - c11 / Q81
// No layered graph: discount ONE flight, run an ordinary Dijkstra on the
// resulting graph, and repeat for every flight in turn. Also runs it once with
// no discount at all. O(m * (n + m) log n), so small inputs only.
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<int> ea, eb;
vector<long long> ec;

long long shortest(int discounted) {
    const long long INF = (long long)4e18;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        long long c = (i == discounted) ? ec[i] / 2 : ec[i];
        adj[ea[i]].push_back({ eb[i], c });
    }

    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;
    dist[1] = 0;
    pq.push({ 0, 1 });
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, c] : adj[u]) if (d + c < dist[v]) { dist[v] = d + c; pq.push({ dist[v], v }); }
    }
    return dist[n];
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    ea.resize(m); eb.resize(m); ec.resize(m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &ea[i], &eb[i], &ec[i]);

    long long best = shortest(-1);              // no coupon used
    for (int i = 0; i < m; i++) best = min(best, shortest(i));
    printf("%lld\n", best);
    return 0;
}
