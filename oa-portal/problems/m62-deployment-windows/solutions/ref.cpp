// Reference - m62 / Q157 Deployment Windows
// Preemptive earliest-deadline-first, jumping between events rather than
// stepping minutes. EDF is optimal for this feasibility question, so a missed
// deadline under EDF means no schedule exists at all.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 3>> job(n);          // l, r, t
    for (int i = 0; i < n; i++)
        scanf("%lld %lld %lld", &job[i][0], &job[i][1], &job[i][2]);

    for (int i = 0; i < n; i++)
        if (job[i][2] > job[i][1] - job[i][0]) { printf("NO\n"); return 0; }

    sort(job.begin(), job.end());                 // by window opening

    const long long INF = LLONG_MAX / 4;
    // (deadline, remaining work) - smallest deadline first
    priority_queue<pair<long long, long long>, vector<pair<long long, long long>>,
                   greater<pair<long long, long long>>> pq;

    long long now = 0;
    int i = 0;
    while (i < n || !pq.empty()) {
        if (pq.empty()) now = max(now, job[i][0]);
        while (i < n && job[i][0] <= now) { pq.push(make_pair(job[i][1], job[i][2])); i++; }

        pair<long long, long long> cur = pq.top(); pq.pop();
        long long deadline = cur.first, rem = cur.second;
        long long nextOpen = (i < n) ? job[i][0] : INF;

        if (now + rem <= nextOpen) {
            now += rem;
            if (now > deadline) { printf("NO\n"); return 0; }
        } else {
            pq.push(make_pair(deadline, rem - (nextOpen - now)));
            now = nextOpen;
        }
    }
    printf("YES\n");
    return 0;
}
