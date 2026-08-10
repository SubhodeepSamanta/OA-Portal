#include <bits/stdc++.h>
using namespace std;

/* c[i][j] is the cost of putting server i+1 in position j+1. */
long long minTotalCost(const vector<vector<long long>>& c) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<long long>> c(n, vector<long long>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%lld", &c[i][j]);

    printf("%lld\n", minTotalCost(c));
    return 0;
}
