#include <bits/stdc++.h>
using namespace std;

/* a[i] is sensor i+1's starting reading.
   ops[i] = {type, l, r, x}: type 1 is ADD (x is the amount), type 0 is MAX
   (x is 0 and unused). Return one answer per MAX operation, in order. */
vector<long long> answerMaxQueries(const vector<long long>& a,
                                   const vector<array<long long,4>>& ops) {
    // write your code here

    return vector<long long>();
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);
    vector<array<long long,4>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'A') { ops[i][0] = 1; scanf("%lld %lld %lld", &ops[i][1], &ops[i][2], &ops[i][3]); }
        else { ops[i][0] = 0; scanf("%lld %lld", &ops[i][1], &ops[i][2]); ops[i][3] = 0; }
    }

    string out;
    for (long long v : answerMaxQueries(a, ops)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
