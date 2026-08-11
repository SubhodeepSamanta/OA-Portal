#include <bits/stdc++.h>
using namespace std;

// Split x into k contiguous pieces; minimise the largest piece sum.
long long minLargestPiece(const vector<long long>& x, long long k) {
    // write your code here

    return 0;
}

int main() {
    long long n, k;
    if (scanf("%lld %lld", &n, &k) != 2) return 0;
    vector<long long> x(n);
    for (auto &v : x) scanf("%lld", &v);

    printf("%lld\n", minLargestPiece(x, k));
    return 0;
}
