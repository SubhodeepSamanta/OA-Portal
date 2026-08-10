// Brute force - m67 / Q162
//
// No binary search. The best achievable worst ratio is always k/c[i] for some
// shelf i and some whole stock k on it, so enumerate every such candidate
// fraction, test it exactly, and keep the largest that works. Comparisons
// stay in integers by cross-multiplying.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long T;
    if (scanf("%d %lld", &n, &T) != 2) return 0;
    vector<long long> s(n), c(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &s[i], &c[i]);

    // does every shelf reach the ratio num/den?
    auto feasible = [&](long long num, long long den) {
        long long need = 0;
        for (int i = 0; i < n; i++) {
            long long want = (num * c[i] + den - 1) / den;
            if (want > s[i]) {
                need += want - s[i];
                if (need > T) return false;
            }
        }
        return need <= T;
    };

    long long bestNum = 0, bestDen = 1;                   // ratio 0 always works
    for (int i = 0; i < n; i++)
        for (long long k = 0; k <= c[i]; k++)
            if (feasible(k, c[i])) {
                // keep it if k/c[i] > bestNum/bestDen
                if ((__int128)k * bestDen > (__int128)bestNum * c[i]) { bestNum = k; bestDen = c[i]; }
            }

    printf("%lld\n", (long long)((__int128)bestNum * 1000000 / bestDen));
    return 0;
}
