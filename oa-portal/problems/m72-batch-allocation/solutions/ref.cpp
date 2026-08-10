// Reference - m72 / Q167 Batch Allocation
// Total spread = (max - min) minus the gaps cut at, so cut the k-1 largest.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    sort(a.begin(), a.end());

    if (k >= n) { printf("0\n"); return 0; }

    vector<long long> gaps(n - 1);
    for (int i = 0; i + 1 < n; i++) gaps[i] = a[i + 1] - a[i];
    sort(gaps.rbegin(), gaps.rend());

    long long total = a[n - 1] - a[0];
    for (int i = 0; i < k - 1; i++) total -= gaps[i];
    printf("%lld\n", total);
    return 0;
}
