// Reference - m69 / Q164 Portfolio Rebalance
// Every surplus unit must leave its own asset and is charged that asset's
// fee, which fixes the total. Any pairing of surplus with deficit achieves it.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    long long haveTotal = 0, wantTotal = 0, cost = 0;
    for (int i = 0; i < n; i++) {
        long long c, t, f;
        scanf("%lld %lld %lld", &c, &t, &f);
        haveTotal += c;
        wantTotal += t;
        if (c > t) cost += (c - t) * f;
    }

    printf("%lld\n", haveTotal == wantTotal ? cost : -1LL);
    return 0;
}
