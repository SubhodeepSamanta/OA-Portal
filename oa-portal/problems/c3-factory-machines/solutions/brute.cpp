// Brute force - c3 / Q26
//
// For small t it simulates the factory directly: a min-heap holds the moment
// each machine finishes its next product; pop t times and the last time popped
// is the answer. No binary search, no predicate, no monotonicity argument -
// genuinely different machinery from the reference.
//
// t can be 1e9 on inputs that are only a few bytes long, which the simulation
// cannot survive. Those fall back to the same binary search but with the count
// carried in __int128 instead of an early break. That shares the reference's
// idea, so it is a weaker check - but it is precisely the arrangement that
// catches the overflow bug this problem is built around, and every case small
// enough to simulate is still checked the honest way.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, t;
    if (scanf("%lld %lld", &n, &t) != 2) return 0;
    vector<long long> k(n);
    long long mn = LLONG_MAX;
    for (long long i = 0; i < n; i++) { scanf("%lld", &k[i]); mn = min(mn, k[i]); }

    if (t <= 200000) {
        // (time this machine finishes its next product, its per-product cost)
        priority_queue<pair<long long, long long>,
                       vector<pair<long long, long long>>,
                       greater<pair<long long, long long>>> pq;
        for (long long i = 0; i < n; i++) pq.push({ k[i], k[i] });

        long long last = 0;
        for (long long made = 0; made < t; made++) {
            auto [when, cost] = pq.top();
            pq.pop();
            last = when;
            pq.push({ when + cost, cost });
        }
        printf("%lld\n", last);
        return 0;
    }

    auto enough = [&](long long T) {
        __int128 made = 0;
        for (long long i = 0; i < n; i++) made += T / k[i];
        return made >= (__int128)t;
    };

    long long lo = 1, hi = t * mn;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (enough(mid)) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
