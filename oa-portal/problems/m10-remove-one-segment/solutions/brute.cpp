// Brute force - m10 / Q48. Tries every removable run plus "remove nothing".
// O(n^2). Validation only.
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

    long long best = total;                 // remove nothing
    for (int l = 0; l < n; l++) {
        long long run = 0;
        for (int r = l; r < n; r++) {
            run += a[r];
            best = max(best, total - run);  // covers removing everything at l=0,r=n-1
        }
    }
    cout << best << '\n';
    return 0;
}
