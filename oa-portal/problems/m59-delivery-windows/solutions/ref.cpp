// Reference - m59 / Q154 Delivery Windows
//
// Sort by deadline, then give each parcel the earliest still-free hour at or
// after its start. "Earliest free hour" is a path-compressed chain over the
// hours actually taken, so the 10^9 range is never materialised.
#include <bits/stdc++.h>
using namespace std;

unordered_map<long long, long long> nextFree;

long long findFree(long long x) {
    // iterative so a long chain cannot overflow the stack
    vector<long long> path;
    while (true) {
        auto it = nextFree.find(x);
        if (it == nextFree.end()) break;
        path.push_back(x);
        x = it->second;
    }
    for (long long p : path) nextFree[p] = x;      // compress
    return x;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long, long long>> job(n);     // (deadline, start)
    for (int i = 0; i < n; i++) {
        long long s, e;
        scanf("%lld %lld", &s, &e);
        job[i] = make_pair(e, s);
    }
    sort(job.begin(), job.end());
    nextFree.reserve(n * 2);

    int done = 0;
    for (int i = 0; i < n; i++) {
        long long e = job[i].first, s = job[i].second;
        long long t = findFree(s);
        if (t <= e) { nextFree[t] = t + 1; done++; }
    }
    printf("%d\n", done);
    return 0;
}
