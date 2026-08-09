// Reference - m15 / Q107 Ad Slot Revenue, O(n)
//
// dp[took][used] = best revenue for the prefix processed so far, where
//   took = whether slot i was sold
//   used = whether the one-time concession has been spent
//
//   not selling i : carry the best of both previous states
//   selling i, concession still unspent : previous slot must be unsold
//   selling i, concession already spent : previous unsold, OR previous sold
//                                         and we spend the concession NOW
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> p(n);
    for (auto &x : p) cin >> x;

    const long long NEG = LLONG_MIN / 4;
    // states: no0 = not sold/unused, yes0 = sold/unused,
    //         no1 = not sold/used,   yes1 = sold/used
    long long no0 = 0, yes0 = p[0], no1 = NEG, yes1 = NEG;

    for (int i = 1; i < n; i++) {
        long long nno0 = max(no0, yes0);
        long long nyes0 = no0 + p[i];

        long long nno1 = max(no1, yes1);
        long long nyes1 = NEG;
        if (no1 > NEG) nyes1 = max(nyes1, no1 + p[i]);   // concession spent earlier
        if (yes0 > NEG) nyes1 = max(nyes1, yes0 + p[i]); // spend it right here

        no0 = nno0; yes0 = nyes0; no1 = nno1; yes1 = nyes1;
    }

    cout << max(max(no0, yes0), max(no1, yes1)) << '\n';
    return 0;
}
