// Brute force - m60 / Q155
// Reduce each post to its sorted letters and compare every pair directly.
// No tally, no set - O(n^2) string comparisons.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    vector<string> canon;
    string line;
    for (int i = 0; i < n; i++) {
        if (!getline(cin, line)) line.clear();
        string letters;
        for (char ch : line) {
            if (ch >= 'a' && ch <= 'z') letters += ch;
            else if (ch >= 'A' && ch <= 'Z') letters += (char)(ch - 'A' + 'a');
        }
        sort(letters.begin(), letters.end());
        canon.push_back(letters);
    }

    int distinct = 0;
    for (int i = 0; i < n; i++) {
        bool seenBefore = false;
        for (int j = 0; j < i && !seenBefore; j++) if (canon[j] == canon[i]) seenBefore = true;
        if (!seenBefore) distinct++;
    }

    cout << distinct << '\n';
    return 0;
}
