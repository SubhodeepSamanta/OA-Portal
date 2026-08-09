// Brute force - m11 / Q51.
// For small inputs, enumerate EVERY subset of kept characters and test whether
// it matches a+b+. Genuinely independent of the reference's split-point idea.
// Falls back to an O(n^2) recount for larger inputs.
#include <bits/stdc++.h>
using namespace std;

static bool wellFormed(const string &t) {
    if (t.size() < 2) return false;
    size_t i = 0;
    while (i < t.size() && t[i] == 'a') i++;
    if (i == 0) return false;                 // needs at least one 'a'
    size_t j = i;
    while (j < t.size() && t[j] == 'b') j++;
    return j == t.size() && j > i;            // rest all 'b', at least one
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    if (!(cin >> s)) return 0;
    int n = (int)s.size();

    if (n <= 18) {
        int best = INT_MAX;
        for (int mask = 0; mask < (1 << n); mask++) {
            string t;
            int del = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) t += s[i];
                else del++;
            }
            if (wellFormed(t)) best = min(best, del);
        }
        cout << (best == INT_MAX ? -1 : best) << '\n';
        return 0;
    }

    // larger: recount each split from scratch
    long long best = LLONG_MAX;
    for (int i = 0; i <= n; i++) {
        long long keptA = 0, delB = 0, keptB = 0, delA = 0;
        for (int k = 0; k < i; k++) (s[k] == 'a' ? keptA : delB)++;
        for (int k = i; k < n; k++) (s[k] == 'b' ? keptB : delA)++;
        if (keptA >= 1 && keptB >= 1) best = min(best, delA + delB);
    }
    cout << (best == LLONG_MAX ? -1 : best) << '\n';
    return 0;
}
