// Reference - m11 / Q51 Log Line Normalizer, O(n)
//
// Fix the split point i: everything before i becomes the 'a' run, everything
// from i on becomes the 'b' run. Then the deletions are forced -
//     every 'b' before i, plus every 'a' from i onward.
// Sweep i from 0..n keeping running counts. Require at least one 'a' kept
// before the split and at least one 'b' kept after it.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    if (!(cin >> s)) return 0;
    int n = (int)s.size();

    long long totalA = 0, totalB = 0;
    for (char c : s) (c == 'a' ? totalA : totalB)++;

    long long best = LLONG_MAX;
    long long aBefore = 0, bBefore = 0;

    for (int i = 0; i <= n; i++) {
        long long keptA = aBefore;                 // a's kept in the prefix
        long long keptB = totalB - bBefore;        // b's kept in the suffix
        if (keptA >= 1 && keptB >= 1) {
            long long cost = bBefore + (totalA - aBefore);
            best = min(best, cost);
        }
        if (i < n) { if (s[i] == 'a') aBefore++; else bBefore++; }
    }

    cout << (best == LLONG_MAX ? -1 : best) << '\n';
    return 0;
}
