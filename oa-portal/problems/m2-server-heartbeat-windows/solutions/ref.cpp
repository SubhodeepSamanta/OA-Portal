// Reference solution - m2 / Q3 Server Heartbeat Windows
// monotonic deque, O(n), with hand-rolled fast IO for n = 1e6
#include <bits/stdc++.h>
using namespace std;

static char ibuf[1 << 25];
static char obuf[1 << 25];

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

    int n = (int)readInt();
    int w = (int)readInt();

    vector<int> a(n);
    for (int i = 0; i < n; i++) a[i] = (int)readInt();

    vector<int> dq(n);          // stores indices, values decreasing
    int head = 0, tail = 0;     // [head, tail)

    char *o = obuf;
    auto writeInt = [&](int v) {
        if (v == 0) { *o++ = '0'; return; }
        char tmp[12];
        int t = 0;
        while (v > 0) { tmp[t++] = char('0' + v % 10); v /= 10; }
        while (t > 0) *o++ = tmp[--t];
    };

    bool first = true;
    for (int i = 0; i < n; i++) {
        while (tail > head && a[dq[tail - 1]] <= a[i]) tail--;
        dq[tail++] = i;
        if (dq[head] <= i - w) head++;
        if (i >= w - 1) {
            if (!first) *o++ = ' ';
            first = false;
            writeInt(a[dq[head]]);
        }
    }
    *o++ = '\n';

    fwrite(obuf, 1, (size_t)(o - obuf), stdout);
    return 0;
}
