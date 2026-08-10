// Reference - m73 / Q168 Signal Reconstruction
// The block is forced by the first and last failures to increase; reverse it
// and verify, because the candidate is not always a repair.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    int first = -1, last = -1;
    for (int i = 0; i + 1 < n; i++)
        if (a[i] >= a[i + 1]) { if (first < 0) first = i; last = i; }

    if (first < 0) { printf("1 1\n"); return 0; }   // already strictly increasing

    int l = first, r = last + 1;
    reverse(a.begin() + l, a.begin() + r + 1);
    for (int i = 0; i + 1 < n; i++)
        if (a[i] >= a[i + 1]) { printf("-1\n"); return 0; }

    printf("%d %d\n", l + 1, r + 1);
    return 0;
}
