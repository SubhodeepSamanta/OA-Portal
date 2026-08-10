// Brute force - m74 / Q173
//
// tiny  : step the teeth one at a time until both gears are upright again.
//         No gcd, no lcm - the definition played out literally.
// larger: 128-bit lcm, then divide. Correct for any input this judge uses,
//         and still a different route from the reference's cancellation.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;

    // 1000 x 1000 coprime is only a million ticks; 100000 x 100000 would be
    // 10^10, which is the "small in bytes, enormous to run" trap again
    if (a <= 1000 && b <= 1000) {
        for (long long k = 1;; k++)
            if (k % a == 0 && k % b == 0) { printf("%lld\n", k / a); return 0; }
    }

    __int128 g = __gcd(a, b);
    __int128 l = (__int128)a / g * (__int128)b;
    printf("%lld\n", (long long)(l / a));
    return 0;
}
