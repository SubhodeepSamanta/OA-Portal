#include <bits/stdc++.h>
using namespace std;

int longestQualifyingRun(const vector<long long>& a, long long t) {
    // write your code here
    // return 0 if no run averages at least t

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long t;
    if (!(cin >> n >> t)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << longestQualifyingRun(a, t) << '\n';
    return 0;
}
