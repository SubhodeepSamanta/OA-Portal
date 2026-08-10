// Brute force - m50 / Q137
//
// tiny  : try every way of handing coupons to items, including using fewer
//         than all of them. Assumes nothing about sorting.
// larger: a different exact method - repeatedly give the best remaining
//         coupon to the best remaining item, chosen by an explicit scan.
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<long long> p, d;
long long best;

void rec(int item, vector<char> &used, long long saved) {
    if (item == n) { best = max(best, saved); return; }
    rec(item + 1, used, saved);                       // this item gets nothing
    for (int j = 0; j < m; j++) {
        if (used[j]) continue;
        used[j] = 1;
        rec(item + 1, used, saved + p[item] * d[j]);
        used[j] = 0;
    }
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    p.resize(n); d.resize(m);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &p[i]); total += p[i]; }
    for (int j = 0; j < m; j++) scanf("%lld", &d[j]);

    if (n <= 7 && m <= 7) {
        vector<char> used(m, 0);
        best = 0;
        rec(0, used, 0);
        printf("%lld\n", 100LL * total - best);
        return 0;
    }

    vector<char> itemUsed(n, 0), coupUsed(m, 0);
    long long saved = 0;
    for (int step = 0; step < min(n, m); step++) {
        int bi = -1, bj = -1;
        for (int i = 0; i < n; i++) if (!itemUsed[i] && (bi < 0 || p[i] > p[bi])) bi = i;
        for (int j = 0; j < m; j++) if (!coupUsed[j] && (bj < 0 || d[j] > d[bj])) bj = j;
        itemUsed[bi] = 1; coupUsed[bj] = 1;
        saved += p[bi] * d[bj];
    }
    printf("%lld\n", 100LL * total - saved);
    return 0;
}
