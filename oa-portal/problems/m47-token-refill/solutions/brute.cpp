// Brute force - m47 / Q134
//
// tiny  : tick the clock one second at a time, adding a token each second and
//         handling any request that lands on that second. Nothing is jumped.
// larger: the same rule with gaps, for inputs where ticking is impossible.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long C;
    if (scanf("%d %lld", &n, &C) != 2) return 0;
    vector<long long> t(n), c(n);
    long long maxT = 0;
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld", &t[i], &c[i]);
        maxT = max(maxT, t[i]);
    }

    int served = 0;
    if (maxT <= 5000 && C <= 5000) {
        long long level = C;
        int idx = 0;
        for (long long now = 1; now <= maxT; now++) {
            level = min(C, level + 1);              // one second of refill
            while (idx < n && t[idx] == now) {
                if (level >= c[idx]) { level -= c[idx]; served++; }
                idx++;
            }
        }
    } else {
        long long level = C, prev = 0;
        for (int i = 0; i < n; i++) {
            long long gap = t[i] - prev;
            for (long long s = 0; s < gap && level < C; s++) level++;   // no min()
            prev = t[i];
            if (level >= c[i]) { level -= c[i]; served++; }
        }
    }
    printf("%d\n", served);
    return 0;
}
