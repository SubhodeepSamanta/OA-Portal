// Brute force - m89 / Q210
// n <= 20: every subset of the whole set, scored directly.
// Above that 2^n is out of reach, so it falls back to halving with a
// two-pointer sweep instead of the reference's binary search - same idea,
// different index arithmetic, which is what makes it worth comparing.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> w(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &w[i]); total += w[i]; }

    long long best = LLONG_MAX;

    if (n <= 20) {
        for (long long mask = 0; mask < (1LL << n); mask++) {
            long long s = 0;
            for (int i = 0; i < n; i++) if (mask & (1LL << i)) s += w[i];
            best = min(best, llabs(total - 2 * s));
        }
        printf("%lld\n", best);
        return 0;
    }

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
    sort(A.begin(), A.end());
    sort(B.begin(), B.end());

    // closest pair sum to total/2, walking A forwards and B backwards
    long long target = total / 2;
    int i = 0, j = (int)B.size() - 1;
    while (i < (int)A.size() && j >= 0) {
        long long s = A[i] + B[j];
        best = min(best, llabs(total - 2 * s));
        if (s < target) i++; else j--;
    }
    printf("%lld\n", best);
    return 0;
}
