// Reference - c10 / Q80 Building Roads (CSES 1666)
// Union-Find over the existing roads, then chain one representative from each
// remaining component together.
#include <bits/stdc++.h>
using namespace std;

vector<int> parent_, sz_;

int find(int x) {
    while (parent_[x] != x) { parent_[x] = parent_[parent_[x]]; x = parent_[x]; }
    return x;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    parent_.resize(n + 1);
    sz_.assign(n + 1, 1);
    for (int i = 1; i <= n; i++) parent_[i] = i;

    for (int i = 0; i < m; i++) {
        int a, b; scanf("%d %d", &a, &b);
        int ra = find(a), rb = find(b);
        if (ra == rb) continue;
        if (sz_[ra] < sz_[rb]) swap(ra, rb);
        parent_[rb] = ra;
        sz_[ra] += sz_[rb];
    }

    vector<int> reps;
    for (int i = 1; i <= n; i++) if (find(i) == i) reps.push_back(i);

    string out = to_string((int)reps.size() - 1);
    out += '\n';
    for (size_t i = 1; i < reps.size(); i++) {
        out += to_string(reps[i - 1]);
        out += ' ';
        out += to_string(reps[i]);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
