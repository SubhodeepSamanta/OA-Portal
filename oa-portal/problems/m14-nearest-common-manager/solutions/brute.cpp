// Brute force - m14 / Q63. Marks u's whole chain, then walks up from v.
// O(n) per query. Validation only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<int> par(n + 1, 1);
    for (int i = 2; i <= n; i++) cin >> par[i];

    vector<char> onChain(n + 1, 0);
    for (int t = 0; t < q; t++) {
        int u, v; cin >> u >> v;
        fill(onChain.begin(), onChain.end(), 0);
        for (int x = u;; x = par[x]) { onChain[x] = 1; if (x == 1) break; }
        int ans = 1;
        for (int x = v;; x = par[x]) {
            if (onChain[x]) { ans = x; break; }
            if (x == 1) break;
        }
        cout << ans << '\n';
    }
    return 0;
}
