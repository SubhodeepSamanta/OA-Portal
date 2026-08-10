// Reference - m71 / Q166 Rule Shadowing
//
// Store the covered addresses as disjoint ranges that are also never
// ADJACENT - touching ranges get merged. Then a fully covered range must sit
// inside one stored range, so the shadow test is a single lookup.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    map<long long, long long> cover;              // start -> end, inclusive
    int shadowed = 0;
    char action[16];

    for (int i = 0; i < n; i++) {
        long long l, r;
        scanf("%lld %lld %s", &l, &r, action);    // the action is irrelevant

        auto it = cover.upper_bound(l);
        if (it != cover.begin()) {
            --it;
            if (it->second >= r) { shadowed++; continue; }   // wholly inside one range
        }

        // absorb everything overlapping or touching [l, r]
        long long nl = l, nr = r;
        auto jt = cover.lower_bound(l);
        if (jt != cover.begin()) {
            auto prev = std::prev(jt);
            if (prev->second + 1 >= l) jt = prev;
        }
        while (jt != cover.end() && jt->first <= r + 1) {
            nl = min(nl, jt->first);
            nr = max(nr, jt->second);
            jt = cover.erase(jt);
        }
        cover[nl] = nr;
    }

    printf("%d\n", shadowed);
    return 0;
}
