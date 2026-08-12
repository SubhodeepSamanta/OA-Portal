#include <bits/stdc++.h>
using namespace std;

// h is 1-indexed. From stone i the frog jumps to i+1 or i+2, paying
// |h[i] - h[j]|. Minimum total cost to reach stone n.
long long minCost(const vector<long long>& h) {
    int n = (int)h.size() - 1;
    // write your code here

    (void)n;
    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> h(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &h[i]);

    printf("%lld\n", minCost(h));
    return 0;
}
