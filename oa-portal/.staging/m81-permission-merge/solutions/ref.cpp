// Reference - m81 / Q184 Permission Merge
// Count masks, then a sum-over-supersets pass so cnt[m] becomes "how many
// roles are supersets of m". A pair works when one is a superset of the
// other's complement.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, b;
    if (scanf("%d %d", &n, &b) != 2) return 0;
    int FULL = (1 << b) - 1;

    vector<int> mask(n);
    vector<long long> cnt(1 << b, 0);
    for (int i = 0; i < n; i++) { scanf("%d", &mask[i]); cnt[mask[i]]++; }

    // supersets: push each count down into the mask without that bit
    for (int bit = 0; bit < b; bit++)
        for (int m = 0; m <= FULL; m++)
            if (!(m & (1 << bit))) cnt[m] += cnt[m | (1 << bit)];

    long long total = 0, selfCover = 0;
    for (int i = 0; i < n; i++) {
        total += cnt[FULL ^ mask[i]];              // partners covering the gap
        if (mask[i] == FULL) selfCover++;          // counted itself
    }

    printf("%lld\n", (total - selfCover) / 2);
    return 0;
}
