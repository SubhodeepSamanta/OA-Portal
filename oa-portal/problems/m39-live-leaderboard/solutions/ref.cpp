// Reference - m39 / Q118 Live Leaderboard
// Read the whole event list first, compress the score axis, then keep a
// Fenwick tree counting how many players sit at each compressed score.
#include <bits/stdc++.h>
using namespace std;

int FN;
vector<int> fen;
void fadd(int i, int v) { for (; i <= FN; i += i & -i) fen[i] += v; }
int fpre(int i) { int s = 0; for (; i > 0; i -= i & -i) s += fen[i]; return s; }

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    vector<int> type(q), who(q);
    vector<long long> val(q, 0);
    vector<long long> coords;
    coords.reserve(q + 1);
    coords.push_back(0);                       // everybody starts here

    char op[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'U') {
            type[i] = 1;
            scanf("%d %lld", &who[i], &val[i]);
            coords.push_back(val[i]);
        } else {
            type[i] = 0;
            scanf("%d", &who[i]);
        }
    }

    sort(coords.begin(), coords.end());
    coords.erase(unique(coords.begin(), coords.end()), coords.end());
    auto idx = [&](long long s) {
        return (int)(lower_bound(coords.begin(), coords.end(), s) - coords.begin()) + 1;
    };

    FN = (int)coords.size();
    fen.assign(FN + 2, 0);

    int zero = idx(0);
    vector<int> at(n + 1, zero);
    fadd(zero, n);                             // all n players start on 0

    string out;
    out.reserve((size_t)q * 7);
    for (int i = 0; i < q; i++) {
        if (type[i] == 1) {
            int p = who[i], ni = idx(val[i]);
            if (ni != at[p]) { fadd(at[p], -1); fadd(ni, 1); at[p] = ni; }
        } else {
            int p = who[i];
            out += to_string(n - fpre(at[p]));  // total minus those at or below
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
