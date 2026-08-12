// Brute force - a1 / Q89
// Explores every jump sequence by recursion with no memo - it really does try
// all the routes. Exponential, so small N only; larger inputs fall back to a
// BACKWARD scan (cheapest cost from stone i onwards), which fills the table in
// the opposite direction from the reference.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> h;

long long explore(int i) {
    if (i == n) return 0;
    long long best = LLONG_MAX;
    if (i + 1 <= n) best = min(best, llabs(h[i] - h[i + 1]) + explore(i + 1));
    if (i + 2 <= n) best = min(best, llabs(h[i] - h[i + 2]) + explore(i + 2));
    return best;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    h.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &h[i]);

    if (n <= 25) { printf("%lld\n", explore(1)); return 0; }

    vector<long long> from(n + 2, LLONG_MAX / 4);
    from[n] = 0;
    for (int i = n - 1; i >= 1; i--) {
        long long best = from[i + 1] + llabs(h[i] - h[i + 1]);
        if (i + 2 <= n) best = min(best, from[i + 2] + llabs(h[i] - h[i + 2]));
        from[i] = best;
    }
    printf("%lld\n", from[1]);
    return 0;
}
