#include <bits/stdc++.h>
using namespace std;

long long largestBillboard(vector<long long> h) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (auto &x : h) cin >> x;

    cout << largestBillboard(h) << '\n';
    return 0;
}
