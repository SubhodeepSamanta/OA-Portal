// Reference - m33 / Q76 Employee Referral Chain
//
// A functional graph: rings with trees feeding into them.
//   1. walk from every node, colouring as we go, to find the rings
//   2. ring members get their ring's size
//   3. everyone else gets 1 + the answer of the person they referred
// Entirely iterative - a chain can be 200000 long.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> f(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &f[i]);

    // state: 0 untouched, 1 on the current walk, 2 finished
    vector<char> state(n + 1, 0);
    vector<int> pos(n + 1, 0);          // index of the node within the current walk
    vector<long long> ans(n + 1, 0);
    vector<int> path;
    path.reserve(n);

    for (int s = 1; s <= n; s++) {
        if (state[s]) continue;
        path.clear();
        int u = s;
        while (state[u] == 0) {
            state[u] = 1;
            pos[u] = (int)path.size();
            path.push_back(u);
            u = f[u];
        }

        size_t settled = path.size();
        if (state[u] == 1) {
            // closed a ring inside THIS walk: everything from pos[u] onward
            int start = pos[u];
            long long len = (long long)path.size() - start;
            for (size_t i = start; i < path.size(); i++) ans[path[i]] = len;
            settled = start;             // the tail before the ring is still open
        }
        // unwind the tail: each step is one further from what it points at
        for (size_t i = settled; i-- > 0;) ans[path[i]] = ans[f[path[i]]] + 1;
        for (int v : path) state[v] = 2;
    }

    string out;
    out.reserve((size_t)n * 7);
    for (int i = 1; i <= n; i++) {
        if (i > 1) out += ' ';
        out += to_string(ans[i]);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
