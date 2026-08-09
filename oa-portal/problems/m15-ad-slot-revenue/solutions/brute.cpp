// Brute force - m15 / Q107. Enumerates every subset of slots and keeps those
// with at most one adjacent pair. Fully independent of the DP. Small n only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> p(n);
    for (auto &x : p) cin >> x;

    if (n > 22) { cout << -1 << '\n'; return 0; }   // guard: never used at this size

    long long best = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        int adjacent = 0;
        for (int i = 0; i + 1 < n; i++)
            if ((mask >> i & 1) && (mask >> (i + 1) & 1)) adjacent++;
        if (adjacent > 1) continue;                 // concession covers one pair only

        long long sum = 0;
        for (int i = 0; i < n; i++) if (mask >> i & 1) sum += p[i];
        best = max(best, sum);
    }
    cout << best << '\n';
    return 0;
}
