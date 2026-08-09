// Reference - m18 / Q29 Bandwidth Throttle
// Binary search the finishing time; feasibility is a single greedy pass that
// counts how few links a deadline T needs.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long k;
    if (scanf("%d %lld", &n, &k) != 2) return 0;
    vector<long long> s(n);
    long long tot = 0, mx = 0;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &s[i]);
        tot += s[i];
        mx = max(mx, s[i]);
    }

    auto feasible = [&](long long T) {
        long long used = 1, cur = 0;
        for (int i = 0; i < n; i++) {
            if (cur + s[i] <= T) cur += s[i];
            else { used++; cur = s[i]; if (used > k) return false; }
        }
        return used <= k;
    };

    long long lo = mx, hi = tot;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (feasible(mid)) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
