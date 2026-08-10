// Brute force - m69 / Q164
// Actually move the units: repeatedly take a surplus asset and a deficit
// asset and shift as much as fits, charging the source's fee each time.
// Assumes nothing about the closed-form answer.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> c(n), t(n), f(n);
    long long haveTotal = 0, wantTotal = 0;
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld %lld", &c[i], &t[i], &f[i]);
        haveTotal += c[i];
        wantTotal += t[i];
    }
    if (haveTotal != wantTotal) { printf("-1\n"); return 0; }

    long long cost = 0;
    int src = 0, dst = 0;
    while (true) {
        while (src < n && c[src] <= t[src]) src++;
        while (dst < n && c[dst] >= t[dst]) dst++;
        if (src >= n || dst >= n) break;
        long long move = min(c[src] - t[src], t[dst] - c[dst]);
        c[src] -= move;
        c[dst] += move;
        cost += move * f[src];
    }
    printf("%lld\n", cost);
    return 0;
}
