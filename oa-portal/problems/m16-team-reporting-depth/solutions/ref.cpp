// Reference - m16 / Q66 Team Reporting Depth, O(n log n)
//
// Flatten the tree with an Euler tour so every subtree is a contiguous range
// [tin, tout]. Then answer(v) = (nodes in v's range with depth <= depth[v]+k) - 1.
//
// Process offline: sweep depth d upward, inserting every node of depth d into
// a Fenwick tree indexed by tin, and answering each v whose budget
// depth[v]+k equals d. Nodes whose budget exceeds the tree's height are
// answered at the end with their full subtree size.
#include <bits/stdc++.h>
using namespace std;

static char ibuf[1 << 25];

int main() {
    size_t len = fread(ibuf, 1, sizeof(ibuf) - 1, stdin);
    ibuf[len] = 0;
    char *p = ibuf;
    auto readInt = [&]() -> int {
        while (*p && (*p < '0' || *p > '9')) p++;
        int v = 0;
        while (*p >= '0' && *p <= '9') { v = v * 10 + (*p - '0'); p++; }
        return v;
    };

    int n = readInt();
    int k = readInt();

    vector<int> par(n + 1, 0), depth(n + 1, 0);
    vector<int> childHead(n + 1, -1), childNext(n + 1, -1);
    for (int i = 2; i <= n; i++) {
        par[i] = readInt();
        depth[i] = depth[par[i]] + 1;          // parent < i, already final
    }
    // build child lists in reverse so traversal visits them ascending
    for (int i = n; i >= 2; i--) { childNext[i] = childHead[par[i]]; childHead[par[i]] = i; }

    // iterative Euler tour
    vector<int> tin(n + 1, 0), tout(n + 1, 0), stk;
    stk.reserve(n);
    int timer = 0;
    {
        vector<int> it(n + 1);
        for (int i = 1; i <= n; i++) it[i] = childHead[i];
        stk.push_back(1);
        tin[1] = ++timer;
        while (!stk.empty()) {
            int v = stk.back();
            if (it[v] != -1) {
                int c = it[v];
                it[v] = childNext[c];
                tin[c] = ++timer;
                stk.push_back(c);
            } else {
                tout[v] = timer;
                stk.pop_back();
            }
        }
    }

    int maxDepth = 0;
    for (int i = 1; i <= n; i++) maxDepth = max(maxDepth, depth[i]);

    // bucket nodes by depth, and queries by their (clamped) depth budget
    vector<vector<int>> byDepth(maxDepth + 1), askAt(maxDepth + 1);
    for (int i = 1; i <= n; i++) {
        byDepth[depth[i]].push_back(i);
        long long budget = (long long)depth[i] + k;
        askAt[(int)min<long long>(budget, maxDepth)].push_back(i);
    }

    vector<int> bit(n + 2, 0);
    auto add = [&](int i) { for (; i <= n; i += i & -i) bit[i]++; };
    auto pre = [&](int i) { int s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; };

    vector<int> ans(n + 1, 0);
    for (int d = 0; d <= maxDepth; d++) {
        for (int v : byDepth[d]) add(tin[v]);
        for (int v : askAt[d]) ans[v] = pre(tout[v]) - pre(tin[v] - 1) - 1;
    }

    string out;
    out.reserve((size_t)n * 7);
    for (int i = 1; i <= n; i++) { if (i > 1) out += ' '; out += to_string(ans[i]); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
