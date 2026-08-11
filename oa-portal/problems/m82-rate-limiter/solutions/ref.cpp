// Reference - m82 / Q198 Rate Limiter
//
// One queue of in-window accepted timestamps per user. Each timestamp is
// pushed once and popped once, so trimming is amortised constant.
//
// User ids are bounded, so index them directly rather than hashing, and give
// each user a plain vector with a head pointer instead of a deque - at 10^6
// requests the container overhead is the whole runtime.
#include <bits/stdc++.h>
using namespace std;

static char inBuf[1 << 25];
static size_t inPos = 0, inLen = 0;

static inline int readChar() {
    if (inPos == inLen) {
        inLen = fread(inBuf, 1, sizeof(inBuf), stdin);
        inPos = 0;
        if (inLen == 0) return -1;
    }
    return inBuf[inPos++];
}
static inline long long readInt() {
    int c = readChar();
    while (c != -1 && (c < '0' || c > '9') && c != '-') c = readChar();
    bool neg = false;
    if (c == '-') { neg = true; c = readChar(); }
    long long v = 0;
    while (c >= '0' && c <= '9') { v = v * 10 + (c - '0'); c = readChar(); }
    return neg ? -v : v;
}

int main() {
    int q = (int)readInt();
    long long k = readInt(), w = readInt();

    const int MAXU = 1000001;
    vector<vector<long long>> seen(MAXU);
    vector<int> head(MAXU, 0);

    string out;
    out.reserve(q + 1);
    for (int i = 0; i < q; i++) {
        int u = (int)readInt();
        long long t = readInt();

        vector<long long> &v = seen[u];
        int &h = head[u];
        while (h < (int)v.size() && v[h] <= t - w) h++;

        if ((long long)v.size() - h < k) { v.push_back(t); out += '1'; }
        else out += '0';                   // rejected requests are not recorded
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
