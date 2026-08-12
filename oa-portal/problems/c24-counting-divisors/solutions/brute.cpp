// Brute force - c24 / Q170
// Trial division per query, counting d and x/d in pairs. No sieve, no shared
// precomputation - each query stands alone.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    string out;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        int count = 0;
        for (int d = 1; (long long)d * d <= x; d++) {
            if (x % d) continue;
            count += (d == x / d) ? 1 : 2;   // a perfect square's root counts once
        }
        out += to_string(count);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
