// Brute force - m76 / Q175
// Trial division on every number in every range. No sieve, no prefix sums.
#include <bits/stdc++.h>
using namespace std;

bool isPrime(int v) {
    if (v < 2) return false;
    for (int d = 2; (long long)d * d <= v; d++) if (v % d == 0) return false;
    return true;
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    string out;
    for (int i = 0; i < q; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        int c = 0;
        for (int v = l; v <= r; v++) if (isPrime(v)) c++;
        out += to_string(c);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
