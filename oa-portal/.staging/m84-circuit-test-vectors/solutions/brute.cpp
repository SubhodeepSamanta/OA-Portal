// Brute force - m84 / Q204
// Enumerate every assignment and check all constraints. No disjoint sets, no
// parity bookkeeping, no counting argument.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int, 3>> con(m);
    for (int e = 0; e < m; e++) scanf("%d %d %d", &con[e][0], &con[e][1], &con[e][2]);

    long long count = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        bool ok = true;
        for (int e = 0; e < m && ok; e++) {
            int a = (mask >> (con[e][0] - 1)) & 1;
            int b = (mask >> (con[e][1] - 1)) & 1;
            if ((a ^ b) != con[e][2]) ok = false;
        }
        if (ok) count++;
    }
    printf("%lld\n", count % MOD);
    return 0;
}
