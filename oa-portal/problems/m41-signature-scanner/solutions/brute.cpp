// Brute force - m41 / Q126
// Try every start position and compare character by character. No prefix
// function, no cleverness.
#include <bits/stdc++.h>
using namespace std;

static char pbuf[1000006], sbuf[1000006];

int main() {
    if (scanf("%s", pbuf) != 1) return 0;
    if (scanf("%s", sbuf) != 1) return 0;
    int np = (int)strlen(pbuf), ns = (int)strlen(sbuf);

    vector<int> hits;
    for (int i = 0; i + np <= ns; i++) {
        bool ok = true;
        for (int k = 0; k < np; k++)
            if (sbuf[i + k] != pbuf[k]) { ok = false; break; }
        if (ok) hits.push_back(i + 1);
    }

    string out;
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
