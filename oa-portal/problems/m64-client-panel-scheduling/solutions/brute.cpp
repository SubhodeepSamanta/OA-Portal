// Brute force - m64 / Q159
//
// tiny  : every subset of meetings, checked pairwise for overlap. Assumes
//         nothing about sorting or about which meeting to prefer.
// larger: an O(n^2) scan for the predecessor instead of a binary search.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> S(n), E(n), V(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld %lld", &S[i], &E[i], &V[i]);

    if (n <= 18) {
        long long best = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            bool ok = true;
            long long total = 0;
            vector<int> take;
            for (int i = 0; i < n && ok; i++) if (mask & (1 << i)) take.push_back(i);
            for (size_t a = 0; a < take.size() && ok; a++)
                for (size_t b = a + 1; b < take.size() && ok; b++) {
                    int i = take[a], j = take[b];
                    if (S[i] < E[j] && S[j] < E[i]) ok = false;   // genuine overlap
                }
            if (!ok) continue;
            for (int i : take) total += V[i];
            best = max(best, total);
        }
        printf("%lld\n", best);
        return 0;
    }

    vector<array<long long, 3>> job(n);
    for (int i = 0; i < n; i++) job[i] = {E[i], S[i], V[i]};
    sort(job.begin(), job.end());
    vector<long long> best(n + 1, 0);
    for (int i = 0; i < n; i++) {
        int p = 0;
        for (int j = 0; j < i; j++) if (job[j][0] <= job[i][1]) p = j + 1;
        best[i + 1] = max(best[i], best[p] + job[i][2]);
    }
    printf("%lld\n", best[n]);
    return 0;
}
