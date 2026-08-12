// Brute force - a4 / Q92
// Enumerates every subset of items and scores it directly - no table, no
// capacity loop, so no loop-direction subtlety to share with the reference.
// Exponential; above the bound it falls back to the explicit two-row table,
// which still indexes differently from the single rolling array.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long W;
    if (scanf("%d %lld", &n, &W) != 2) return 0;
    vector<long long> w(n), v(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &w[i], &v[i]);

    if (n <= 20) {
        long long best = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            long long weight = 0, value = 0;
            for (int i = 0; i < n; i++) {
                if (!(mask >> i & 1)) continue;
                weight += w[i];
                if (weight > W) break;
                value += v[i];
            }
            if (weight <= W) best = max(best, value);
        }
        printf("%lld\n", best);
        return 0;
    }

    vector<long long> prev(W + 1, 0), cur(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (long long c = 0; c <= W; c++) {
            cur[c] = prev[c];
            if (c >= w[i]) cur[c] = max(cur[c], prev[c - w[i]] + v[i]);
        }
        prev.swap(cur);
    }
    printf("%lld\n", prev[W]);
    return 0;
}
