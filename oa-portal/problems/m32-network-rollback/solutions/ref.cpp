// Reference - m32 / Q75 Network Rollback
// DSU cannot un-merge, so process the events in reverse: start from the final
// network and plug cables back in, recording the count before each re-plug.
#include <bits/stdc++.h>
using namespace std;

int par[200005], sz[200005];
int findRoot(int x) { while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; } return x; }

int main() {
    int n, m, q;
    if (scanf("%d %d %d", &n, &m, &q) != 3) return 0;
    vector<int> U(m + 1), V(m + 1);
    for (int i = 1; i <= m; i++) scanf("%d %d", &U[i], &V[i]);
    vector<int> ev(q);
    vector<char> removed(m + 1, 0);
    for (int i = 0; i < q; i++) { scanf("%d", &ev[i]); removed[ev[i]] = 1; }

    for (int i = 1; i <= n; i++) { par[i] = i; sz[i] = 1; }
    int comps = n;
    auto join = [&](int a, int b) {
        a = findRoot(a); b = findRoot(b);
        if (a == b) return;
        if (sz[a] < sz[b]) swap(a, b);
        par[b] = a; sz[a] += sz[b];
        comps--;
    };

    // the network as it stands after every listed unplugging
    for (int i = 1; i <= m; i++) if (!removed[i]) join(U[i], V[i]);

    vector<int> ans(q);
    for (int i = q - 1; i >= 0; i--) {
        ans[i] = comps;                 // state after event i
        join(U[ev[i]], V[ev[i]]);       // undo it, giving the state after i-1
    }

    string out;
    out.reserve((size_t)q * 7);
    for (int i = 0; i < q; i++) { out += to_string(ans[i]); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
