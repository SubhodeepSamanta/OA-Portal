// Reference - c24 / Q170 Counting Divisors (CSES 1713)
// One harmonic sieve over the whole universe x <= 1e6, then O(1) per query.
#include <bits/stdc++.h>
using namespace std;

static const int LIMIT = 1000000;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    static int divisors[LIMIT + 1];
    for (int d = 1; d <= LIMIT; d++)
        for (int m = d; m <= LIMIT; m += d)
            divisors[m]++;

    string out;
    out.reserve(n * 4);
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        out += to_string(divisors[x]);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
