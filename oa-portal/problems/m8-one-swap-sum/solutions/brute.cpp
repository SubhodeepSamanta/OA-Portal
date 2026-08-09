// Brute force - m8 / Q46. Tries every swap. O(n^2). Validation only.
#include <bits/stdc++.h>
using namespace std;

static long long oddTotal(const vector<long long> &a) {
    long long s = 0;
    for (size_t i = 0; i < a.size(); i += 2) s += a[i];
    return s;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    long long best = oddTotal(a);          // the "no swap" option
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(a[i], a[j]);
            best = max(best, oddTotal(a));
            swap(a[i], a[j]);
        }
    }
    cout << best << '\n';
    return 0;
}
