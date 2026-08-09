#include <bits/stdc++.h>
using namespace std;

int longestAisle(const vector<int>& ids) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<int> ids(n);
    for (auto &x : ids) cin >> x;

    cout << longestAisle(ids) << '\n';
    return 0;
}
