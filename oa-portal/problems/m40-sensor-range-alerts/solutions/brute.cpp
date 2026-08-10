// Brute force - m40 / Q119
// A plain array touched element by element. No tree, no lazy anything.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);

    char op[16];
    string out;
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'A') {
            int l, r; long long x;
            scanf("%d %d %lld", &l, &r, &x);
            for (int j = l; j <= r; j++) a[j] += x;
        } else {
            int l, r;
            scanf("%d %d", &l, &r);
            long long best = LLONG_MIN;
            for (int j = l; j <= r; j++) best = max(best, a[j]);
            out += to_string(best);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
