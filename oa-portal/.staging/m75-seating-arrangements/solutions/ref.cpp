// Reference - m75 / Q174 Seating Arrangements
// Factorials once, inverse factorials by one modular power then walking back.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;
const int MAXN = 200005;

long long powMod(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    vector<long long> fact(MAXN), inv(MAXN);
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i - 1] * i % MOD;
    inv[MAXN - 1] = powMod(fact[MAXN - 1], MOD - 2);
    for (int i = MAXN - 1; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;

    int q;
    if (scanf("%d", &q) != 1) return 0;
    string out;
    out.reserve((size_t)q * 11);
    for (int i = 0; i < q; i++) {
        int n, r;
        scanf("%d %d", &n, &r);
        long long ans = (r > n) ? 0 : fact[n] * inv[r] % MOD * inv[n - r] % MOD;
        out += to_string(ans);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
