// Brute force - c27 / Q123
// Tries every length and compares the prefix against the suffix directly.
// No prefix function, no chaining. O(n^2), small inputs only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;
    string s = buf;
    int n = (int)s.size();

    string out;
    bool first = true;
    for (int len = 1; len < n; len++) {
        bool same = true;
        for (int j = 0; j < len; j++) {
            if (s[j] != s[n - len + j]) { same = false; break; }
        }
        if (!same) continue;
        if (!first) out += ' ';
        out += to_string(len);
        first = false;
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
