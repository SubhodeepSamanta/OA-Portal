// Reference - m17 / Q108 Subscription Tiers, O(n^2 k)
//
// Sort willingness DESCENDING as v[0] >= v[1] >= ...  Placing a tier at the
// price v[i] means every customer 0..i can afford it, so if the tiers sit at
// indices i_1 < i_2 < ... < i_k then customers (i_{j-1}, i_j] all buy tier j
// at price v[i_j].
//
//   dp[j][i] = best revenue using j tiers where the j-th sits at index i
//   dp[1][i] = v[i] * (i + 1)
//   dp[j][i] = max over prev < i of  dp[j-1][prev] + v[i] * (i - prev)
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> v(n);
    for (auto &x : v) cin >> x;
    sort(v.begin(), v.end(), greater<long long>());

    const long long NEG = LLONG_MIN / 4;
    vector<long long> prev(n, NEG), cur(n, NEG);

    for (int i = 0; i < n; i++) prev[i] = v[i] * (long long)(i + 1);   // j = 1

    long long ans = *max_element(prev.begin(), prev.end());

    for (int j = 2; j <= k; j++) {
        fill(cur.begin(), cur.end(), NEG);
        for (int i = j - 1; i < n; i++) {
            long long best = NEG;
            for (int p = j - 2; p < i; p++) {
                if (prev[p] == NEG) continue;
                best = max(best, prev[p] + v[i] * (long long)(i - p));
            }
            cur[i] = best;
        }
        prev.swap(cur);
        long long m = *max_element(prev.begin(), prev.end());
        if (m > NEG) ans = max(ans, m);
    }

    cout << ans << '\n';
    return 0;
}
