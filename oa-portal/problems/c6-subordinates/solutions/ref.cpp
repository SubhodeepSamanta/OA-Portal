// Reference - c6 / Q59 Subordinates (CSES 1674)
// BFS from the root to get an order in which every parent precedes its
// children, then accumulate counts walking that order backwards.
// No recursion: the hierarchy can be a 2e5-deep chain.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    vector<int> par(n + 1, 0), head(n + 1, -1), nxt(n + 1, -1);
    for (int i = 2; i <= n; i++) {
        scanf("%d", &par[i]);
        nxt[i] = head[par[i]];          // intrusive child list, no vector<vector>
        head[par[i]] = i;
    }

    vector<int> order;
    order.reserve(n);
    order.push_back(1);
    for (size_t qi = 0; qi < order.size(); qi++) {
        for (int c = head[order[qi]]; c != -1; c = nxt[c]) order.push_back(c);
    }

    vector<int> cnt(n + 1, 0);
    for (int i = (int)order.size() - 1; i >= 1; i--) {   // skip the root at index 0
        int v = order[i];
        cnt[par[v]] += cnt[v] + 1;
    }

    string out;
    out.reserve(n * 7);
    for (int i = 1; i <= n; i++) { out += to_string(cnt[i]); out += (i == n ? '\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
