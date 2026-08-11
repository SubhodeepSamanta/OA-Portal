// Reference - m89 / Q210 Split the Load
// Meet in the middle: all subset sums of each half, then for every left sum
// binary search the right side for the partner closest to half the total.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> w(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &w[i]); total += w[i]; }

    int half = n / 2, rest = n - half;

    vector<long long> A(1 << half), B(1 << rest);
    for (int m = 0; m < (1 << half); m++) {
        long long s = 0;
        for (int i = 0; i < half; i++) if (m & (1 << i)) s += w[i];
        A[m] = s;
    }
    for (int m = 0; m < (1 << rest); m++) {
        long long s = 0;
        for (int i = 0; i < rest; i++) if (m & (1 << i)) s += w[half + i];
        B[m] = s;
    }
    sort(B.begin(), B.end());

    long long best = LLONG_MAX;
    for (long long a : A) {
        // want a + b as close as possible to total/2
        long long target = (total + 1) / 2 - a;
        int lo = (int)(lower_bound(B.begin(), B.end(), target) - B.begin());
        for (int k = max(0, lo - 1); k <= min((int)B.size() - 1, lo + 1); k++) {
            long long chosen = a + B[k];
            best = min(best, llabs(total - 2 * chosen));
        }
    }
    printf("%lld\n", best);
    return 0;
}
