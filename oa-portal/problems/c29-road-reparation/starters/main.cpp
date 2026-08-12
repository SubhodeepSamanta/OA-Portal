#include <bits/stdc++.h>
using namespace std;

long long minRepairCost(int n, const vector<array<int, 3>>& roads) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int, 3>> roads(m);
    for (auto &r : roads) scanf("%d %d %d", &r[0], &r[1], &r[2]);

    long long ans = minRepairCost(n, roads);
    if (ans < 0) printf("IMPOSSIBLE\n");
    else printf("%lld\n", ans);
    return 0;
}
