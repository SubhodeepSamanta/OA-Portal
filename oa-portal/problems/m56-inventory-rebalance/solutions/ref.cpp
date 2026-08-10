// Reference - m56 / Q151 Inventory Rebalance
//
// Cost = sum over boundaries of |A[i] - R[i]| where A[i] = prefix[i] - i*m,
// and R must be non-decreasing inside [0, total - n*m].
//
// Clamping A into the box costs a fixed amount no choice of R can avoid, and
// leaves an unconstrained L1 isotonic regression - which is the standard
// max-heap slope trick.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long m;
    if (scanf("%d %lld", &n, &m) != 2) return 0;
    vector<long long> s(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &s[i]); total += s[i]; }

    if (total < (long long)n * m) { printf("-1\n"); return 0; }
    long long cap = total - (long long)n * m;      // R[n], and the box ceiling

    long long cost = 0, prefix = 0;
    priority_queue<long long> pq;                  // max-heap
    for (int i = 1; i <= n - 1; i++) {
        prefix += s[i - 1];
        long long A = prefix - (long long)i * m;

        if (A < 0) { cost += -A; A = 0; }          // clamp into the box
        else if (A > cap) { cost += A - cap; A = cap; }

        pq.push(A);
        if (pq.top() > A) { cost += pq.top() - A; pq.pop(); pq.push(A); }
    }

    printf("%lld\n", cost);
    return 0;
}
