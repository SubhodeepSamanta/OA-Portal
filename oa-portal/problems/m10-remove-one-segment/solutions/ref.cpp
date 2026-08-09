// Reference - m10 / Q48 Remove One Segment, O(n)
//
// Removing run [l, r] leaves  total - sum(l..r).  To maximise what remains we
// minimise what we remove, so the answer is
//        total - min(0, smallest sum of any contiguous run)
// The 0 covers "remove nothing"; removing the whole array is just the case
// where the smallest run IS the whole array, which lands on total - total = 0.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    long long total = 0;
    for (long long v : a) total += v;

    // Kadane, minimising
    long long cur = a[0], best = a[0];
    for (int i = 1; i < n; i++) {
        cur = min(a[i], cur + a[i]);
        best = min(best, cur);
    }

    cout << total - min(0LL, best) << '\n';
    return 0;
}
