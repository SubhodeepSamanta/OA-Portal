// Brute force - m88 / Q209
//
// tiny  : check every reading in the range digit by digit. The definition.
// larger: count by construction instead - for each length shorter than the
//         bound, 9 * 9^(len-1) clean numbers exist; for the bound's own
//         length, walk its prefixes. Different reasoning from the memoised
//         descent, and needed because "1 1000000000000000000" is 21 bytes.
#include <bits/stdc++.h>
using namespace std;

static bool clean(long long v) {
    string s = to_string(v);
    for (size_t i = 1; i < s.size(); i++) if (s[i] == s[i - 1]) return false;
    return true;
}

// how many clean numbers in [1, bound]
static long long countUpTo(long long bound) {
    if (bound <= 0) return 0;
    string D = to_string(bound);
    int L = (int)D.size();

    long long total = 0;
    // every number strictly shorter than the bound
    for (int len = 1; len < L; len++) {
        long long ways = 9;
        for (int i = 1; i < len; i++) ways *= 9;
        total += ways;
    }
    // numbers of the bound's own length, prefix by prefix
    int prev = -1;
    for (int i = 0; i < L; i++) {
        int cap = D[i] - '0';
        for (int d = (i == 0 ? 1 : 0); d < cap; d++) {
            if (d == prev) continue;
            long long ways = 1;
            for (int r = i + 1; r < L; r++) ways *= 9;
            total += ways;
        }
        if (cap == prev) return total;             // the bound itself is dirty
        prev = cap;
    }
    return total + 1;                              // the bound itself is clean
}

int main() {
    long long lo, hi;
    if (scanf("%lld %lld", &lo, &hi) != 2) return 0;

    if (hi - lo <= 2000000 && hi <= 200000000LL) {
        long long c = 0;
        for (long long v = lo; v <= hi; v++) if (clean(v)) c++;
        printf("%lld\n", c);
        return 0;
    }

    printf("%lld\n", countUpTo(hi) - countUpTo(lo - 1));
    return 0;
}
