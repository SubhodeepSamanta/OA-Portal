// Reference - m87 / Q208 Population Model
// (p(t), p(t-1)) = [[a,b],[1,0]] * (p(t-1), p(t-2)), so p(T) comes from that
// matrix raised to T-1 in O(log T).
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

struct Mat { long long m[2][2]; };

Mat mul(const Mat &x, const Mat &y) {
    Mat r;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++) {
            long long s = 0;
            for (int k = 0; k < 2; k++) s = (s + x.m[i][k] * y.m[k][j]) % MOD;
            r.m[i][j] = s;
        }
    return r;
}

int main() {
    long long p0, p1, a, b, T;
    if (scanf("%lld %lld %lld %lld %lld", &p0, &p1, &a, &b, &T) != 5) return 0;
    p0 %= MOD; p1 %= MOD; a %= MOD; b %= MOD;

    if (T == 0) { printf("%lld\n", p0); return 0; }
    if (T == 1) { printf("%lld\n", p1); return 0; }

    Mat base;
    base.m[0][0] = a; base.m[0][1] = b;
    base.m[1][0] = 1; base.m[1][1] = 0;

    Mat res;
    res.m[0][0] = 1; res.m[0][1] = 0;
    res.m[1][0] = 0; res.m[1][1] = 1;

    long long e = T - 1;
    while (e) {
        if (e & 1) res = mul(res, base);
        base = mul(base, base);
        e >>= 1;
    }

    // res * (p1, p0) gives (p(T), p(T-1))
    printf("%lld\n", (res.m[0][0] * p1 + res.m[0][1] * p0) % MOD);
    return 0;
}
