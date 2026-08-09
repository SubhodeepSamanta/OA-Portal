// Brute force - m22 / Q41
// Every span, running minimum. O(n^2), no stack anywhere.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> h(n);
    for (auto &x : h) scanf("%lld", &x);

    long long best = 0;
    for (int l = 0; l < n; l++) {
        long long mn = LLONG_MAX;
        for (int r = l; r < n; r++) {
            mn = min(mn, h[r]);
            best = max(best, mn * (long long)(r - l + 1));
        }
    }
    printf("%lld\n", best);
    return 0;
}
