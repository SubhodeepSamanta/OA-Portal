// Reference - m60 / Q155 Feed Dedup
// Canonical form = the tally of the 26 letters. Two posts are anagrams
// exactly when their tallies match, so count distinct tallies.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    set<array<int, 26>> seen;
    string line;
    for (int i = 0; i < n; i++) {
        if (!getline(cin, line)) line.clear();
        array<int, 26> tally{};
        tally.fill(0);
        for (char ch : line) {
            if (ch >= 'a' && ch <= 'z') tally[ch - 'a']++;
            else if (ch >= 'A' && ch <= 'Z') tally[ch - 'A']++;
        }
        seen.insert(tally);
    }

    cout << seen.size() << '\n';
    return 0;
}
