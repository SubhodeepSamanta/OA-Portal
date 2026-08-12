// Brute force - a10 / Q98
// Actually performs the fusions: at each step it tries every adjacent pair,
// pays x + y, and recurses on the shortened row. No intervals and no split
// point, so it cannot share the reference's "the last fusion splits at k"
// reasoning - it just does the work and reports the cheapest total.
//
// Factorial, so above the bound it falls back to the same interval recurrence
// solved TOP-DOWN by memoised recursion.
#include <bits/stdc++.h>
using namespace std;

static long long bestTotal;

static void fuse(vector<long long>& row, long long spent) {
    if (spent >= bestTotal) return;                 // already worse than the best
    if (row.size() == 1) { bestTotal = min(bestTotal, spent); return; }
    for (size_t i = 0; i + 1 < row.size(); i++) {
        vector<long long> next;
        next.reserve(row.size() - 1);
        for (size_t k = 0; k < i; k++) next.push_back(row[k]);
        long long merged = row[i] + row[i + 1];
        next.push_back(merged);
        for (size_t k = i + 2; k < row.size(); k++) next.push_back(row[k]);
        fuse(next, spent + merged);
    }
}

static int n;
static vector<long long> a, pre, memo;
static vector<char> seen;

static long long best(int i, int j) {
    if (i >= j) return 0;
    size_t k = (size_t)i * n + j;
    if (seen[k]) return memo[k];
    seen[k] = 1;
    long long r = LLONG_MAX / 4;
    for (int m = i; m < j; m++) r = min(r, best(i, m) + best(m + 1, j));
    return memo[k] = r + (pre[j + 1] - pre[i]);
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    a.assign(n, 0);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    if (n <= 9) {
        vector<long long> row = a;
        bestTotal = LLONG_MAX / 4;
        fuse(row, 0);
        printf("%lld\n", bestTotal);
        return 0;
    }

    pre.assign(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    memo.assign((size_t)n * n, 0);
    seen.assign((size_t)n * n, 0);
    printf("%lld\n", best(0, n - 1));
    return 0;
}
