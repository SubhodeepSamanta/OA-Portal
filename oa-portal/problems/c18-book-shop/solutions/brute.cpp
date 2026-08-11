// Brute force - c18 / Q102
// Enumerates every subset of books and scores it directly. No table, no
// rolling array, no loop-direction subtlety - so it cannot share the
// reference's bug. Exponential, hence small n only; above the bound it falls
// back to the explicit two-dimensional table, which is still a different
// arrangement from the rolling one.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x;
    if (scanf("%d %d", &n, &x) != 2) return 0;
    vector<int> h(n), s(n);
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    for (int i = 0; i < n; i++) scanf("%d", &s[i]);

    if (n <= 20) {
        int best = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            int cost = 0, pages = 0;
            for (int i = 0; i < n; i++) {
                if (!(mask >> i & 1)) continue;
                cost += h[i];
                if (cost > x) break;
                pages += s[i];
            }
            if (cost <= x) best = max(best, pages);
        }
        printf("%d\n", best);
        return 0;
    }

    // two rows of the full table, indexed by book count then budget
    vector<int> prev(x + 1, 0), cur(x + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int c = 0; c <= x; c++) {
            cur[c] = prev[c];
            if (c >= h[i]) cur[c] = max(cur[c], prev[c - h[i]] + s[i]);
        }
        prev.swap(cur);
    }
    printf("%d\n", prev[x]);
    return 0;
}
