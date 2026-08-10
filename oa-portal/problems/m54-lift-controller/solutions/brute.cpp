// Brute force - m54 / Q149
//
// The rule written out the long way: to find when a lift would arrive, count
// the seconds one at a time rather than taking an absolute difference, and
// pick the winner with an explicit scan that keeps the first of any tie.
//
// This problem is about reading the specification, not about complexity, so
// the brute deliberately restates it rather than using a second algorithm.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int f, e, n;
    if (scanf("%d %d %d", &f, &e, &n) != 3) return 0;

    vector<long long> freeAt(e, 0), at(e, 1);
    string out;

    for (int i = 0; i < n; i++) {
        long long t, from, to;
        scanf("%lld %lld %lld", &t, &from, &to);

        vector<long long> arrive(e);
        for (int j = 0; j < e; j++) {
            long long start = freeAt[j] > t ? freeAt[j] : t;
            long long floors = 0;
            for (long long p = at[j]; p != from; p += (from > p ? 1 : -1)) floors++;
            arrive[j] = start + floors;
        }

        int best = 0;
        for (int j = 1; j < e; j++) if (arrive[j] < arrive[best]) best = j;

        long long ride = 0;
        for (long long p = from; p != to; p += (to > p ? 1 : -1)) ride++;

        long long done = arrive[best] + ride;
        freeAt[best] = done;
        at[best] = to;

        out += to_string(done);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
