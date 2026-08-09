#include <bits/stdc++.h>
using namespace std;

/* parent[v] is the parent of node v; parent[1] is 1 (the root).
   ops[i] = {type, node, uid}, type 1 lock / 2 unlock / 3 upgrade.
   Return one result per operation, in order. */
vector<bool> runOperations(int n, const vector<int>& parent, const vector<array<int,3>>& ops) {
    // write your code here

    return vector<bool>(ops.size(), false);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> parent(n + 1, 1);
    for (int i = 2; i <= n; i++) scanf("%d", &parent[i]);
    vector<array<int,3>> ops(q);
    for (auto &o : ops) scanf("%d %d %d", &o[0], &o[1], &o[2]);

    string out;
    for (bool ok : runOperations(n, parent, ops)) out += ok ? "true\n" : "false\n";
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
