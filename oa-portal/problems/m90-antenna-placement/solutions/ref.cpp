// Reference - m90 / Q211 Antenna Placement
// f(p) = n*p^2 - 2*p*S + Q is an upward parabola minimised at p = S/n.
// p must be an integer, so test floor and ceil of that mean.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long S = 0, Q = 0;
    long long lo = LLONG_MAX, hi = LLONG_MIN;
    for (int i = 0; i < n; i++) {
        long long v; scanf("%lld", &v);
        S += v;
        Q += v * v;
        lo = min(lo, v);
        hi = max(hi, v);
    }

    auto cost = [&](long long p) { return (long long)n * p * p - 2 * p * S + Q; };

    long long f = S / n;                 // values are non-negative, so this is floor
    long long best = cost(f);            // floor(mean) always lies inside [lo, hi]
    if (f + 1 <= hi) best = min(best, cost(f + 1));
    (void)lo;
    printf("%lld\n", best);
    return 0;
}
