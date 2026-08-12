// Reference - c25 / Q171 Exponentiation (CSES 1095)
// Binary exponentiation. Products reach ~1e18, so everything stays 64-bit.
#include <bits/stdc++.h>
using namespace std;

static const long long MOD = 1000000007LL;

long long power(long long base, long long exp) {
    long long result = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp & 1) result = result * base % MOD;
        base = base * base % MOD;
        exp >>= 1;
    }
    return result;                       // exp == 0 falls straight through as 1
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    string out;
    out.reserve(n * 11);
    for (int i = 0; i < n; i++) {
        long long a, b;
        scanf("%lld %lld", &a, &b);
        out += to_string(power(a, b));
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
