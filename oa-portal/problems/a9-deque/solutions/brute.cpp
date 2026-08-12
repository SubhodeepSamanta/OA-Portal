// Brute force - a9 / Q97
// Plays the game out. Every sequence of front/back choices is explored and
// each player is scored separately, then the margin is taken at the end -
// no table, and no "margin" trick, so it cannot inherit the reference's
// sign convention if that convention is wrong.
//
// Exponential, so above the bound it falls back to the same recurrence solved
// TOP-DOWN by memoised recursion, which visits the intervals depth-first
// rather than in order of increasing length.
#include <bits/stdc++.h>
using namespace std;

static int n;
static vector<long long> a;

/** Returns {scoreOfPlayerToMove, scoreOfTheOther} under optimal play. */
static pair<long long, long long> play(int i, int j) {
    if (i > j) return { 0, 0 };
    // take the front: I get a[i], then the opponent moves on (i+1, j)
    auto f = play(i + 1, j);
    long long frontMine = a[i] + f.second, frontTheirs = f.first;
    // take the back
    auto b = play(i, j - 1);
    long long backMine = a[j] + b.second, backTheirs = b.first;

    // the player to move maximises their own margin
    if (frontMine - frontTheirs >= backMine - backTheirs) return { frontMine, frontTheirs };
    return { backMine, backTheirs };
}

static vector<long long> memo;
static vector<char> seen;

static long long margin(int i, int j) {
    if (i > j) return 0;
    size_t k = (size_t)i * n + j;
    if (seen[k]) return memo[k];
    seen[k] = 1;
    return memo[k] = max(a[i] - margin(i + 1, j), a[j] - margin(i, j - 1));
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    a.assign(n, 0);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

    if (n <= 20) {
        auto r = play(0, n - 1);
        printf("%lld\n", r.first - r.second);
        return 0;
    }

    memo.assign((size_t)n * n, 0);
    seen.assign((size_t)n * n, 0);
    printf("%lld\n", margin(0, n - 1));
    return 0;
}
