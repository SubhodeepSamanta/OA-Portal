// Brute force - a7 / Q94
// Enumerates every subsequence of s by bitmask and keeps the longest one that
// is also a subsequence of t. No table at all, so it cannot inherit the
// reference's reconstruction bug.
//
// Exponential, so above the bound it falls back to a SUFFIX table
// (suf[i][j] = LCS of s[i..] and t[j..]) rebuilt FORWARDS - the opposite
// orientation and the opposite walk direction from the reference.
#include <bits/stdc++.h>
using namespace std;

static bool isSubsequence(const string& sub, const string& of) {
    size_t k = 0;
    for (char c : of) {
        if (k < sub.size() && sub[k] == c) k++;
    }
    return k == sub.size();
}

int main() {
    static char bs[3005], bt[3005];
    if (scanf("%s", bs) != 1) return 0;
    if (scanf("%s", bt) != 1) return 0;
    string s = bs, t = bt;
    const int n = (int)s.size(), m = (int)t.size();

    if (n <= 18) {
        string best;
        for (int mask = 0; mask < (1 << n); mask++) {
            if (__builtin_popcount(mask) <= (int)best.size()) continue;
            string cand;
            for (int i = 0; i < n; i++) if (mask >> i & 1) cand += s[i];
            if (isSubsequence(cand, t)) best = cand;
        }
        printf("%s\n", best.c_str());
        return 0;
    }

    vector<int> suf((size_t)(n + 1) * (m + 1), 0);
    auto at = [&](int i, int j) -> int& { return suf[(size_t)i * (m + 1) + j]; };
    for (int i = n - 1; i >= 0; i--) {
        for (int j = m - 1; j >= 0; j--) {
            at(i, j) = (s[i] == t[j]) ? at(i + 1, j + 1) + 1
                                      : max(at(i + 1, j), at(i, j + 1));
        }
    }

    string res;
    res.reserve(at(0, 0));
    for (int i = 0, j = 0; i < n && j < m; ) {
        if (s[i] == t[j] && at(i, j) == at(i + 1, j + 1) + 1) { res += s[i]; i++; j++; }
        else if (at(i + 1, j) >= at(i, j + 1)) i++;
        else j++;
    }

    printf("%s\n", res.c_str());
    return 0;
}
