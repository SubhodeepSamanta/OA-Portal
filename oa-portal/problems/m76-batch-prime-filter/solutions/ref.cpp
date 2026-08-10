// Reference - m76 / Q175 Batch Prime Filter
// Sieve once to the fixed bound, then answer each range by subtraction.
#include <bits/stdc++.h>
using namespace std;

const int LIM = 1000000;

int main() {
    vector<char> composite(LIM + 1, 0);
    composite[0] = composite[1] = 1;                 // 1 is not prime
    for (int i = 2; (long long)i * i <= LIM; i++)
        if (!composite[i])
            for (long long j = (long long)i * i; j <= LIM; j += i) composite[j] = 1;

    vector<int> upto(LIM + 1, 0);
    for (int i = 1; i <= LIM; i++) upto[i] = upto[i - 1] + (composite[i] ? 0 : 1);

    int q;
    if (scanf("%d", &q) != 1) return 0;
    string out;
    out.reserve((size_t)q * 7);
    for (int i = 0; i < q; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        out += to_string(upto[r] - upto[l - 1]);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
