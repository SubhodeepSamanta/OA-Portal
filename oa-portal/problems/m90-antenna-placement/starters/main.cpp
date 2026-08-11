#include <bits/stdc++.h>
using namespace std;

// Minimum of sum (x[i] - p)^2 over integer positions p.
long long minTotalCost(const vector<long long>& x) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> x(n);
    for (auto &v : x) scanf("%lld", &v);

    printf("%lld\n", minTotalCost(x));
    return 0;
}
