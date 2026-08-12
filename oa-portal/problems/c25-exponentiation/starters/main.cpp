#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

// a^b mod 1e9+7. Note 0^0 is defined as 1, and products reach ~1e18.
long long power(long long a, long long b) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    string out;
    for (int i = 0; i < n; i++) {
        long long a, b;
        scanf("%lld %lld", &a, &b);
        out += to_string(power(a, b));
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
