// Reference - m67 / Q162 Shelf Restock
// Binary search the answer in millionths. Feasibility is one pass with an
// exact integer ceiling - no floating point anywhere.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long T;
    if (scanf("%d %lld", &n, &T) != 2) return 0;
    vector<long long> s(n), c(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &s[i], &c[i]);

    const long long M = 1000000;

    auto feasible = [&](long long m) {
        long long need = 0;
        for (int i = 0; i < n; i++) {
            long long want = (m * c[i] + M - 1) / M;      // ceil(m*c/1e6)
            if (want > s[i]) {
                need += want - s[i];
                if (need > T) return false;
            }
        }
        return need <= T;
    };

    long long lo = 0, hi = M;
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2;           // bias up
        if (feasible(mid)) lo = mid; else hi = mid - 1;
    }
    printf("%lld\n", lo);
    return 0;
}
