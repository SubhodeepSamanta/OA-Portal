// Brute force - m17 / Q108. Enumerates every set of k prices drawn from the
// distinct willingness values and simulates each customer's purchase directly.
// Independent of the DP. Small inputs only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> w(n);
    for (auto &x : w) cin >> x;

    vector<long long> cand = w;
    sort(cand.begin(), cand.end());
    cand.erase(unique(cand.begin(), cand.end()), cand.end());
    int m = (int)cand.size();

    if (m > 16) { cout << -1 << '\n'; return 0; }   // guard: never used at this size

    long long best = 0;
    // choose any subset of candidate prices of size min(k, m)
    int want = min(k, m);
    for (int mask = 0; mask < (1 << m); mask++) {
        if (__builtin_popcount(mask) != want) continue;
        vector<long long> tiers;
        for (int i = 0; i < m; i++) if (mask >> i & 1) tiers.push_back(cand[i]);

        long long rev = 0;
        for (long long x : w) {
            long long paid = -1;
            for (long long t : tiers) if (t <= x) paid = max(paid, t);
            if (paid > 0) rev += paid;
        }
        best = max(best, rev);
    }
    cout << best << '\n';
    return 0;
}
