// Brute force - m73 / Q168
// Try every block, reverse it, and check. Assumes nothing about where the
// failures are; reports the same block the reference would by scanning in an
// order that finds the smallest l, then the smallest r.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    auto increasing = [&](const vector<long long> &v) {
        for (int i = 0; i + 1 < n; i++) if (v[i] >= v[i + 1]) return false;
        return true;
    };

    if (increasing(a)) { printf("1 1\n"); return 0; }

    for (int l = 0; l < n; l++)
        for (int r = l; r < n; r++) {
            vector<long long> b(a);
            reverse(b.begin() + l, b.begin() + r + 1);
            if (increasing(b)) { printf("%d %d\n", l + 1, r + 1); return 0; }
        }

    printf("-1\n");
    return 0;
}
