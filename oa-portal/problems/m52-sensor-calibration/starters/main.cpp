#include <bits/stdc++.h>
using namespace std;

int minRewrites(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%d\n", minRewrites(a));
    return 0;
}
