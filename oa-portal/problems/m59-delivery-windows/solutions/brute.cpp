// Brute force - m59 / Q154
//
// tiny  : maximum bipartite matching between parcels and the individual
//         hours they could use. Nothing is assumed about deadline ordering
//         or about which hour to pick - it is the definition of "how many
//         can be delivered at once".
// larger: the same greedy as the reference but with a plain linear scan for
//         the first free hour, for cases too big to enumerate hours.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> S, E;
vector<vector<int>> can;        // parcel -> list of usable hour indices
vector<int> takenBy;
vector<char> tried;

bool augment(int p) {
    for (int h : can[p]) {
        if (tried[h]) continue;
        tried[h] = 1;
        if (takenBy[h] < 0 || augment(takenBy[h])) { takenBy[h] = p; return true; }
    }
    return false;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    S.resize(n); E.resize(n);
    long long lo = LLONG_MAX, hi = LLONG_MIN;
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld", &S[i], &E[i]);
        lo = min(lo, S[i]);
        hi = max(hi, E[i]);
    }

    if (hi - lo + 1 <= 200 && n <= 40) {
        int H = (int)(hi - lo + 1);
        can.assign(n, {});
        for (int i = 0; i < n; i++)
            for (long long t = S[i]; t <= E[i]; t++) can[i].push_back((int)(t - lo));
        takenBy.assign(H, -1);
        int done = 0;
        for (int i = 0; i < n; i++) {
            tried.assign(H, 0);
            if (augment(i)) done++;
        }
        printf("%d\n", done);
        return 0;
    }

    vector<pair<long long, long long>> job(n);
    for (int i = 0; i < n; i++) job[i] = make_pair(E[i], S[i]);
    sort(job.begin(), job.end());
    set<long long> used;
    int done = 0;
    for (int i = 0; i < n; i++) {
        long long t = job[i].second;
        while (used.count(t)) t++;
        if (t <= job[i].first) { used.insert(t); done++; }
    }
    printf("%d\n", done);
    return 0;
}
