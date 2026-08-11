// Brute force - m86 / Q207
//
// tiny  : step the machine one second at a time. The definition, nothing else.
// larger: binary lifting over the successor table - a different route to the
//         same answer, and necessary because "1 0 1000000000000000000" is a
//         short line that would otherwise ask for 10^18 steps.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, s, T;
    if (scanf("%lld %lld %lld", &n, &s, &T) != 3) return 0;
    vector<int> f(n);
    for (long long i = 0; i < n; i++) scanf("%d", &f[i]);

    if (T <= 2000000) {
        long long cur = s;
        for (long long t = 0; t < T; t++) cur = f[cur];
        printf("%lld\n", cur);
        return 0;
    }

    const int LOG = 60;
    vector<vector<int>> up(LOG, vector<int>(n));
    for (long long i = 0; i < n; i++) up[0][i] = f[i];
    for (int j = 1; j < LOG; j++)
        for (long long i = 0; i < n; i++) up[j][i] = up[j - 1][up[j - 1][i]];

    long long cur = s;
    for (int j = 0; j < LOG; j++)
        if ((T >> j) & 1LL) cur = up[j][cur];

    printf("%lld\n", cur);
    return 0;
}
