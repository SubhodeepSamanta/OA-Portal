#include <bits/stdc++.h>
using namespace std;

/* initial[i] = {p, c} for gateway i+1.
   ops[j] = {type, a, b}: type 0 is ADD (a=p, b=c), type 1 is REMOVE (a=id),
   type 2 is ROUTE (a=r). Return one answer per ROUTE, in order. */
vector<long long> answerRoutes(const vector<pair<long long,long long>>& initial,
                               const vector<array<long long,3>>& ops) {
    // write your code here

    return vector<long long>();
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<pair<long long,long long>> initial(n);
    for (auto &g : initial) scanf("%lld %lld", &g.first, &g.second);

    vector<array<long long,3>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'A') { ops[i][0] = 0; scanf("%lld %lld", &ops[i][1], &ops[i][2]); }
        else if (word[1] == 'E') { ops[i][0] = 1; scanf("%lld", &ops[i][1]); ops[i][2] = 0; }
        else { ops[i][0] = 2; scanf("%lld", &ops[i][1]); ops[i][2] = 0; }
    }

    string out;
    for (long long v : answerRoutes(initial, ops)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
