#include <bits/stdc++.h>
using namespace std;

/* ops[i] = {type, node, uid}; type 1 lock / 2 unlock / 3 upgrade / 4 count.
   Return 1 or 0 for types 1-3, and the count itself for type 4. */
vector<long long> runOperations(int n, const vector<int>& parent, const vector<array<int,3>>& ops) {
    // write your code here

    return vector<long long>(ops.size(), 0);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> parent(n + 1, 1);
    for (int i = 2; i <= n; i++) scanf("%d", &parent[i]);
    vector<array<int,3>> ops(q);
    for (auto &o : ops) scanf("%d %d %d", &o[0], &o[1], &o[2]);

    vector<long long> res = runOperations(n, parent, ops);
    string out;
    for (size_t i = 0; i < ops.size(); i++) {
        if (ops[i][0] == 4) out += to_string(res[i]);
        else out += res[i] ? "true" : "false";
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
