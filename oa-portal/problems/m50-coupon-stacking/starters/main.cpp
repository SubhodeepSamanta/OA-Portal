#include <bits/stdc++.h>
using namespace std;

/* Return the minimum total spend in PAISE (1 rupee = 100 paise). */
long long minSpendPaise(const vector<long long>& prices, const vector<long long>& discounts) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> prices(n), discounts(m);
    for (auto &x : prices) scanf("%lld", &x);
    for (auto &x : discounts) scanf("%lld", &x);

    printf("%lld\n", minSpendPaise(prices, discounts));
    return 0;
}
