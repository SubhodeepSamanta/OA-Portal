// Reference - c30 / Q235 Road Construction (CSES 1676)
// DSU with union by size. Both answers move in one direction only, so they
// are maintained incrementally rather than recomputed.
#include <bits/stdc++.h>
using namespace std;

vector<int> parent_, size_;

int find(int x) {
    while (parent_[x] != x) { parent_[x] = parent_[parent_[x]]; x = parent_[x]; }
    return x;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    parent_.resize(n + 1);
    size_.assign(n + 1, 1);
    for (int i = 1; i <= n; i++) parent_[i] = i;

    int components = n, largest = 1;
    string out;
    out.reserve(m * 14);

    for (int i = 0; i < m; i++) {
        int a, b; scanf("%d %d", &a, &b);
        int ra = find(a), rb = find(b);
        if (ra != rb) {                       // already-connected roads change nothing
            if (size_[ra] < size_[rb]) swap(ra, rb);
            parent_[rb] = ra;
            size_[ra] += size_[rb];
            components--;
            largest = max(largest, size_[ra]);
        }
        out += to_string(components);
        out += ' ';
        out += to_string(largest);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
