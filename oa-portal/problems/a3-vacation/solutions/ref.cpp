// Reference - a3 / Q91 Vacation (AtCoder EDPC C)
// Carry yesterday's activity in the state: three rolling values are enough.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    long long bestA = 0, bestB = 0, bestC = 0;
    for (int i = 0; i < n; i++) {
        long long a, b, c;
        scanf("%lld %lld %lld", &a, &b, &c);
        long long nA = a + max(bestB, bestC);
        long long nB = b + max(bestA, bestC);
        long long nC = c + max(bestA, bestB);
        bestA = nA; bestB = nB; bestC = nC;
    }
    printf("%lld\n", max(bestA, max(bestB, bestC)));
    return 0;
}
