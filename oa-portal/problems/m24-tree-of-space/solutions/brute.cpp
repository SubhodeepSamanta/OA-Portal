// Brute force - m24 / Q64
// The rules written out literally: walk the parent chain for ancestors and
// scan the whole subtree for descendants. O(n) per operation, no flattening,
// no Fenwick trees.
#include <bits/stdc++.h>
using namespace std;

int n, q;
vector<int> par, lockedBy;
vector<vector<int>> ch;

void collectLocked(int v, vector<int> &out) {
    for (int c : ch[v]) {
        if (lockedBy[c]) out.push_back(c);
        collectLocked(c, out);
    }
}

int main() {
    if (scanf("%d %d", &n, &q) != 2) return 0;
    par.assign(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &par[i]);
    ch.assign(n + 1, {});
    for (int i = 2; i <= n; i++) ch[par[i]].push_back(i);
    lockedBy.assign(n + 1, 0);

    string out;
    for (int i = 0; i < q; i++) {
        int type, v, uid;
        scanf("%d %d %d", &type, &v, &uid);
        bool ok = false;

        if (type == 1) {
            bool bad = lockedBy[v] != 0;
            for (int x = par[v]; x && !bad; x = par[x]) if (lockedBy[x]) bad = true;
            if (!bad) {
                vector<int> d;
                collectLocked(v, d);
                if (!d.empty()) bad = true;
            }
            if (!bad) { lockedBy[v] = uid; ok = true; }
        } else if (type == 2) {
            if (lockedBy[v] != 0 && lockedBy[v] == uid) { lockedBy[v] = 0; ok = true; }
        } else {
            if (lockedBy[v] == 0) {
                vector<int> d;
                collectLocked(v, d);
                bool all = !d.empty();
                for (int x : d) if (lockedBy[x] != uid) all = false;
                if (all) {
                    for (int x : d) lockedBy[x] = 0;
                    lockedBy[v] = uid;
                    ok = true;
                }
            }
        }
        out += ok ? "true\n" : "false\n";
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
