// Brute force - m77 / Q176
//
// Search the target value directly. For each candidate T, the increments
// needed are d[i] = T - a[i]; the operations can deliver them exactly when
// the total is even and no single counter needs more than half of it.
// No parity case analysis anywhere - that is what this checks.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    if (n == 1) { printf("YES\n"); return 0; }

    long long hi = *max_element(a.begin(), a.end());
    for (long long T = hi; T <= hi + 4LL * n + 400; T++) {
        long long total = 0, worst = 0;
        for (int i = 0; i < n; i++) { total += T - a[i]; worst = max(worst, T - a[i]); }
        if (total % 2 == 0 && worst * 2 <= total) { printf("YES\n"); return 0; }
    }
    printf("NO\n");
    return 0;
}
