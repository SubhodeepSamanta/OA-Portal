// Brute force - c23 / Q120
// Walks the range and xors as it goes. No prefix array, no inverse argument.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &x[i]);

    string out;
    for (int i = 0; i < q; i++) {
        int a, b; scanf("%d %d", &a, &b);
        int acc = 0;
        for (int j = a; j <= b; j++) acc ^= x[j];
        out += to_string(acc);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
