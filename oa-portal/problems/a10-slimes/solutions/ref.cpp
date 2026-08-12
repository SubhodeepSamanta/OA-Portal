// Reference - a10 / Q98 Slimes (AtCoder EDPC N)
// dp[i][j] = cheapest way to fuse a[i..j] into one slime. Whatever the order,
// the LAST fusion splits the range at some k, and its cost is the whole range
// sum however you got there - so fix k and take the best.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    auto sum = [&](int i, int j) { return pre[j + 1] - pre[i]; };

    const long long INF = LLONG_MAX / 4;
    vector<long long> dp((size_t)n * n, 0);
    auto at = [&](int i, int j) -> long long& { return dp[(size_t)i * n + j]; };

    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            long long best = INF;
            for (int k = i; k < j; k++) best = min(best, at(i, k) + at(k + 1, j));
            at(i, j) = best + sum(i, j);
        }
    }

    printf("%lld\n", at(0, n - 1));
    return 0;
}
