// Reference - m50 / Q137 Coupon Stacking
// Total paid in paise = 100*sum(p) - sum(p*d) over the pairs, so maximise
// sum(p*d): sort both descending and pair in order (rearrangement inequality).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> p(n), d(m);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &p[i]); total += p[i]; }
    for (int j = 0; j < m; j++) scanf("%lld", &d[j]);

    sort(p.rbegin(), p.rend());
    sort(d.rbegin(), d.rend());

    long long saved = 0;
    int k = min(n, m);
    for (int i = 0; i < k; i++) saved += p[i] * d[i];

    printf("%lld\n", 100LL * total - saved);
    return 0;
}
