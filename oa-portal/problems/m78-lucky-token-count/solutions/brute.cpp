// Brute force - m78 / Q177
//
// tiny  : walk every token and add its digits. The definition, nothing else.
// larger: count by composition instead - how many d-digit tails sum to a
//         given value, combined along N's prefix. Different reasoning from
//         the memoised descent, and needed because a 20-character input can
//         still name 10^18 tokens.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    long long N;
    int S;
    if (scanf("%lld %d", &N, &S) != 2) return 0;

    if (N <= 2000000) {
        long long count = 0;
        for (long long v = 1; v <= N; v++) {
            int s = 0;
            for (long long x = v; x; x /= 10) s += (int)(x % 10);
            if (s == S) count++;
        }
        printf("%lld\n", count % MOD);
        return 0;
    }

    string D = to_string(N);
    int L = (int)D.size();

    // ways[d][v] = number of d-digit strings (leading zeros allowed) summing to v
    vector<vector<long long>> ways(L + 1, vector<long long>(170, 0));
    ways[0][0] = 1;
    for (int d = 1; d <= L; d++)
        for (int v = 0; v < 170; v++) {
            long long acc = 0;
            for (int k = 0; k <= 9 && k <= v; k++) acc += ways[d - 1][v - k];
            ways[d][v] = acc % MOD;
        }

    long long total = 0, used = 0;
    for (int i = 0; i < L; i++) {
        int cap = D[i] - '0';
        for (int d = 0; d < cap; d++) {
            long long need = (long long)S - used - d;
            if (need >= 0 && need < 170) total = (total + ways[L - i - 1][need]) % MOD;
        }
        used += cap;
        if (used > S) break;
    }
    if (used == S) total = (total + 1) % MOD;      // N itself

    printf("%lld\n", total % MOD);
    return 0;
}
