// Reference - a4 / Q92 Knapsack 1 (AtCoder EDPC D)
// 0/1 knapsack indexed by weight, capacity iterated DOWNWARDS so each item is
// offered once. Values reach 1e9 each and 1e11 in total, so 64-bit.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long W;
    if (scanf("%d %lld", &n, &W) != 2) return 0;
    vector<long long> w(n), v(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &w[i], &v[i]);

    vector<long long> best(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (long long c = W; c >= w[i]; c--) {
            long long cand = best[c - w[i]] + v[i];
            if (cand > best[c]) best[c] = cand;
        }
    }
    printf("%lld\n", best[W]);
    return 0;
}
