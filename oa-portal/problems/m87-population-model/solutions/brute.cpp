// Brute force - m87 / Q208
//
// tiny  : iterate the recurrence one term at a time. No matrices anywhere.
// larger: Kitamasa - compute x^T modulo the characteristic polynomial
//         x^2 - a*x - b, then p(T) = c0*p(0) + c1*p(1). Genuinely different
//         machinery from the 2x2 matrix power, and needed because a 25-byte
//         line can ask for T = 10^18.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    long long p0, p1, a, b, T;
    if (scanf("%lld %lld %lld %lld %lld", &p0, &p1, &a, &b, &T) != 5) return 0;
    p0 %= MOD; p1 %= MOD; a %= MOD; b %= MOD;

    if (T == 0) { printf("%lld\n", p0); return 0; }
    if (T == 1) { printf("%lld\n", p1); return 0; }

    if (T <= 2000000) {
        long long prev2 = p0, prev1 = p1, cur = 0;
        for (long long t = 2; t <= T; t++) {
            cur = (a * prev1 + b * prev2) % MOD;
            prev2 = prev1;
            prev1 = cur;
        }
        printf("%lld\n", cur);
        return 0;
    }

    // multiply (c0 + c1 x)(d0 + d1 x) modulo x^2 = a x + b
    auto mul = [&](array<long long, 2> c, array<long long, 2> d) {
        long long lo = c[0] * d[0] % MOD;
        long long mid = (c[0] * d[1] + c[1] * d[0]) % MOD;
        long long hi = c[1] * d[1] % MOD;                 // coefficient of x^2
        array<long long, 2> r;
        r[0] = (lo + hi * b) % MOD;
        r[1] = (mid + hi * a) % MOD;
        return r;
    };

    array<long long, 2> res = {1, 0};                     // x^0
    array<long long, 2> base = {0, 1};                    // x
    long long e = T;
    while (e) {
        if (e & 1) res = mul(res, base);
        base = mul(base, base);
        e >>= 1;
    }

    printf("%lld\n", (res[0] * p0 + res[1] * p1) % MOD);
    return 0;
}
