#include <bits/stdc++.h>
using namespace std;

/* Return every 1-based start position where p occurs in s, increasing.
   Overlapping occurrences all count. */
vector<int> findOccurrences(const string& p, const string& s) {
    // write your code here

    return vector<int>();
}

int main() {
    static char pbuf[1000006], sbuf[1000006];
    if (scanf("%s", pbuf) != 1) return 0;
    if (scanf("%s", sbuf) != 1) return 0;

    vector<int> hits = findOccurrences(pbuf, sbuf);
    string out = to_string(hits.size());
    out += '\n';
    for (size_t i = 0; i < hits.size(); i++) { if (i) out += ' '; out += to_string(hits[i]); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
