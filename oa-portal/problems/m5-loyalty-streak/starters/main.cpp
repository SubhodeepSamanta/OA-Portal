#include <bits/stdc++.h>
using namespace std;

int longestStreak(const vector<long long>& a, long long k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << longestStreak(a, k) << '\n';
    return 0;
}
