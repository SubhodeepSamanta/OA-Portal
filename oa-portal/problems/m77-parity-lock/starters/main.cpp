#include <bits/stdc++.h>
using namespace std;

bool canEqualise(const vector<long long>& a) {
    // write your code here

    return false;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%s\n", canEqualise(a) ? "YES" : "NO");
    return 0;
}
