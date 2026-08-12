// Reference - c23 / Q120 Range Xor Queries (CSES 1650)
// Prefix xor: xor(a..b) = p[b] ^ p[a-1], since v ^ v = 0 makes every value
// its own inverse. The array is static, so nothing more is needed.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    vector<int> p(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int v; scanf("%d", &v);
        p[i] = p[i - 1] ^ v;
    }

    string out;
    out.reserve(q * 8);
    for (int i = 0; i < q; i++) {
        int a, b; scanf("%d %d", &a, &b);
        out += to_string(p[b] ^ p[a - 1]);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
