#include <bits/stdc++.h>
using namespace std;

long long maxOddSlotTotal(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << maxOddSlotTotal(a) << '\n';
    return 0;
}
