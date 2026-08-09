#include <bits/stdc++.h>
using namespace std;

/* offers[i] = {u, v, p, q}: 1 unit of u becomes p/q units of v, one way only.
   Return true if you can end up holding more than 1 unit of currency 1. */
bool canProfit(int n, const vector<array<long long,4>>& offers) {
    // write your code here

    return false;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long,4>> offers(m);
    for (auto &o : offers) scanf("%lld %lld %lld %lld", &o[0], &o[1], &o[2], &o[3]);

    printf("%s\n", canProfit(n, offers) ? "YES" : "NO");
    return 0;
}
