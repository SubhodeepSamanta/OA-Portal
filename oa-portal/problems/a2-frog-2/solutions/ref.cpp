// Reference - a2 / Q90 Frog 2 (AtCoder EDPC B)
// cost[i] = min over the previous K stones of cost[j] + |h[i]-h[j]|.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> h(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &h[i]);

    const long long INF = LLONG_MAX / 4;
    vector<long long> cost(n + 1, INF);
    cost[1] = 0;
    for (int i = 2; i <= n; i++) {
        for (int j = max(1, i - k); j < i; j++) {      // clamp the lower end
            cost[i] = min(cost[i], cost[j] + llabs(h[i] - h[j]));
        }
    }
    printf("%lld\n", cost[n]);
    return 0;
}
