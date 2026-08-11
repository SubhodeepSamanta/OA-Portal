// Reference - c18 / Q102 Book Shop (CSES 1158)
// 0/1 knapsack with a rolling array, budget iterated DOWNWARDS so each book
// is considered at most once.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x;
    if (scanf("%d %d", &n, &x) != 2) return 0;
    vector<int> h(n), s(n);
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    for (int i = 0; i < n; i++) scanf("%d", &s[i]);

    vector<int> best(x + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int c = x; c >= h[i]; c--) {
            int cand = best[c - h[i]] + s[i];
            if (cand > best[c]) best[c] = cand;
        }
    }
    printf("%d\n", best[x]);
    return 0;
}
