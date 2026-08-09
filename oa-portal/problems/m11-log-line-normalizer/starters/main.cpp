#include <bits/stdc++.h>
using namespace std;

long long minDeletions(const string& s) {
    // write your code here
    // return -1 if the log can never be made well-formed

    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    if (!(cin >> s)) return 0;

    cout << minDeletions(s) << '\n';
    return 0;
}
