// Brute force - m19 / Q30
// Exhaustive assignment of every student to some interviewer with capacity 2.
// Interviewers are identical, so only the first still-empty one is ever tried.
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<long long> t, load;
vector<int> cnt;
long long best;

void rec(int i) {
    if (i == n) {
        long long mx = 0;
        for (int j = 0; j < m; j++) mx = max(mx, load[j]);
        best = min(best, mx);
        return;
    }
    for (int j = 0; j < m; j++) {
        if (cnt[j] >= 2) continue;
        if (cnt[j] == 0 && j > 0 && cnt[j - 1] == 0) break;  // identical empties
        cnt[j]++; load[j] += t[i];
        if (load[j] < best) rec(i + 1);
        load[j] -= t[i]; cnt[j]--;
    }
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    t.resize(n);
    for (auto &x : t) scanf("%lld", &x);
    load.assign(m, 0);
    cnt.assign(m, 0);
    best = LLONG_MAX;
    rec(0);
    printf("%lld\n", best);
    return 0;
}
