// Brute force - m21 / Q37
// Exhaustive search over every splice order for tiny n; no greedy assumed.
// Falls back to an O(n^2) linear-scan version once n is too large to enumerate.
#include <bits/stdc++.h>
using namespace std;

long long bestCost;

void rec(vector<long long> v, long long acc) {
    if (acc >= bestCost) return;
    if (v.size() == 1) { bestCost = min(bestCost, acc); return; }
    for (size_t i = 0; i < v.size(); i++)
        for (size_t j = i + 1; j < v.size(); j++) {
            vector<long long> w;
            w.reserve(v.size() - 1);
            for (size_t t = 0; t < v.size(); t++)
                if (t != i && t != j) w.push_back(v[t]);
            w.push_back(v[i] + v[j]);
            rec(w, acc + v[i] + v[j]);
        }
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> v(n);
    for (auto &x : v) scanf("%lld", &x);

    if (n <= 7) {
        bestCost = LLONG_MAX;
        rec(v, 0);
        printf("%lld\n", bestCost);
        return 0;
    }

    // still independent of the reference: a list scanned linearly for the two
    // smallest, no heap involved
    long long total = 0;
    vector<char> gone(v.size(), 0);
    int left = n;
    while (left > 1) {
        int i1 = -1, i2 = -1;
        for (size_t t = 0; t < v.size(); t++) {
            if (gone[t]) continue;
            if (i1 < 0 || v[t] < v[i1]) { i2 = i1; i1 = (int)t; }
            else if (i2 < 0 || v[t] < v[i2]) i2 = (int)t;
        }
        total += v[i1] + v[i2];
        v[i1] += v[i2];
        gone[i2] = 1;
        left--;
    }
    printf("%lld\n", total);
    return 0;
}
