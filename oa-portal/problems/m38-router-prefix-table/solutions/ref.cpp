// Reference - m38 / Q113 Router Prefix Table
// Binary trie. Each address walks down at most 32 edges; the deepest node
// flagged as the end of a rule is the longest match.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    // one node per character at most, and total rule length is capped at 1e6
    vector<array<int, 2>> nxt;
    vector<char> isRule;
    nxt.reserve(1000005);
    isRule.reserve(1000005);
    nxt.push_back({-1, -1});
    isRule.push_back(0);

    vector<char> buf(64);
    for (int i = 0; i < n; i++) {
        scanf("%s", buf.data());
        int cur = 0;
        for (int k = 0; buf[k]; k++) {
            int b = buf[k] - '0';
            if (nxt[cur][b] == -1) {
                nxt[cur][b] = (int)nxt.size();
                nxt.push_back({-1, -1});
                isRule.push_back(0);
            }
            cur = nxt[cur][b];
        }
        isRule[cur] = 1;
    }

    string out;
    out.reserve((size_t)q * 4);
    for (int i = 0; i < q; i++) {
        scanf("%s", buf.data());
        int cur = 0, best = -1;
        for (int k = 0; buf[k]; k++) {
            int b = buf[k] - '0';
            if (nxt[cur][b] == -1) break;
            cur = nxt[cur][b];
            if (isRule[cur]) best = k + 1;
        }
        out += to_string(best);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
