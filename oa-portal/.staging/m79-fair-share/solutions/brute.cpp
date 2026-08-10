// Brute force - m79 / Q178
//
// tiny  : hand out the items one at a time, always to whoever currently has
//         the fewest, then sort. No formula at all.
// larger: give everyone the base amount, then top up the LAST few - built in
//         a different order from the reference, and needed because a tiny
//         input can still name 10^18 items.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m;
    if (scanf("%lld %lld", &n, &m) != 2) return 0;

    vector<long long> share((size_t)n, 0);

    if (m <= 200000) {
        for (long long k = 0; k < m; k++) {
            size_t who = 0;
            for (size_t i = 1; i < share.size(); i++) if (share[i] < share[who]) who = i;
            share[who]++;
        }
        sort(share.begin(), share.end());
    } else {
        long long base = m / n, extra = m % n;
        for (size_t i = 0; i < share.size(); i++) share[i] = base;
        for (long long i = 0; i < extra; i++) share[share.size() - 1 - (size_t)i] += 1;
    }

    string out;
    for (size_t i = 0; i < share.size(); i++) {
        if (i) out += ' ';
        out += to_string(share[i]);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
