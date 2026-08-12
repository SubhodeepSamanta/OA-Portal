// Brute force - a3 / Q91
// Tries every legal sequence of activities by recursion, with no table.
// 3 * 2^(N-1) sequences, so tiny N only.
//
// Above that bound it runs the same states BACKWARDS: from[prev] is the best
// happiness obtainable over the remaining days given that yesterday's activity
// was `prev`. The reference sweeps forward accumulating totals; this one
// sweeps back accumulating futures, so the two disagree on any indexing or
// base-case slip.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<array<long long, 3>> g;

long long explore(int day, int prev) {
    if (day == n) return 0;
    long long best = LLONG_MIN;
    for (int t = 0; t < 3; t++) {
        if (t == prev) continue;
        best = max(best, g[day][t] + explore(day + 1, t));
    }
    return best;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    g.assign(n, {});
    for (int i = 0; i < n; i++) scanf("%lld %lld %lld", &g[i][0], &g[i][1], &g[i][2]);

    if (n <= 18) { printf("%lld\n", explore(0, -1)); return 0; }

    // from[prev] = best over the days still to come, given yesterday = prev
    array<long long, 3> from = { 0, 0, 0 };
    for (int day = n - 1; day >= 1; day--) {
        array<long long, 3> cur;
        for (int prev = 0; prev < 3; prev++) {
            long long best = LLONG_MIN;
            for (int t = 0; t < 3; t++) {
                if (t == prev) continue;
                best = max(best, g[day][t] + from[t]);
            }
            cur[prev] = best;
        }
        from = cur;
    }

    // day 0 is unconstrained, so try each activity and add the future it leaves
    long long ans = LLONG_MIN;
    for (int t = 0; t < 3; t++) ans = max(ans, g[0][t] + from[t]);
    printf("%lld\n", ans);
    return 0;
}
