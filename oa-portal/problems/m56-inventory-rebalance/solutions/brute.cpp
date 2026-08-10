// Brute force - m56 / Q151
// Straight dynamic programming over the value of R at each boundary, with a
// running prefix minimum to enforce "non-decreasing". No heap, no slope
// trick, no clamping argument - just the definition, and only affordable
// because the small tests keep the total stock tiny.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long m;
    if (scanf("%d %lld", &n, &m) != 2) return 0;
    vector<long long> s(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &s[i]); total += s[i]; }

    if (total < (long long)n * m) { printf("-1\n"); return 0; }
    long long cap = total - (long long)n * m;
    if (n == 1) { printf("0\n"); return 0; }

    const long long INF = LLONG_MAX / 4;
    // best[r] = cheapest way to have R at this boundary equal to at most r
    vector<long long> best((size_t)cap + 1, 0);

    long long prefix = 0;
    for (int i = 1; i <= n - 1; i++) {
        prefix += s[i - 1];
        long long A = prefix - (long long)i * m;

        vector<long long> cur((size_t)cap + 1, INF);
        for (long long r = 0; r <= cap; r++) cur[r] = llabs(A - r) + best[r];
        long long run = INF;
        for (long long r = 0; r <= cap; r++) { run = min(run, cur[r]); best[r] = run; }
    }

    printf("%lld\n", best[cap]);
    return 0;
}
