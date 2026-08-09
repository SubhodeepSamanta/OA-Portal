// Reference - m9 / Q47 One Swap Sum II, O(n)
//
// Score a slot as f(v) = v when v is odd, else 0. The total is the sum of
// f over odd-numbered slots. A permitted swap exchanges an odd slot holding
// v with an even slot holding w, changing the total by f(w) - f(v).
// So we only need the largest f over even slots and the smallest f over odd
// slots - two scans, not n^2 swaps.
#include <bits/stdc++.h>
using namespace std;

static inline long long score(long long v) {
    // v % 2 is -1, 0 or 1; anything non-zero means odd (works for negatives)
    return (v % 2 != 0) ? v : 0LL;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    long long base = 0;
    long long minOddSlot = LLONG_MAX;   // smallest score among odd-numbered slots
    long long maxEvenSlot = LLONG_MIN;  // largest score among even-numbered slots

    for (int i = 0; i < n; i++) {
        long long s = score(a[i]);
        if (i % 2 == 0) { base += s; minOddSlot = min(minOddSlot, s); }
        else            { maxEvenSlot = max(maxEvenSlot, s); }
    }

    long long ans = base;
    if (maxEvenSlot != LLONG_MIN && minOddSlot != LLONG_MAX) {
        ans = max(ans, base + (maxEvenSlot - minOddSlot));
    }

    cout << ans << '\n';
    return 0;
}
