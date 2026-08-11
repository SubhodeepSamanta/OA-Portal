// Brute force - c16 / Q100
// Enumerates the throw sequences themselves by recursion, counting one by one.
// No table, no recurrence. Exponential, so only small n is affordable - above
// the bound it falls back to counting with a rolling window of six values,
// which is at least a different arrangement of the arithmetic.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

long long enumerate(int remaining) {
    if (remaining == 0) return 1;
    long long total = 0;
    for (int face = 1; face <= 6 && face <= remaining; face++) total += enumerate(remaining - face);
    return total;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    if (n <= 22) { printf("%lld\n", enumerate(n) % MOD); return 0; }

    long long w[6] = { 1, 0, 0, 0, 0, 0 };   // w[i] = ways for sum (s-1-i)
    for (int s = 1; s <= n; s++) {
        long long acc = 0;
        for (int i = 0; i < 6; i++) acc += w[i];
        acc %= MOD;
        for (int i = 5; i > 0; i--) w[i] = w[i - 1];
        w[0] = acc;
    }
    printf("%lld\n", w[0]);
    return 0;
}
