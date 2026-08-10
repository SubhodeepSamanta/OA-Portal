// Reference - m79 / Q178 Fair Share
// Everyone gets m/n; the remainder is one extra each to m%n people. Smaller
// shares first so the output is non-decreasing.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m;
    if (scanf("%lld %lld", &n, &m) != 2) return 0;
    long long base = m / n, extra = m % n;

    string out;
    out.reserve((size_t)n * 20);
    for (long long i = 0; i < n; i++) {
        if (i) out += ' ';
        out += to_string(i < n - extra ? base : base + 1);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
