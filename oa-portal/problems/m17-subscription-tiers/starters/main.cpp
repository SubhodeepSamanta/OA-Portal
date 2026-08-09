#include <bits/stdc++.h>
using namespace std;

long long maxRevenue(vector<long long> w, int k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> w(n);
    for (auto &x : w) cin >> x;

    cout << maxRevenue(w, k) << '\n';
    return 0;
}
