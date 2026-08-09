// Brute force - m3 / Q4. Walks every gate of every grant. Validation only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m, q;
    if (!(cin >> m >> q)) return 0;
    vector<long long> g((size_t)m + 1, 0);
    for (int i = 0; i < q; i++) {
        int l, r; long long x;
        cin >> l >> r >> x;
        for (int j = l; j <= r; j++) g[j] += x;
    }
    long long best = -1; int bestGate = 1;
    for (int i = 1; i <= m; i++) if (g[i] > best) { best = g[i]; bestGate = i; }
    cout << bestGate << ' ' << best << '\n';
    return 0;
}
