// Reference - m24 / Q64 Tree of Space
//
// Euler tour + four Fenwick trees:
//   cover : range-add / point-query   -> "how many locked ancestors-or-self"
//   cnt   : point-add / range-query   -> "how many locked nodes in the subtree"
//   s1,s2 : sums of uid and uid^2     -> "are all those locks the same uid"
// The uid test is exact: sum(x_i^2) - 2u*sum(x_i) + S*u^2 = sum((x_i-u)^2),
// which is zero only when every x_i equals u.
#include <bits/stdc++.h>
using namespace std;

struct Fen {
    int n; vector<long long> t;
    void init(int n_) { n = n_; t.assign(n + 2, 0); }
    void add(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
    long long pre(int i) const { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
    long long range(int l, int r) const { return r < l ? 0 : pre(r) - pre(l - 1); }
};

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> par(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &par[i]);

    vector<vector<int>> ch(n + 1);
    for (int i = 2; i <= n; i++) ch[par[i]].push_back(i);

    vector<int> tin(n + 1), tout(n + 1), nodeAt(n + 2);
    {
        int timer = 0;
        vector<pair<int, size_t>> st;
        st.reserve(n);
        tin[1] = ++timer; nodeAt[timer] = 1;
        st.push_back(make_pair(1, (size_t)0));
        while (!st.empty()) {
            pair<int, size_t> &top = st.back();
            if (top.second < ch[top.first].size()) {
                int c = ch[top.first][top.second++];
                tin[c] = ++timer; nodeAt[timer] = c;
                st.push_back(make_pair(c, (size_t)0));
            } else {
                tout[top.first] = timer;
                st.pop_back();
            }
        }
    }

    Fen cover, cnt, s1, s2;
    cover.init(n); cnt.init(n); s1.init(n); s2.init(n);
    vector<int> lockedBy(n + 1, 0);
    set<int> lockedTins;

    auto doLock = [&](int v, int uid) {
        lockedBy[v] = uid;
        cnt.add(tin[v], 1);
        s1.add(tin[v], uid);
        s2.add(tin[v], (long long)uid * uid);
        cover.add(tin[v], 1);
        cover.add(tout[v] + 1, -1);
        lockedTins.insert(tin[v]);
    };
    // doUnlock owns the set removal too - a plain unlock that left tin[v]
    // behind would let a later upgrade "unlock" the same node a second time
    // and drive every counter negative.
    auto doUnlock = [&](int v) {
        int uid = lockedBy[v];
        lockedBy[v] = 0;
        cnt.add(tin[v], -1);
        s1.add(tin[v], -uid);
        s2.add(tin[v], -(long long)uid * uid);
        cover.add(tin[v], -1);
        cover.add(tout[v] + 1, 1);
        lockedTins.erase(tin[v]);
    };

    string out;
    out.reserve((size_t)q * 6);
    for (int i = 0; i < q; i++) {
        int type, v, uid;
        scanf("%d %d %d", &type, &v, &uid);
        bool ok = false;

        if (type == 1) {
            if (!lockedBy[v] && cnt.range(tin[v], tout[v]) == 0 && cover.pre(tin[v]) == 0) {
                doLock(v, uid);
                ok = true;
            }
        } else if (type == 2) {
            if (lockedBy[v] == uid && lockedBy[v] != 0) { doUnlock(v); ok = true; }
        } else {
            if (!lockedBy[v]) {
                long long S = cnt.range(tin[v], tout[v]);
                if (S > 0) {
                    long long A = s1.range(tin[v], tout[v]);
                    long long B = s2.range(tin[v], tout[v]);
                    // sum of squared deviations from uid; zero iff all equal
                    if (B - 2LL * uid * A + S * (long long)uid * uid == 0) {
                        vector<int> victims;
                        for (auto it = lockedTins.lower_bound(tin[v]);
                             it != lockedTins.end() && *it <= tout[v]; ++it)
                            victims.push_back(*it);
                        for (int p : victims) doUnlock(nodeAt[p]);
                        doLock(v, uid);
                        ok = true;
                    }
                }
            }
        }
        out += ok ? "true\n" : "false\n";
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
