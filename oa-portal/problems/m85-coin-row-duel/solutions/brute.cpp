// Brute force - m85 / Q206
//
// tiny  : plain recursion over every line of play, no memo and no table.
// larger: a different formulation - track the DIFFERENCE the player to move
//         can force, then convert once at the end. Same answer, different
//         recurrence, so it checks the reference rather than restating it.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> v;

// most the player to move can collect from i..j
long long play(int i, int j) {
    if (i > j) return 0;
    if (i == j) return v[i];
    long long rest;
    rest = 0;
    for (int t = i + 1; t <= j; t++) rest += v[t];
    long long takeLeft = v[i] + (rest - play(i + 1, j));
    rest = 0;
    for (int t = i; t <= j - 1; t++) rest += v[t];
    long long takeRight = v[j] + (rest - play(i, j - 1));
    return max(takeLeft, takeRight);
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    v.resize(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &v[i]); total += v[i]; }

    if (n <= 16) { printf("%lld\n", play(0, n - 1)); return 0; }

    // diff[i][j] = best achievable (mine - theirs) from i..j
    vector<vector<long long>> diff(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) diff[i][i] = v[i];
    for (int len = 2; len <= n; len++)
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            diff[i][j] = max(v[i] - diff[i + 1][j], v[j] - diff[i][j - 1]);
        }

    printf("%lld\n", (total + diff[0][n - 1]) / 2);
    return 0;
}
