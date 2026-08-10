#include <bits/stdc++.h>
using namespace std;

/* assets[i] = {current, target, fee}. Return -1 if the targets are unreachable. */
long long minRebalanceCost(const vector<array<long long,3>>& assets) {
    // write your code here

    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,3>> assets(n);
    for (auto &a : assets) scanf("%lld %lld %lld", &a[0], &a[1], &a[2]);

    printf("%lld\n", minRebalanceCost(assets));
    return 0;
}
