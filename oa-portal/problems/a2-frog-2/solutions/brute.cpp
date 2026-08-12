// Brute force - a2 / Q90
// Explores every jump sequence by recursion with no memo. Exponential, so
// small N only; larger inputs fall back to a BACKWARD scan, filling the table
// from stone N down instead of stone 1 up.
#include <bits/stdc++.h>
using namespace std;

int n, k;
vector<long long> h;

long long explore(int i) {
    if (i == n) return 0;
    long long best = LLONG_MAX / 4;
    for (int j = i + 1; j <= min(n, i + k); j++) {
        best = min(best, llabs(h[i] - h[j]) + explore(j));
    }
    return best;
}

int main() {
    if (scanf("%d %d", &n, &k) != 2) return 0;
    h.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &h[i]);

    if (n <= 18) { printf("%lld\n", explore(1)); return 0; }

    const long long INF = LLONG_MAX / 4;
    vector<long long> from(n + 1, INF);
    from[n] = 0;
    for (int i = n - 1; i >= 1; i--) {
        for (int j = i + 1; j <= min(n, i + k); j++) {
            from[i] = min(from[i], from[j] + llabs(h[i] - h[j]));
        }
    }
    printf("%lld\n", from[1]);
    return 0;
}
