// Brute force - m81 / Q184
// Every pair, tested directly. No counting over the mask universe.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, b;
    if (scanf("%d %d", &n, &b) != 2) return 0;
    int FULL = (1 << b) - 1;
    vector<int> mask(n);
    for (int i = 0; i < n; i++) scanf("%d", &mask[i]);

    long long pairs = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if ((mask[i] | mask[j]) == FULL) pairs++;

    printf("%lld\n", pairs);
    return 0;
}
