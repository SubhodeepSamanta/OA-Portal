// Brute force - c1 / Q10
// Every subarray, summed directly. No prefix sums, no residue counting.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    long long ans = 0;
    for (int i = 0; i < n; i++) {
        long long s = 0;
        for (int j = i; j < n; j++) {
            s += a[j];
            if (s % n == 0) ans++;
        }
    }
    printf("%lld\n", ans);
    return 0;
}
