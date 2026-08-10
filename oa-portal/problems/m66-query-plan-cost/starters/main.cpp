#include <bits/stdc++.h>
using namespace std;

/* c[i] is leaf i+1's cost. The leaf order is fixed. */
long long minPlanCost(const vector<long long>& c) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> c(n);
    for (auto &x : c) scanf("%lld", &x);

    printf("%lld\n", minPlanCost(c));
    return 0;
}
