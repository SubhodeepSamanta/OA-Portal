#include <bits/stdc++.h>
using namespace std;

/* ops[i] = {type, player, score}: type 1 is UPDATE (score is meaningful),
   type 0 is RANK (score is 0 and unused).
   Return one answer per RANK operation, in order. */
vector<long long> answerRanks(int n, const vector<array<long long,3>>& ops) {
    // write your code here

    return vector<long long>();
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<array<long long,3>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'U') { ops[i][0] = 1; scanf("%lld %lld", &ops[i][1], &ops[i][2]); }
        else { ops[i][0] = 0; scanf("%lld", &ops[i][1]); ops[i][2] = 0; }
    }

    string out;
    for (long long v : answerRanks(n, ops)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
