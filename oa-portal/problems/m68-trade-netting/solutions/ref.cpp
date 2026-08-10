// Reference - m68 / Q163 Trade Netting
// Net every position in one pass, group with union-find, then aggregate per
// group and report ordered by the group's smallest member.
#include <bits/stdc++.h>
using namespace std;

vector<int> par;
int findRoot(int x) { while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; } return x; }

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> bal(n + 1, 0);
    par.resize(n + 1);
    for (int i = 1; i <= n; i++) par[i] = i;

    for (int j = 0; j < m; j++) {
        int a, b;
        long long x;
        scanf("%d %d %lld", &a, &b, &x);
        bal[a] -= x;
        bal[b] += x;
        int ra = findRoot(a), rb = findRoot(b);
        if (ra != rb) par[ra] = rb;
    }

    // aggregate into the root, tracking the smallest member seen
    vector<int> smallest(n + 1, INT_MAX);
    vector<long long> nonzero(n + 1, 0), moving(n + 1, 0);
    for (int v = 1; v <= n; v++) {
        int r = findRoot(v);
        smallest[r] = min(smallest[r], v);
        if (bal[v] != 0) nonzero[r]++;
        if (bal[v] > 0) moving[r] += bal[v];
    }

    vector<array<long long, 3>> groups;
    for (int v = 1; v <= n; v++)
        if (findRoot(v) == v) groups.push_back({smallest[v], nonzero[v], moving[v]});
    sort(groups.begin(), groups.end());

    string out = to_string(groups.size());
    out += '\n';
    for (const auto &g : groups) {
        out += to_string(g[0]); out += ' ';
        out += to_string(g[1]); out += ' ';
        out += to_string(g[2]); out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
