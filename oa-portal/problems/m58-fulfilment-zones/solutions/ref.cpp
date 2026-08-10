// Reference - m58 / Q153 Fulfilment Zones
//
// Each customer becomes a bitmask of the warehouses that can reach them. A
// selection S fails exactly when S misses some customer's mask entirely, i.e.
// S is a subset of that mask's complement. Mark those complements, propagate
// "subset of something bad is also bad" over all 2^n masks, then take the
// lightest survivor.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    long long d;
    if (scanf("%d %d %lld", &n, &m, &d) != 3) return 0;

    vector<long long> wx(n), wy(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &wx[i], &wy[i]);

    const long long d2 = d * d;
    const int FULL = 1 << n;
    vector<char> bad(FULL, 0);

    for (int j = 0; j < m; j++) {
        long long cx, cy;
        scanf("%lld %lld", &cx, &cy);
        int reach = 0;
        for (int i = 0; i < n; i++) {
            long long dx = cx - wx[i], dy = cy - wy[i];
            if (dx * dx + dy * dy <= d2) reach |= 1 << i;
        }
        bad[(FULL - 1) ^ reach] = 1;          // anything inside this misses them
    }

    // subset-of-bad is bad: push each mark down one bit at a time
    for (int b = 0; b < n; b++)
        for (int mask = FULL - 1; mask >= 0; mask--)
            if (mask & (1 << b)) { if (bad[mask]) bad[mask ^ (1 << b)] = 1; }

    int best = -1;
    for (int mask = 0; mask < FULL; mask++)
        if (!bad[mask]) {
            int c = __builtin_popcount(mask);
            if (best < 0 || c < best) best = c;
        }

    printf("%d\n", best);
    return 0;
}
