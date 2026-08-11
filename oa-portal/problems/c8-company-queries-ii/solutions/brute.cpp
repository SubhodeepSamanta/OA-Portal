// Brute force - c8 / Q61
// Mark every ancestor of a, then walk up from b until a marked node appears.
// One step at a time, no jump table. O(depth) per query.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> par(n + 1, 1);
    par[1] = 0;
    for (int i = 2; i <= n; i++) scanf("%d", &par[i]);

    vector<int> stamp(n + 1, 0);
    string out;
    for (int i = 1; i <= q; i++) {
        int a, b; scanf("%d %d", &a, &b);
        for (int v = a; v != 0; v = par[v]) stamp[v] = i;
        int ans = b;
        while (stamp[ans] != i) ans = par[ans];
        out += to_string(ans);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
