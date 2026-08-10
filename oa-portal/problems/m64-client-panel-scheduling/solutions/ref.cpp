// Reference - m64 / Q159 Client Panel Scheduling
// Sort by end time; best[i] = max(best[i-1], v[i] + best[last meeting ending
// at or before s[i]]), with that predecessor found by binary search.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 3>> job(n);          // end, start, value
    for (int i = 0; i < n; i++) {
        long long s, e, v;
        scanf("%lld %lld %lld", &s, &e, &v);
        job[i] = {e, s, v};
    }
    sort(job.begin(), job.end());

    vector<long long> ends(n);
    for (int i = 0; i < n; i++) ends[i] = job[i][0];

    vector<long long> best(n + 1, 0);            // best[i] over the first i meetings
    for (int i = 0; i < n; i++) {
        // rightmost meeting whose end is <= this one's start
        int p = (int)(upper_bound(ends.begin(), ends.begin() + i, job[i][1]) - ends.begin());
        best[i + 1] = max(best[i], best[p] + job[i][2]);
    }
    printf("%lld\n", best[n]);
    return 0;
}
