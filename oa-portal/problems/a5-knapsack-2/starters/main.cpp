#include <bits/stdc++.h>
using namespace std;

long long maxValue(long long W, const vector<long long>& w, const vector<long long>& v) {
    // write your code here

    return 0;
}

int main() {
    int n; long long W;
    if (scanf("%d %lld", &n, &W) != 2) return 0;
    vector<long long> w(n), v(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &w[i], &v[i]);

    printf("%lld\n", maxValue(W, w, v));
    return 0;
}
