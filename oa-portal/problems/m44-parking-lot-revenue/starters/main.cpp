#include <bits/stdc++.h>
using namespace std;

/* cars[i] = {arrival, departure}, already in non-decreasing arrival order. */
long long totalRevenue(int k, const vector<pair<long long,long long>>& cars) {
    // write your code here

    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<pair<long long,long long>> cars(n);
    for (auto &c : cars) scanf("%lld %lld", &c.first, &c.second);

    printf("%lld\n", totalRevenue(k, cars));
    return 0;
}
