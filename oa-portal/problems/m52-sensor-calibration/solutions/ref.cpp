// Reference - m52 / Q139 Sensor Calibration
// Answer = n - longest NON-DECREASING subsequence of b[i] = a[i] - i.
// upper_bound (not lower_bound) is what makes it non-decreasing.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    vector<long long> tails;
    tails.reserve(n);
    for (int i = 0; i < n; i++) {
        long long a;
        scanf("%lld", &a);
        long long b = a - i;
        auto it = upper_bound(tails.begin(), tails.end(), b);
        if (it == tails.end()) tails.push_back(b);
        else *it = b;
    }
    printf("%d\n", n - (int)tails.size());
    return 0;
}
