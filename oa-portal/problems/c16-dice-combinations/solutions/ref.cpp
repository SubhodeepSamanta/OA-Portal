// Reference - c16 / Q100 Dice Combinations (CSES 1633)
// ways[s] = sum of ways[s-1..s-6], with ways[0] = 1 (the empty sequence).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    const long long MOD = 1000000007LL;

    vector<long long> ways(n + 1, 0);
    ways[0] = 1;
    for (int s = 1; s <= n; s++) {
        long long acc = 0;
        for (int j = 1; j <= 6 && j <= s; j++) acc += ways[s - j];
        ways[s] = acc % MOD;          // reduce every step: six terms overflow fast
    }
    printf("%lld\n", ways[n]);
    return 0;
}
