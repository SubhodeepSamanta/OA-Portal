// Brute force - m9 / Q47. Tries every legal swap. O(n^2). Validation only.
#include <bits/stdc++.h>
using namespace std;

static long long total(const vector<long long> &a) {
    long long s = 0;
    for (size_t i = 0; i < a.size(); i += 2) if (a[i] % 2 != 0) s += a[i];
    return s;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    long long best = total(a);                     // no swap
    for (int i = 0; i < n; i += 2) {               // odd-numbered slot (0-based even)
        for (int j = 1; j < n; j += 2) {           // even-numbered slot (0-based odd)
            swap(a[i], a[j]);
            best = max(best, total(a));
            swap(a[i], a[j]);
        }
    }
    cout << best << '\n';
    return 0;
}
