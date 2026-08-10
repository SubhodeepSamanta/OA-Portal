// Brute force - m45 / Q132
//
// tiny  : every one of the 2^n assignments, scored directly. Nothing assumed
//         about subset sums or halves - this is what proves the reframing.
// larger: a plain boolean reachability table, filled cell by cell. Different
//         code from the reference's bitset shift, and necessary because these
//         inputs are tiny in BYTES: 100 ones is under 250 characters, so the
//         stress harness happily hands n=100 to the enumerator - where
//         `1 << 100` is undefined behaviour, not merely slow.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n);
    int total = 0;
    for (int i = 0; i < n; i++) { scanf("%d", &a[i]); total += a[i]; }

    if (n == 1) { printf("-1\n"); return 0; }

    int best = INT_MAX;

    if (n <= 20) {
        for (int mask = 1; mask < (1 << n) - 1; mask++) {   // both groups non-empty
            int s = 0;
            for (int i = 0; i < n; i++) if (mask & (1 << i)) s += a[i];
            best = min(best, abs(total - 2 * s));
        }
        printf("%d\n", best == INT_MAX ? -1 : best);
        return 0;
    }

    vector<char> reach(total + 1, 0);
    reach[0] = 1;
    for (int i = 0; i < n; i++)
        for (int s = total - a[i]; s >= 0; s--)
            if (reach[s]) reach[s + a[i]] = 1;

    for (int x = 1; x < total; x++)
        if (reach[x]) best = min(best, abs(total - 2 * x));

    printf("%d\n", best == INT_MAX ? -1 : best);
    return 0;
}
