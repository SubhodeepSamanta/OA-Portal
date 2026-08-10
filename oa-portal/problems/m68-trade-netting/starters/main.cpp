#include <bits/stdc++.h>
using namespace std;

/* trades[j] = {a, b, x}: a owes b the amount x.
   Return one entry per clearing group: {smallest member, non-zero count,
   total moving}, ordered by smallest member. */
vector<array<long long,3>> netGroups(int n, const vector<array<long long,3>>& trades) {
    // write your code here

    return vector<array<long long,3>>();
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long,3>> trades(m);
    for (auto &t : trades) scanf("%lld %lld %lld", &t[0], &t[1], &t[2]);

    vector<array<long long,3>> groups = netGroups(n, trades);
    string out = to_string(groups.size());
    out += '\n';
    for (const auto &g : groups) {
        out += to_string(g[0]); out += ' ';
        out += to_string(g[1]); out += ' ';
        out += to_string(g[2]); out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
