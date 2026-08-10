// Brute force - m71 / Q166
// For each rule, gather every earlier range, merge them from scratch, and
// check containment. O(n^2 log n), and free of the adjacency insight.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> L(n), Rr(n);
    char action[16];
    for (int i = 0; i < n; i++) scanf("%lld %lld %s", &L[i], &Rr[i], action);

    int shadowed = 0;
    for (int i = 0; i < n; i++) {
        vector<pair<long long, long long>> iv;
        for (int j = 0; j < i; j++) iv.push_back(make_pair(L[j], Rr[j]));
        sort(iv.begin(), iv.end());

        // is [L[i], Rr[i]] fully covered by the union of iv?
        long long need = L[i];
        for (size_t k = 0; k < iv.size() && need <= Rr[i]; k++) {
            if (iv[k].first > need) break;              // gap
            if (iv[k].second >= need) need = iv[k].second + 1;
        }
        if (need > Rr[i]) shadowed++;
    }

    printf("%d\n", shadowed);
    return 0;
}
