// Reference - c3 / Q26 Factory Machines (CSES 1620)
// Binary search the smallest T with sum of floor(T/k[i]) >= t.
// The sum is capped by breaking early: it can reach 2e23 otherwise.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, t;
    if (scanf("%lld %lld", &n, &t) != 2) return 0;
    vector<long long> k(n);
    long long mn = LLONG_MAX;
    for (long long i = 0; i < n; i++) { scanf("%lld", &k[i]); mn = min(mn, k[i]); }

    auto enough = [&](long long T) {
        long long made = 0;
        for (long long i = 0; i < n; i++) {
            made += T / k[i];
            if (made >= t) return true;   // stop before the sum can overflow
        }
        return made >= t;
    };

    long long lo = 1, hi = t * mn;        // one machine alone: at most 1e18
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (enough(mid)) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
