// Reference - m45 / Q132 Fair Split
// Subset-sum reachability over a bitset, then pick the reachable total
// closest to half. Totals of 0 and `total` are exactly the empty and full
// subsets, so skipping them enforces "both heirs get something".
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n);
    int total = 0;
    for (int i = 0; i < n; i++) { scanf("%d", &a[i]); total += a[i]; }

    if (n == 1) { printf("-1\n"); return 0; }

    bitset<100001> reach;
    reach[0] = 1;
    for (int i = 0; i < n; i++) reach |= reach << a[i];

    int best = INT_MAX;
    for (int x = 1; x < total; x++)
        if (reach[x]) best = min(best, abs(total - 2 * x));

    printf("%d\n", best == INT_MAX ? -1 : best);
    return 0;
}
