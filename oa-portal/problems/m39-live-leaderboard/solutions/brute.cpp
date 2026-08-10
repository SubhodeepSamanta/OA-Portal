// Brute force - m39 / Q118
// Keep the raw scores and count by scanning every player on each RANK.
// No compression, no Fenwick tree.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> score(n + 1, 0);

    char op[16];
    string out;
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'U') {
            int p; long long s;
            scanf("%d %lld", &p, &s);
            score[p] = s;
        } else {
            int p;
            scanf("%d", &p);
            int higher = 0;
            for (int j = 1; j <= n; j++) if (score[j] > score[p]) higher++;
            out += to_string(higher);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
