// Reference - m65 / Q160 Cohort Bucketing
// Collapse equal scores into counts, then binary search the largest bucket
// size with a one-pass greedy feasibility test.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<int> s(n);
    for (int i = 0; i < n; i++) scanf("%d", &s[i]);
    sort(s.begin(), s.end());

    vector<long long> counts;
    for (int i = 0; i < n;) {
        int j = i;
        while (j < n && s[j] == s[i]) j++;
        counts.push_back(j - i);
        i = j;
    }

    long long lo = 0, hi = 0;
    for (long long c : counts) { lo = max(lo, c); hi += c; }

    auto feasible = [&](long long cap) {
        long long pieces = 1, cur = 0;
        for (long long c : counts) {
            if (cur + c <= cap) cur += c;
            else { pieces++; cur = c; if (pieces > k) return false; }
        }
        return pieces <= k;
    };

    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (feasible(mid)) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
