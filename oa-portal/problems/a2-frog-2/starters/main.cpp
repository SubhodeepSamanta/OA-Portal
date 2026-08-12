#include <bits/stdc++.h>
using namespace std;

// h is 1-indexed. From stone i the frog jumps to any of i+1 .. i+k, paying
// |h[i] - h[j]|. Minimum total cost to reach stone n.
long long minCost(const vector<long long>& h, int k) {
    // write your code here

    (void)k;
    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> h(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &h[i]);

    printf("%lld\n", minCost(h, k));
    return 0;
}
