#include <bits/stdc++.h>
using namespace std;

long long cheapestWithDiscount(int n, const vector<int>& from, const vector<int>& to,
                               const vector<long long>& cost) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> from(m), to(m);
    vector<long long> cost(m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &from[i], &to[i], &cost[i]);

    printf("%lld\n", cheapestWithDiscount(n, from, to, cost));
    return 0;
}
