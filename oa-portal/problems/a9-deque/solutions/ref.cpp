// Reference - a9 / Q97 Deque (AtCoder EDPC L)
// dp[i][j] = the best MARGIN (my score minus yours, from here on) that the
// player to move can force on a[i..j]. Whoever moves takes a[i] or a[j] and
// then becomes the opponent, so their margin is subtracted.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    // flat n x n; 3000*3000 long longs is ~72 MB, inside the limit
    vector<long long> dp((size_t)n * n, 0);
    auto at = [&](int i, int j) -> long long& { return dp[(size_t)i * n + j]; };

    for (int i = 0; i < n; i++) at(i, i) = a[i];

    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            at(i, j) = max(a[i] - at(i + 1, j), a[j] - at(i, j - 1));
        }
    }

    printf("%lld\n", at(0, n - 1));
    return 0;
}
