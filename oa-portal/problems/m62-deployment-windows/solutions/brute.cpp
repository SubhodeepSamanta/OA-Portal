// Brute force - m62 / Q157
//
// The counting condition instead of a simulation: for every interval [a, b]
// drawn from the window endpoints, the services whose windows lie entirely
// inside it must all fit within b - a. That is necessary and sufficient for
// preemptive feasibility on one machine, and it shares no code with EDF.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> L(n), Rr(n), T(n);
    vector<long long> pts;
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld %lld", &L[i], &Rr[i], &T[i]);
        pts.push_back(L[i]);
        pts.push_back(Rr[i]);
    }
    sort(pts.begin(), pts.end());
    pts.erase(unique(pts.begin(), pts.end()), pts.end());

    for (size_t a = 0; a < pts.size(); a++)
        for (size_t b = a + 1; b < pts.size(); b++) {
            long long lo = pts[a], hi = pts[b], need = 0;
            for (int i = 0; i < n; i++)
                if (L[i] >= lo && Rr[i] <= hi) need += T[i];
            if (need > hi - lo) { printf("NO\n"); return 0; }
        }

    // also catches n == 1 and any service too big for its own window
    for (int i = 0; i < n; i++)
        if (T[i] > Rr[i] - L[i]) { printf("NO\n"); return 0; }

    printf("YES\n");
    return 0;
}
