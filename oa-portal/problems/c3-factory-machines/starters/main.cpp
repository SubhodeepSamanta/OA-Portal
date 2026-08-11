#include <bits/stdc++.h>
using namespace std;

// k[i] is the seconds machine i needs per product. All machines run at once.
long long minTime(const vector<long long>& k, long long t) {
    // write your code here

    return 0;
}

int main() {
    long long n, t;
    if (scanf("%lld %lld", &n, &t) != 2) return 0;
    vector<long long> k(n);
    for (auto &x : k) scanf("%lld", &x);

    printf("%lld\n", minTime(k, t));
    return 0;
}
