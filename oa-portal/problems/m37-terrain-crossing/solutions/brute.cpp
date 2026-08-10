// Brute force - m37 / Q110
// Completely different route to the answer: binary search the strain limit
// over the sorted list of candidate step sizes, and for each limit ask
// whether the corner is still reachable. No bottleneck recurrence anywhere.
#include <bits/stdc++.h>
using namespace std;

int r, c;
vector<vector<long long>> h;

bool reachable(long long limit) {
    vector<vector<char>> ok(r, vector<char>(c, 0));
    ok[0][0] = 1;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            if (i == 0 && j == 0) continue;
            char v = 0;
            if (i > 0 && ok[i - 1][j] && llabs(h[i][j] - h[i - 1][j]) <= limit) v = 1;
            if (j > 0 && ok[i][j - 1] && llabs(h[i][j] - h[i][j - 1]) <= limit) v = 1;
            ok[i][j] = v;
        }
    return ok[r - 1][c - 1] != 0;
}

int main() {
    if (scanf("%d %d", &r, &c) != 2) return 0;
    h.assign(r, vector<long long>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%lld", &h[i][j]);

    // every achievable strain is one of the step sizes present in the grid
    vector<long long> cand{0};
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            if (i > 0) cand.push_back(llabs(h[i][j] - h[i - 1][j]));
            if (j > 0) cand.push_back(llabs(h[i][j] - h[i][j - 1]));
        }
    sort(cand.begin(), cand.end());
    cand.erase(unique(cand.begin(), cand.end()), cand.end());

    int lo = 0, hi = (int)cand.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (reachable(cand[mid])) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", cand[lo]);
    return 0;
}
