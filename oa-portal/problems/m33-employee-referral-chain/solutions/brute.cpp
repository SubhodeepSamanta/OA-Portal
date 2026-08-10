// Brute force - m33 / Q76
// Walk every employee's chain individually with a seen-marker, counting
// distinct people until one repeats. O(n^2), assumes nothing about shape.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> f(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &f[i]);

    vector<int> seen(n + 1, 0);
    string out;
    for (int s = 1; s <= n; s++) {
        long long count = 0;
        int u = s;
        while (seen[u] != s) { seen[u] = s; count++; u = f[u]; }
        if (s > 1) out += ' ';
        out += to_string(count);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
