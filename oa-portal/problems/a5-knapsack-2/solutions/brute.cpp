// Brute force - a5 / Q93
// Enumerates every subset and scores it directly - no table and no choice of
// axis, so it cannot share the reference's state-selection mistake.
// Exponential; above the bound it falls back to a two-row value-indexed table,
// which still indexes differently from the single rolling array.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long W;
    if (scanf("%d %lld", &n, &W) != 2) return 0;
    vector<long long> w(n), v(n);
    long long V = 0;
    for (int i = 0; i < n; i++) { scanf("%lld %lld", &w[i], &v[i]); V += v[i]; }

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

    const long long INF = (long long)2e18;
    vector<long long> prev(V + 1, INF), cur(V + 1, INF);
    prev[0] = 0;
    for (int i = 0; i < n; i++) {
        for (long long val = 0; val <= V; val++) {
            cur[val] = prev[val];
            if (val >= v[i] && prev[val - v[i]] != INF) {
                cur[val] = min(cur[val], prev[val - v[i]] + w[i]);
            }
        }
        prev.swap(cur);
    }

    long long best = 0;
    for (long long val = V; val >= 0; val--) if (prev[val] <= W) { best = val; break; }
    printf("%lld\n", best);
    return 0;
}
