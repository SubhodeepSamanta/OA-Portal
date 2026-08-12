// Brute force - c28 / Q169
// Every pair, gcd computed directly. No sieve, no divisor counting.
// O(n^2 log x), so small inputs only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> x(n);
    for (int i = 0; i < n; i++) scanf("%d", &x[i]);

    int best = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            best = max(best, (int)__gcd(x[i], x[j]));

    printf("%d\n", best);
    return 0;
}
