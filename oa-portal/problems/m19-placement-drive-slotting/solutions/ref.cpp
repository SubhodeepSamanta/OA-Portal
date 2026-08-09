// Reference - m19 / Q30 Placement Drive Slotting
// Pad to exactly 2m slots with zero-length "no student" entries, sort, then
// pair the i-th smallest with the i-th largest.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> t((size_t)2 * m, 0);
    for (int i = 0; i < n; i++) scanf("%lld", &t[i]);
    sort(t.begin(), t.end());

    long long best = 0;
    int sz = 2 * m;
    for (int i = 0; i < m; i++) best = max(best, t[i] + t[sz - 1 - i]);
    printf("%lld\n", best);
    return 0;
}
