#include <bits/stdc++.h>
using namespace std;

long long earliestFinish(vector<long long> s, long long k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> s(n);
    for (auto &x : s) cin >> x;

    cout << earliestFinish(s, k) << '\n';
    return 0;
}
