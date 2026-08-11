// Reference - m88 / Q209 Odometer Count
// Digit DP over (position, previous digit, tight, started), counting clean
// numbers up to a bound; answer is count(R) - count(L-1).
#include <bits/stdc++.h>
using namespace std;

string D;
int L;
long long memo[20][11][2][2];
bool seen[20][11][2][2];

long long go(int pos, int prev, int tight, int started) {
    // The all-zero build represents 0, which is outside [1, R] but appears in
    // both countUpTo calls and cancels in the subtraction.
    if (pos == L) return 1;
    if (seen[pos][prev][tight][started]) return memo[pos][prev][tight][started];
    seen[pos][prev][tight][started] = true;

    int hi = tight ? D[pos] - '0' : 9;
    long long total = 0;
    for (int d = 0; d <= hi; d++) {
        int nowStarted = started || d > 0;
        if (started && d == prev) continue;        // adjacent repeat
        int nextPrev = nowStarted ? d : 10;        // 10 means "nothing placed yet"
        total += go(pos + 1, nextPrev, (tight && d == hi) ? 1 : 0, nowStarted);
    }
    return memo[pos][prev][tight][started] = total;
}

long long countUpTo(long long bound) {
    if (bound < 0) return 0;
    D = to_string(bound);
    L = (int)D.size();
    memset(seen, 0, sizeof(seen));
    return go(0, 10, 1, 0);                        // includes 0 itself
}

int main() {
    long long lo, hi;
    if (scanf("%lld %lld", &lo, &hi) != 2) return 0;
    printf("%lld\n", countUpTo(hi) - countUpTo(lo - 1));
    return 0;
}
