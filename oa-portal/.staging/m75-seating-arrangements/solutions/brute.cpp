// Brute force - m75 / Q174
// Pascal's triangle, built additively. No factorials, no modular inverses,
// no Fermat - so it checks the whole inverse machinery independently.
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<pair<int, int>> qs(q);
    int maxN = 0;
    for (int i = 0; i < q; i++) {
        scanf("%d %d", &qs[i].first, &qs[i].second);
        maxN = max(maxN, qs[i].first);
    }

    vector<vector<long long>> C(maxN + 1);
    for (int n = 0; n <= maxN; n++) {
        C[n].assign(n + 1, 0);
        C[n][0] = 1;
        for (int k = 1; k <= n; k++)
            C[n][k] = (C[n - 1][k - 1] + (k <= n - 1 ? C[n - 1][k] : 0)) % MOD;
    }

    string out;
    for (int i = 0; i < q; i++) {
        int n = qs[i].first, r = qs[i].second;
        out += to_string(r > n ? 0LL : C[n][r]);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
