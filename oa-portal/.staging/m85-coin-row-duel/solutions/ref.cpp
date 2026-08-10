// Reference - m85 / Q206 Coin Row Duel
// best[i][j] = most the player to move can collect from coins i..j.
// Taking an end leaves the opponent that sub-stretch; you get whatever they
// do not take, hence the stretch sum in the recurrence.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> v(n), pre(n + 1, 0);
    for (int i = 0; i < n; i++) { scanf("%lld", &v[i]); pre[i + 1] = pre[i] + v[i]; }
    auto sum = [&](int i, int j) { return j < i ? 0LL : pre[j + 1] - pre[i]; };

    vector<vector<long long>> best(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) best[i][i] = v[i];

    for (int len = 2; len <= n; len++)
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            long long takeLeft  = v[i] + (sum(i + 1, j) - best[i + 1][j]);
            long long takeRight = v[j] + (sum(i, j - 1) - best[i][j - 1]);
            best[i][j] = max(takeLeft, takeRight);
        }

    printf("%lld\n", best[0][n - 1]);
    return 0;
}
