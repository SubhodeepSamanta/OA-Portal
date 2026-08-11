// Brute force - m90 / Q211
// Evaluates the cost at every integer position in [min x, max x] by summing
// over all houses. No parabola, no mean, no rounding argument. Affordable
// only while n * span stays small, so wider cases fall back to a ternary
// search on the same directly-summed cost - still no closed form.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> x;

long long cost(long long p) {
    long long s = 0;
    for (int i = 0; i < n; i++) { long long d = x[i] - p; s += d * d; }
    return s;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    x.resize(n);
    long long lo = LLONG_MAX, hi = LLONG_MIN;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &x[i]);
        lo = min(lo, x[i]);
        hi = max(hi, x[i]);
    }

    long long span = hi - lo + 1;
    if (span * (long long)n <= 20000000LL) {
        long long best = LLONG_MAX;
        for (long long p = lo; p <= hi; p++) best = min(best, cost(p));
        printf("%lld\n", best);
        return 0;
    }

    long long a = lo, b = hi;
    while (b - a > 2) {
        long long m1 = a + (b - a) / 3;
        long long m2 = b - (b - a) / 3;
        if (cost(m1) <= cost(m2)) b = m2; else a = m1;
    }
    long long best = LLONG_MAX;
    for (long long p = a; p <= b; p++) best = min(best, cost(p));
    printf("%lld\n", best);
    return 0;
}
