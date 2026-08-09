#include <bits/stdc++.h>
using namespace std;

int peakConcurrent(const vector<pair<int, int>>& meetings) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> meetings(n);
    for (auto &m : meetings) cin >> m.first >> m.second;

    cout << peakConcurrent(meetings) << '\n';
    return 0;
}
