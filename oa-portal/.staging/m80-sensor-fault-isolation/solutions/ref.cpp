// Reference - m80 / Q183 Sensor Fault Isolation
// XOR everything to get a^b, take its lowest set bit - a bit where a and b
// disagree - and XOR the two halves separately.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    long long all = 0;
    vector<long long> v(n);
    for (int i = 0; i < n; i++) { scanf("%lld", &v[i]); all ^= v[i]; }

    long long bit = all & -all;           // a and b differ here
    long long x = 0, y = 0;
    for (int i = 0; i < n; i++) {
        if (v[i] & bit) x ^= v[i];
        else y ^= v[i];
    }

    if (x > y) swap(x, y);
    printf("%lld %lld\n", x, y);
    return 0;
}
