// Reference solution - m3 / Q4 Campus Gate Passes
// difference array + prefix sweep, O(m + q). Fast input for 3e6 integers.
#include <bits/stdc++.h>
using namespace std;

static char ibuf[1 << 26];

int main() {
    size_t ilen = fread(ibuf, 1, sizeof(ibuf) - 1, stdin);
    ibuf[ilen] = 0;
    char *p = ibuf;

    auto readInt = [&]() -> long long {
        while (*p && (*p < '0' || *p > '9') && *p != '-') p++;
        bool neg = false;
        if (*p == '-') { neg = true; p++; }
        long long v = 0;
        while (*p >= '0' && *p <= '9') { v = v * 10 + (*p - '0'); p++; }
        return neg ? -v : v;
    };

    int m = (int)readInt();
    int q = (int)readInt();

    vector<long long> diff((size_t)m + 2, 0);
    for (int i = 0; i < q; i++) {
        int l = (int)readInt();
        int r = (int)readInt();
        long long x = readInt();
        diff[l] += x;
        diff[r + 1] -= x;
    }

    long long cur = 0, best = -1;
    int bestGate = 1;
    for (int g = 1; g <= m; g++) {
        cur += diff[g];
        if (cur > best) { best = cur; bestGate = g; }
    }

    printf("%d %lld\n", bestGate, best);
    return 0;
}
