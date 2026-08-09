// Brute force - m13 / Q54. Tests every run directly. O(n^2). Validation only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long t;
    if (!(cin >> n >> t)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    int best = 0;
    for (int i = 0; i < n; i++) {
        long long sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            long long len = j - i + 1;
            if (sum >= t * len) best = max(best, (int)len);
        }
    }
    cout << best << '\n';
    return 0;
}
