// Brute force - m30 / Q72
//
// No logarithms and no floating point at all: enumerate every SIMPLE cycle
// and multiply the offers as exact fractions in __int128, reduced each step.
//
// That is enough, and the reason matters: any closed walk decomposes into
// simple cycles and its multiplier is the product of theirs, so if some walk
// beats 1 then some simple cycle does too.
#include <bits/stdc++.h>
using namespace std;

typedef __int128 lll;

int n, m;
vector<array<int, 4>> E;              // u, v, p, q
vector<vector<int>> out;              // edge ids leaving each node
vector<char> onPath;
bool found = false;

lll gcdll(lll a, lll b) { while (b) { lll t = a % b; a = b; b = t; } return a < 0 ? -a : a; }

void dfs(int start, int u, lll num, lll den) {
    if (found) return;
    for (int e : out[u]) {
        int v = E[e][1];
        lll nn = num * E[e][2], dd = den * E[e][3];
        lll g = gcdll(nn, dd);
        if (g > 1) { nn /= g; dd /= g; }
        if (v == start) {
            if (nn > dd) { found = true; return; }
            continue;
        }
        if (v < start || onPath[v]) continue;     // canonical: only nodes above the start
        onPath[v] = 1;
        dfs(start, v, nn, dd);
        onPath[v] = 0;
        if (found) return;
    }
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    E.resize(m);
    out.assign(n + 1, {});
    for (int i = 0; i < m; i++) {
        scanf("%d %d %d %d", &E[i][0], &E[i][1], &E[i][2], &E[i][3]);
        out[E[i][0]].push_back(i);
    }

    // restrict to nodes reachable from 1 that can also return to 1
    vector<vector<int>> fwd(n + 1), rev(n + 1);
    for (int i = 0; i < m; i++) { fwd[E[i][0]].push_back(E[i][1]); rev[E[i][1]].push_back(E[i][0]); }
    auto bfs = [&](vector<vector<int>> &g) {
        vector<char> seen(n + 1, 0);
        vector<int> st{1};
        seen[1] = 1;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int v : g[u]) if (!seen[v]) { seen[v] = 1; st.push_back(v); }
        }
        return seen;
    };
    vector<char> a = bfs(fwd), b = bfs(rev);

    vector<vector<int>> kept(n + 1);
    for (int i = 0; i < m; i++)
        if (a[E[i][0]] && b[E[i][0]] && a[E[i][1]] && b[E[i][1]]) kept[E[i][0]].push_back(i);
    out = kept;

    onPath.assign(n + 1, 0);
    for (int s = 1; s <= n && !found; s++) {
        if (!a[s] || !b[s]) continue;
        onPath[s] = 1;
        dfs(s, s, 1, 1);
        onPath[s] = 0;
    }
    printf(found ? "YES\n" : "NO\n");
    return 0;
}
