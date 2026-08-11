// Brute force - m84 / Q204
//
// tiny  : enumerate every assignment and check all constraints. No disjoint
//         sets, no parity bookkeeping, no counting argument.
// larger: BFS two-colouring of each component, checking consistency as it
//         goes. Different code from the weighted disjoint-set, and needed
//         because "100000 0" is a ten-byte input that would otherwise be
//         handed to a 2^100000 loop.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int, 3>> con(m);
    for (int e = 0; e < m; e++) scanf("%d %d %d", &con[e][0], &con[e][1], &con[e][2]);

    if (n > 20) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (int e = 0; e < m; e++) {
            adj[con[e][0]].push_back(make_pair(con[e][1], con[e][2]));
            adj[con[e][1]].push_back(make_pair(con[e][0], con[e][2]));
        }
        vector<int> colour(n + 1, -1);
        long long groups = 0;
        for (int s = 1; s <= n; s++) {
            if (colour[s] != -1) continue;
            groups++;
            colour[s] = 0;
            vector<int> stk{s};
            while (!stk.empty()) {
                int u = stk.back(); stk.pop_back();
                for (const auto &e : adj[u]) {
                    int want = colour[u] ^ e.second;
                    if (colour[e.first] == -1) { colour[e.first] = want; stk.push_back(e.first); }
                    else if (colour[e.first] != want) { printf("0\n"); return 0; }
                }
            }
        }
        long long ans = 1, base = 2, ex = groups;
        while (ex) { if (ex & 1) ans = ans * base % MOD; base = base * base % MOD; ex >>= 1; }
        printf("%lld\n", ans);
        return 0;
    }

    long long count = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        bool ok = true;
        for (int e = 0; e < m && ok; e++) {
            int a = (mask >> (con[e][0] - 1)) & 1;
            int b = (mask >> (con[e][1] - 1)) & 1;
            if ((a ^ b) != con[e][2]) ok = false;
        }
        if (ok) count++;
    }
    printf("%lld\n", count % MOD);
    return 0;
}
