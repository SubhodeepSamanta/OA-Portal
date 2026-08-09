#include <bits/stdc++.h>
using namespace std;

long long minBusiestLoad(vector<long long> t, int m) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<long long> t(n);
    for (auto &x : t) cin >> x;

    cout << minBusiestLoad(t, m) << '\n';
    return 0;
}
