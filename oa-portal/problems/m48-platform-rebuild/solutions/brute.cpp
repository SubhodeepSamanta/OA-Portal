// Brute force - m48 / Q135
// Actually try cancelling each train in turn (and cancelling none), and
// recompute the peak overlap from scratch every time. No reasoning about
// where the peak sits.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> A, D;

int peakWithout(int skip) {
    vector<pair<long long, int>> ev;
    for (int i = 0; i < n; i++) {
        if (i == skip) continue;
        ev.push_back(make_pair(A[i], +1));
        ev.push_back(make_pair(D[i] + 1, -1));
    }
    sort(ev.begin(), ev.end());
    int cover = 0, peak = 0;
    for (size_t i = 0; i < ev.size(); i++) { cover += ev[i].second; peak = max(peak, cover); }
    return peak;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    A.resize(n); D.resize(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &A[i], &D[i]);

    int best = peakWithout(-1);
    for (int i = 0; i < n; i++) best = min(best, peakWithout(i));
    printf("%d\n", best);
    return 0;
}
