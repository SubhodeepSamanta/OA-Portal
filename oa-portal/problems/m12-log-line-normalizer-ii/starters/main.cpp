#include <bits/stdc++.h>
using namespace std;

long long minCost(const string& s, long long p, long long q, long long r) {
    // write your code here
    // return -1 if the log can never be made well-formed

    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    long long p, q, r;
    if (!(cin >> s)) return 0;
    cin >> p >> q >> r;

    cout << minCost(s, p, q, r) << '\n';
    return 0;
}
