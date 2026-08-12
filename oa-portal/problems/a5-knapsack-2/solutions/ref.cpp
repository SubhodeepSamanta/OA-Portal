// Reference - a5 / Q93 Knapsack 2 (AtCoder EDPC E)
// W is 1e9, so a weight-indexed table is impossible. Values are small
// (sum <= 1e5), so index by VALUE and store the least weight that achieves it.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long W;
    if (scanf("%d %lld", &n, &W) != 2) return 0;
    vector<long long> w(n), v(n);
    long long V = 0;
    for (int i = 0; i < n; i++) { scanf("%lld %lld", &w[i], &v[i]); V += v[i]; }

    const long long INF = (long long)2e18;
    vector<long long> minWeight(V + 1, INF);
    minWeight[0] = 0;

    for (int i = 0; i < n; i++) {
        for (long long val = V; val >= v[i]; val--) {
            if (minWeight[val - v[i]] == INF) continue;   // avoid INF + w overflow
            minWeight[val] = min(minWeight[val], minWeight[val - v[i]] + w[i]);
        }
    }

    long long best = 0;
    for (long long val = V; val >= 0; val--) {
        if (minWeight[val] <= W) { best = val; break; }
    }
    printf("%lld\n", best);
    return 0;
}
