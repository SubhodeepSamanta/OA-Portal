// Reference - m48 / Q135 Minimum Platform Rebuild
//
// Sweep for the peak M and for the earliest/latest minute at which it is
// reached. Cancelling one train can only ever shave 1 off the peak, and only
// if that train covers every peak minute - which, since a train is one
// contiguous stretch, means covering the earliest and the latest.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> A(n), D(n);
    vector<pair<long long, int>> ev;
    ev.reserve(2 * n);
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld", &A[i], &D[i]);
        ev.push_back(make_pair(A[i], +1));
        ev.push_back(make_pair(D[i] + 1, -1));   // closed interval
    }
    sort(ev.begin(), ev.end());

    int cover = 0, peak = 0;
    long long peakL = LLONG_MAX, peakR = LLONG_MIN;
    for (size_t i = 0; i < ev.size();) {
        long long x = ev[i].first;
        while (i < ev.size() && ev[i].first == x) { cover += ev[i].second; i++; }
        if (cover == 0) continue;
        // this coverage holds over [x, nextCoord - 1]
        long long nextX = (i < ev.size()) ? ev[i].first : x + 1;
        if (cover > peak) { peak = cover; peakL = x; peakR = nextX - 1; }
        else if (cover == peak) { peakL = min(peakL, x); peakR = max(peakR, nextX - 1); }
    }

    if (peak == 0) { printf("0\n"); return 0; }

    bool canDrop = false;
    for (int i = 0; i < n && !canDrop; i++)
        if (A[i] <= peakL && D[i] >= peakR) canDrop = true;

    printf("%d\n", canDrop ? peak - 1 : peak);
    return 0;
}
