// Brute force - m55 / Q150
// Keep a flat list of gateways with an in-service flag and scan all of them
// on every ROUTE. No compression, no tree.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    vector<long long> P, C;
    vector<char> live;
    for (int i = 0; i < n; i++) {
        long long p, c;
        scanf("%lld %lld", &p, &c);
        P.push_back(p); C.push_back(c); live.push_back(1);
    }

    string out;
    char op[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'A') {
            long long p, c;
            scanf("%lld %lld", &p, &c);
            P.push_back(p); C.push_back(c); live.push_back(1);
        } else if (op[0] == 'R' && op[1] == 'E') {
            int id;
            scanf("%d", &id);
            live[id - 1] = 0;
        } else {
            long long r;
            scanf("%lld", &r);
            long long best = -1;
            for (size_t j = 0; j < P.size(); j++)
                if (live[j] && P[j] >= r && (best < 0 || C[j] < best)) best = C[j];
            out += to_string(best);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
