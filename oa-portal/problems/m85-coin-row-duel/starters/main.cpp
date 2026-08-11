#include <bits/stdc++.h>
using namespace std;

long long firstPlayerTotal(const vector<long long>& v) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> v(n);
    for (auto &x : v) scanf("%lld", &x);

    printf("%lld\n", firstPlayerTotal(v));
    return 0;
}
