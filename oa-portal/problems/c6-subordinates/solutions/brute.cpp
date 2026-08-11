// Brute force - c6 / Q59
// For every employee, walk the whole company and count who has them as an
// ancestor by climbing parent links. No traversal order, no recurrence.
// O(n^2) at worst, so only usable on small inputs.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> par(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &par[i]);

    vector<int> cnt(n + 1, 0);
    for (int v = 2; v <= n; v++) {
        for (int a = par[v]; a != 0; a = par[a]) cnt[a]++;   // every ancestor of v
    }

    for (int i = 1; i <= n; i++) printf("%d%c", cnt[i], i == n ? '\n' : ' ');
    return 0;
}
