// Brute force - m7 / Q18. Delete each index, run Kadane on the rest. O(n^2).
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    const long long NEG = LLONG_MIN / 4;
    long long ans = NEG;

    for (int d = 0; d < n; d++) {
        long long best = NEG, cur = NEG;
        for (int i = 0; i < n; i++) {
            if (i == d) continue;
            cur = (cur == NEG) ? a[i] : max(a[i], cur + a[i]);
            best = max(best, cur);
        }
        ans = max(ans, best);
    }
    cout << ans << '\n';
    return 0;
}
