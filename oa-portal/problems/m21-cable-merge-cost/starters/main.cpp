#include <bits/stdc++.h>
using namespace std;

long long minSpliceCost(vector<long long> L) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> L(n);
    for (auto &x : L) cin >> x;

    cout << minSpliceCost(L) << '\n';
    return 0;
}
