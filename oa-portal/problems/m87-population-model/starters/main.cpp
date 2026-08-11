#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

// p(t) = a * p(t-1) + b * p(t-2), returned modulo 1e9+7.
long long populationAt(long long p0, long long p1, long long a, long long b, long long T) {
    // write your code here

    return 0;
}

int main() {
    long long p0, p1, a, b, T;
    if (scanf("%lld %lld %lld %lld %lld", &p0, &p1, &a, &b, &T) != 5) return 0;

    printf("%lld\n", populationAt(p0, p1, a, b, T));
    return 0;
}
