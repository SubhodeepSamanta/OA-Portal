// Brute force - m29 / Q73
// No topological order at all: repeatedly sweep every rule pushing start times
// forward until nothing moves. If it is still moving after n+1 full sweeps,
// some task is waiting on itself.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> t(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &t[i]);
    vector<int> A(m), B(m);
    for (int i = 0; i < m; i++) scanf("%d %d", &A[i], &B[i]);

    vector<long long> start(n + 1, 0);
    bool changed = true;
    int sweeps = 0;
    while (changed) {
        changed = false;
        sweeps++;
        if (sweeps > n + 1) { printf("-1\n"); return 0; }
        for (int i = 0; i < m; i++) {
            long long fin = start[A[i]] + t[A[i]];
            if (fin > start[B[i]]) { start[B[i]] = fin; changed = true; }
        }
    }

    long long best = 0;
    for (int i = 1; i <= n; i++) best = max(best, start[i] + t[i]);
    printf("%lld\n", best);
    return 0;
}
