// Brute force - m58 / Q153
// Try every subset of warehouses and check every customer against it
// directly. No masks-of-complements, no subset propagation.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    long long d;
    if (scanf("%d %d %lld", &n, &m, &d) != 3) return 0;

    vector<long long> wx(n), wy(n), cx(m), cy(m);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &wx[i], &wy[i]);
    for (int j = 0; j < m; j++) scanf("%lld %lld", &cx[j], &cy[j]);

    const long long d2 = d * d;
    int best = -1;
    for (int mask = 0; mask < (1 << n); mask++) {
        bool all = true;
        for (int j = 0; j < m && all; j++) {
            bool served = false;
            for (int i = 0; i < n && !served; i++) {
                if (!(mask & (1 << i))) continue;
                long long dx = cx[j] - wx[i], dy = cy[j] - wy[i];
                if (dx * dx + dy * dy <= d2) served = true;
            }
            if (!served) all = false;
        }
        if (all) {
            int c = __builtin_popcount(mask);
            if (best < 0 || c < best) best = c;
        }
    }
    printf("%d\n", best);
    return 0;
}
