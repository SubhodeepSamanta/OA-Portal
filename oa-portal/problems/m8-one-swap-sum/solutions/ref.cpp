// Reference - m8 / Q46 One Swap Sum, O(n)
//
// Only a swap between an odd slot and an even slot can change the total.
// Such a swap moves value v OUT of an odd slot and value w IN, so the total
// changes by (w - v). To maximise, take the largest value sitting in an even
// slot and the smallest value sitting in an odd slot - one candidate, not n^2.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    long long base = 0;
    long long minOdd = LLONG_MAX;    // smallest value currently in an odd slot
    long long maxEven = LLONG_MIN;   // largest value currently in an even slot

    for (int i = 0; i < n; i++) {
        if (i % 2 == 0) { base += a[i]; minOdd = min(minOdd, a[i]); }
        else            { maxEven = max(maxEven, a[i]); }
    }

    long long ans = base;
    if (maxEven != LLONG_MIN && minOdd != LLONG_MAX) {
        ans = max(ans, base + (maxEven - minOdd));
    }

    cout << ans << '\n';
    return 0;
}
