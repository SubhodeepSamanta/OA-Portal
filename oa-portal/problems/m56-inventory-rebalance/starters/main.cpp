#include <bits/stdc++.h>
using namespace std;

/* Return the minimum cost, or -1 if the requirement cannot be met. */
long long minCost(const vector<long long>& s, long long m) {
    // write your code here

    return -1;
}

int main() {
    int n;
    long long m;
    if (scanf("%d %lld", &n, &m) != 2) return 0;
    vector<long long> s(n);
    for (auto &x : s) scanf("%lld", &x);

    printf("%lld\n", minCost(s, m));
    return 0;
}
