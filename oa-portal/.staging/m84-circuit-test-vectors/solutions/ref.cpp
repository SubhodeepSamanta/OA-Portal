// Reference - m84 / Q204 Circuit Test Vectors
// Disjoint-set carrying each node's parity relative to its representative.
// Answer is 2^(number of groups), or 0 if any constraint contradicts.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

vector<int> par, rel;                 // rel[x] = parity of x against par[x]

// Returns {root, parity of x against root}. Iterative on purpose: a chain of
// 100000 inputs would blow the default stack if this recursed.
pair<int, int> find(int x) {
    int root = x, px = 0;
    while (par[root] != root) { px ^= rel[root]; root = par[root]; }

    int cur = x, pc = px;             // pc = parity of cur against root
    while (par[cur] != root) {
        int nxt = par[cur];
        int pn = pc ^ rel[cur];       // parity of nxt against root
        par[cur] = root;
        rel[cur] = pc;
        cur = nxt;
        pc = pn;
    }
    return make_pair(root, px);
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    par.resize(n + 1);
    rel.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) par[i] = i;

    int groups = n;
    bool ok = true;
    for (int e = 0; e < m; e++) {
        int a, b, t;
        scanf("%d %d %d", &a, &b, &t);
        if (!ok) continue;
        pair<int, int> ra = find(a), rb = find(b);
        if (ra.first == rb.first) {
            if ((ra.second ^ rb.second) != t) ok = false;
        } else {
            par[ra.first] = rb.first;
            rel[ra.first] = ra.second ^ rb.second ^ t;
            groups--;
        }
    }

    if (!ok) { printf("0\n"); return 0; }

    long long ans = 1, base = 2, e = groups;
    while (e) { if (e & 1) ans = ans * base % MOD; base = base * base % MOD; e >>= 1; }
    printf("%lld\n", ans);
    return 0;
}
