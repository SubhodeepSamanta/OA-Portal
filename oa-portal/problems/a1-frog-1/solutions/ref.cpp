// Reference - a1 / Q89 Frog 1 (AtCoder EDPC A)
// cost[i] = min(cost[i-1] + |h[i]-h[i-1]|, cost[i-2] + |h[i]-h[i-2]|)
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> h(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &h[i]);

    vector<long long> cost(n + 1, 0);
    if (n >= 2) cost[2] = llabs(h[2] - h[1]);
    for (int i = 3; i <= n; i++) {
        cost[i] = min(cost[i - 1] + llabs(h[i] - h[i - 1]),
                      cost[i - 2] + llabs(h[i] - h[i - 2]));
    }
    printf("%lld\n", cost[n]);
    return 0;
}
