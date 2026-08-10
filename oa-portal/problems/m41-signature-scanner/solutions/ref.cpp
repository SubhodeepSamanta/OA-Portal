// Reference - m41 / Q126 Signature Scanner
// KMP: build the prefix-function of p, then scan s without ever moving
// backwards. On a match, fall back by the same rule so overlaps are kept.
#include <bits/stdc++.h>
using namespace std;

static char pbuf[1000006], sbuf[1000006];

int main() {
    if (scanf("%s", pbuf) != 1) return 0;
    if (scanf("%s", sbuf) != 1) return 0;
    int np = (int)strlen(pbuf), ns = (int)strlen(sbuf);

    vector<int> fail(np, 0);
    for (int i = 1; i < np; i++) {
        int j = fail[i - 1];
        while (j > 0 && pbuf[i] != pbuf[j]) j = fail[j - 1];
        if (pbuf[i] == pbuf[j]) j++;
        fail[i] = j;
    }

    vector<int> hits;
    int j = 0;
    for (int i = 0; i < ns; i++) {
        while (j > 0 && sbuf[i] != pbuf[j]) j = fail[j - 1];
        if (sbuf[i] == pbuf[j]) j++;
        if (j == np) {
            hits.push_back(i - np + 2);        // 1-based start
            j = fail[j - 1];                   // keep overlaps
        }
    }

    string out;
    out.reserve(hits.size() * 8 + 16);
    out += to_string(hits.size());
    out += '\n';
    for (size_t k = 0; k < hits.size(); k++) {
        if (k) out += ' ';
        out += to_string(hits[k]);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
