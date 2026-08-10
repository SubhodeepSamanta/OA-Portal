// Reference - m74 / Q173 Gear Ratios
// lcm(a,b)/a simplifies to b/gcd(a,b), so no large intermediate ever exists.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;
    long long g = __gcd(a, b);
    printf("%lld\n", b / g);
    return 0;
}
