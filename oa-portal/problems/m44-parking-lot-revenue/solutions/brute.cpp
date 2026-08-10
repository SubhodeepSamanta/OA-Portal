// Brute force - m44 / Q131
// An actual array of k bays, scanned from the first one each time. No heap,
// no counting trick - the car park as a person would run it.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> freeAt(k, 0);      // when each bay next becomes available
    long long revenue = 0;

    for (int i = 0; i < n; i++) {
        long long a, d;
        scanf("%lld %lld", &a, &d);
        int bay = -1;
        for (int j = 0; j < k; j++) if (freeAt[j] <= a) { bay = j; break; }
        if (bay >= 0) { freeAt[bay] = d; revenue += d - a; }
    }
    printf("%lld\n", revenue);
    return 0;
}
