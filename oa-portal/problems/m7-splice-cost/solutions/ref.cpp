// Reference solution - m7 / Q18 Splice Cost, O(n)
//
// The answer is the better of two shapes:
//   (A) the deleted sample lies INSIDE the chosen segment
//       dp0[i] = best segment ending at i, nothing deleted
//       dp1[i] = best segment ending at i, exactly one sample deleted inside it
//       dp1[i] = max( dp0[i-1]  (delete a[i] itself),
//                     dp1[i-1] + a[i]  (extend a segment that already deleted) )
//   (B) the deleted sample lies OUTSIDE the chosen segment
//       then the segment is any proper subarray, i.e. one that misses index 0
//       or misses index n-1, so it lies inside a[1..n-1] or a[0..n-2].
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

    // (A) one deletion inside the segment
    long long dp0 = a[0], dp1 = NEG, ansInternal = NEG;
    for (int i = 1; i < n; i++) {
        long long ndp1 = max(dp0, dp1 == NEG ? NEG : dp1 + a[i]);
        long long ndp0 = max(a[i], dp0 + a[i]);
        dp1 = ndp1;
        dp0 = ndp0;
        ansInternal = max(ansInternal, dp1);
    }

    // (B) plain Kadane restricted to a[0..n-2] and to a[1..n-1]
    auto kadane = [&](int lo, int hi) -> long long {   // inclusive, non-empty
        long long best = a[lo], cur = a[lo];
        for (int i = lo + 1; i <= hi; i++) {
            cur = max(a[i], cur + a[i]);
            best = max(best, cur);
        }
        return best;
    };

    long long ansOutside = max(kadane(0, n - 2), kadane(1, n - 1));

    cout << max(ansInternal, ansOutside) << '\n';
    return 0;
}
