// Brute force - m4 / Q11. O(n^2) membership walk. Validation only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    auto has = [&](long long v) {
        for (int i = 0; i < n; i++) if (a[i] == v) return true;
        return false;
    };

    int best = 0;
    for (int i = 0; i < n; i++) {
        long long start = a[i];
        if (has(start - 1)) continue;         // only walk from a run start
        int len = 0;
        long long v = start;
        while (has(v)) { len++; v++; }
        best = max(best, len);
    }
    cout << best << '\n';
    return 0;
}
