// Brute force - m52 / Q139
//
// tiny  : try every subset of positions to keep, checking directly that the
//         gaps can be filled with strictly increasing integers. Assumes
//         nothing about the a[i] - i transform.
// larger: an O(n^2) longest non-decreasing subsequence, no binary search.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    if (n <= 18) {
        int bestKeep = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            vector<int> idx;
            for (int i = 0; i < n; i++) if (mask & (1 << i)) idx.push_back(i);
            bool ok = true;
            for (size_t t = 0; t + 1 < idx.size(); t++) {
                int i = idx[t], j = idx[t + 1];
                // need j-i-1 distinct integers strictly between a[i] and a[j]
                if (a[j] - a[i] < j - i) { ok = false; break; }
            }
            if (ok) bestKeep = max(bestKeep, (int)idx.size());
        }
        printf("%d\n", n - bestKeep);
        return 0;
    }

    vector<long long> b(n);
    for (int i = 0; i < n; i++) b[i] = a[i] - i;
    vector<int> dp(n, 1);
    int best = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++)
            if (b[j] <= b[i]) dp[i] = max(dp[i], dp[j] + 1);
        best = max(best, dp[i]);
    }
    printf("%d\n", n - best);
    return 0;
}
