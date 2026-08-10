// Brute force - m36 / Q109
//
// tiny  : every permutation, scored directly - no bitmasks, no memoisation.
//         This is what actually proves the DP formulation is right.
// larger: top-down memoised recursion over the same states. A different
//         implementation from the reference's bottom-up sweep, and it exists
//         only because n! is unrunnable past about 9 - the inputs here are
//         tiny in BYTES, so the stress harness would otherwise happily hand
//         an n=18 case to the permutation walker and never return.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<long long>> c;
vector<long long> memo;

long long solve(int mask) {
    int i = __builtin_popcount(mask);
    if (i == n) return 0;
    if (memo[mask] >= 0) return memo[mask];
    long long best = LLONG_MAX / 4;
    for (int j = 0; j < n; j++)
        if (!(mask & (1 << j))) best = min(best, c[i][j] + solve(mask | (1 << j)));
    return memo[mask] = best;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    c.assign(n, vector<long long>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%lld", &c[i][j]);

    if (n <= 8) {
        vector<int> perm(n);
        for (int i = 0; i < n; i++) perm[i] = i;
        long long best = LLONG_MAX;
        do {
            long long total = 0;
            for (int i = 0; i < n; i++) total += c[i][perm[i]];
            best = min(best, total);
        } while (next_permutation(perm.begin(), perm.end()));
        printf("%lld\n", best);
        return 0;
    }

    memo.assign(1 << n, -1);
    printf("%lld\n", solve(0));
    return 0;
}
