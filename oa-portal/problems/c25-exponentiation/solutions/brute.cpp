// Brute force - c25 / Q171
// Multiplies one factor at a time - no squaring, no halving. Exponents reach
// 1e9 on inputs a few bytes long, so above a bound it falls back to squaring
// but reduces with __int128 instead, which still catches the overflow bug
// this problem is built around.
#include <bits/stdc++.h>
using namespace std;

static const long long MOD = 1000000007LL;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    string out;
    for (int i = 0; i < n; i++) {
        long long a, b;
        scanf("%lld %lld", &a, &b);

        if (b <= 2000000) {
            long long r = 1, base = a % MOD;
            for (long long s = 0; s < b; s++) r = r * base % MOD;
            out += to_string(r);
        } else {
            __int128 r = 1, base = a % MOD;
            long long e = b;
            while (e > 0) {
                if (e & 1) r = (r * base) % MOD;
                base = (base * base) % MOD;
                e >>= 1;
            }
            out += to_string((long long)r);
        }
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
