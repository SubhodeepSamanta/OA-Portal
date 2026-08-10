// Brute force - m43 / Q130
//
// tiny  : every visiting order, scored directly - what actually proves the
//         state collapse is sound.
// larger: top-down memoised recursion over the same states. Needed because
//         these inputs are tiny in BYTES (a 16x16 table is under 1 KB), so
//         the stress harness would otherwise hand n=15 to a 15! walk.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<long long>> d;
vector<vector<long long>> memo;

long long go(int mask, int at) {
    if (mask == (1 << n) - 1) return d[at + 1][0];
    if (memo[mask][at] >= 0) return memo[mask][at];
    long long best = LLONG_MAX / 4;
    for (int j = 0; j < n; j++)
        if (!(mask & (1 << j))) best = min(best, d[at + 1][j + 1] + go(mask | (1 << j), j));
    return memo[mask][at] = best;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    int m = n + 1;
    d.assign(m, vector<long long>(m));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < m; j++) scanf("%lld", &d[i][j]);

    if (n <= 8) {
        vector<int> order(n);
        for (int i = 0; i < n; i++) order[i] = i + 1;
        long long best = LLONG_MAX;
        do {
            long long total = d[0][order[0]];
            for (int i = 0; i + 1 < n; i++) total += d[order[i]][order[i + 1]];
            total += d[order[n - 1]][0];
            best = min(best, total);
        } while (next_permutation(order.begin(), order.end()));
        printf("%lld\n", best);
        return 0;
    }

    memo.assign(1 << n, vector<long long>(n, -1));
    long long best = LLONG_MAX / 4;
    for (int j = 0; j < n; j++) best = min(best, d[0][j + 1] + go(1 << j, j));
    printf("%lld\n", best);
    return 0;
}
