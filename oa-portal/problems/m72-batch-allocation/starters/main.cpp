#include <bits/stdc++.h>
using namespace std;

long long minTotalSpread(vector<long long> scores, int k) {
    // write your code here

    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> scores(n);
    for (auto &x : scores) scanf("%lld", &x);

    printf("%lld\n", minTotalSpread(scores, k));
    return 0;
}
