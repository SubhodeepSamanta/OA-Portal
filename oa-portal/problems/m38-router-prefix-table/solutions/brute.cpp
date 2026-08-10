// Brute force - m38 / Q113
// Check every rule against every address with a direct prefix comparison.
// No trie, no sharing.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<string> rules(n);
    vector<char> buf(64);
    for (int i = 0; i < n; i++) { scanf("%s", buf.data()); rules[i] = buf.data(); }

    string out;
    for (int i = 0; i < q; i++) {
        scanf("%s", buf.data());
        string addr = buf.data();
        int best = -1;
        for (int j = 0; j < n; j++) {
            const string &r = rules[j];
            if (r.size() > addr.size()) continue;
            bool ok = true;
            for (size_t k = 0; k < r.size(); k++)
                if (r[k] != addr[k]) { ok = false; break; }
            if (ok) best = max(best, (int)r.size());
        }
        out += to_string(best);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
