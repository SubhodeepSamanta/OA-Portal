#include <bits/stdc++.h>
using namespace std;

long long minFusionCost(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    printf("%lld\n", minFusionCost(a));
    return 0;
}
