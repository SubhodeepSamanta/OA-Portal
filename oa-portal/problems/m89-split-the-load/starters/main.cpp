#include <bits/stdc++.h>
using namespace std;

long long minDifference(const vector<long long>& w) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> w(n);
    for (auto &x : w) scanf("%lld", &x);

    printf("%lld\n", minDifference(w));
    return 0;
}
