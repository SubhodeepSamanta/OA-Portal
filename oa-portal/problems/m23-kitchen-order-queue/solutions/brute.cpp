// Brute force - m23 / Q45
//
// Two independent modes:
//   tiny  : exhaustive memoised search over EVERY minute-by-minute choice.
//           Nothing about "shortest remaining first" is assumed - it tries all
//           of them. This is what actually proves the greedy rule.
//   small : minute-by-minute simulation with a linear scan, no heap and no
//           event jumping - a different implementation of the same rule.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> A, C;
long long BASE;
map<pair<int, long long>, long long> memo;

long long encode(const vector<int> &rem) {
    long long code = 0;
    for (int j = 0; j < n; j++) code = code * BASE + rem[j];
    return code;
}

long long search(int t, vector<int> &rem) {
    bool allDone = true;
    for (int j = 0; j < n; j++) if (rem[j] > 0) { allDone = false; break; }
    if (allDone) return 0;

    pair<int, long long> key(t, encode(rem));
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;

    vector<int> avail;
    for (int j = 0; j < n; j++) if (rem[j] > 0 && A[j] <= t) avail.push_back(j);

    long long best = LLONG_MAX;
    if (avail.empty()) {
        long long nt = LLONG_MAX;
        for (int j = 0; j < n; j++) if (rem[j] > 0) nt = min(nt, A[j]);
        best = search((int)nt, rem);
    } else {
        for (int j : avail) {
            rem[j]--;
            long long add = (rem[j] == 0) ? (long long)(t + 1) : 0LL;
            long long sub = search(t + 1, rem);
            rem[j]++;
            if (sub != LLONG_MAX) best = min(best, add + sub);
        }
    }
    memo[key] = best;
    return best;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    A.resize(n); C.resize(n);
    long long maxA = 0, maxC = 0;
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld", &A[i], &C[i]);
        maxA = max(maxA, A[i]);
        maxC = max(maxC, C[i]);
    }

    if (n <= 5 && maxA <= 8 && maxC <= 5) {
        BASE = maxC + 1;
        vector<int> rem(n);
        for (int i = 0; i < n; i++) rem[i] = (int)C[i];
        printf("%lld\n", search(0, rem));
        return 0;
    }

    vector<long long> rem = C;
    long long t = 0, total = 0;
    int done = 0;
    while (done < n) {
        int pick = -1;
        for (int j = 0; j < n; j++)
            if (rem[j] > 0 && A[j] <= t && (pick < 0 || rem[j] < rem[pick])) pick = j;
        if (pick < 0) {
            long long nt = LLONG_MAX;
            for (int j = 0; j < n; j++) if (rem[j] > 0) nt = min(nt, A[j]);
            t = nt;
            continue;
        }
        rem[pick]--;
        t++;
        if (rem[pick] == 0) { total += t; done++; }
    }
    printf("%lld\n", total);
    return 0;
}
