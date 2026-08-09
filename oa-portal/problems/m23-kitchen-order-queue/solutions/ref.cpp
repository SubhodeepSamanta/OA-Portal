// Reference - m23 / Q45 Kitchen Order Queue
// Event-driven shortest-remaining-time-first. Between arrivals the chef never
// switches, so the whole shift collapses to at most 2n events.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long, long long>> job(n);      // (arrival, cook minutes)
    for (int i = 0; i < n; i++) scanf("%lld %lld", &job[i].first, &job[i].second);
    sort(job.begin(), job.end());

    const long long INF = LLONG_MAX / 4;
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    long long t = 0, total = 0;
    int i = 0;

    while (i < n || !pq.empty()) {
        if (pq.empty()) t = max(t, job[i].first);
        while (i < n && job[i].first <= t) pq.push(job[i++].second);

        long long rem = pq.top(); pq.pop();
        long long nextArrival = (i < n) ? job[i].first : INF;

        if (t + rem <= nextArrival) {
            t += rem;
            total += t;                    // this order finishes at t
        } else {
            pq.push(rem - (nextArrival - t));
            t = nextArrival;
        }
    }
    printf("%lld\n", total);
    return 0;
}
