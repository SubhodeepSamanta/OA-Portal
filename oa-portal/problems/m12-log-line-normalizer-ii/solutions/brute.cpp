// Brute force - m12 / Q52.
// Enumerates every subset of kept characters, charges p for each removal
// before the first survivor, q for each after the last, r for the rest, and
// keeps the cheapest well-formed result. Completely independent of the
// reference's sweep. Small inputs only.
#include <bits/stdc++.h>
using namespace std;

static bool wellFormed(const string &t) {
    if (t.size() < 2) return false;
    size_t i = 0;
    while (i < t.size() && t[i] == 'a') i++;
    if (i == 0) return false;
    size_t j = i;
    while (j < t.size() && t[j] == 'b') j++;
    return j == t.size() && j > i;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    long long p, q, r;
    if (!(cin >> s)) return 0;
    cin >> p >> q >> r;
    int n = (int)s.size();

    const long long INF = LLONG_MAX / 4;
    long long best = INF;

    if (n > 20) { cout << -1 << '\n'; return 0; }   // guard: never used at this size

    for (int mask = 1; mask < (1 << n); mask++) {
        string t;
        int first = -1, last = -1;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) { t += s[i]; if (first < 0) first = i; last = i; }
        }
        if (!wellFormed(t)) continue;

        long long cost = 0;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) continue;
            if (i < first)      cost += p;          // trimmed from the front
            else if (i > last)  cost += q;          // trimmed from the back
            else                cost += r;          // spliced from inside
        }
        best = min(best, cost);
    }

    cout << (best >= INF ? -1 : best) << '\n';
    return 0;
}
