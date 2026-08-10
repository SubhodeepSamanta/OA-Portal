// Reference - m49 / Q136 Equalise the Shelves
// Each gap between shelf i and i+1 is crossed exactly
// |prefix[i] - i*average| times, and the gaps are independent.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); total += a[i]; }

    if (total % n != 0) { printf("-1\n"); return 0; }
    long long avg = total / n;

    long long prefix = 0, ops = 0;
    for (int i = 0; i < n - 1; i++) {
        prefix += a[i];
        ops += llabs(prefix - (long long)(i + 1) * avg);
    }
    printf("%lld\n", ops);
    return 0;
}
