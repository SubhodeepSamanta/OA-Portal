// Reference - c4 / Q27 Array Division (CSES 1085)
// Binary search the cap S; a greedy left-to-right pass reports the fewest
// pieces achievable under that cap.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, k;
    if (scanf("%lld %lld", &n, &k) != 2) return 0;
    vector<long long> x(n);
    long long lo = 0, hi = 0;
    for (long long i = 0; i < n; i++) {
        scanf("%lld", &x[i]);
        lo = max(lo, x[i]);            // a piece must hold its largest element
        hi += x[i];                    // up to 2e14
    }

    auto piecesNeeded = [&](long long cap) {
        long long pieces = 1, cur = 0;
        for (long long i = 0; i < n; i++) {
            if (cur + x[i] > cap) { pieces++; cur = x[i]; }
            else cur += x[i];
        }
        return pieces;
    };

    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (piecesNeeded(mid) <= k) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
