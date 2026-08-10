#include <bits/stdc++.h>
using namespace std;

/* Return the n shares in non-decreasing order. */
vector<long long> shares(long long n, long long m) {
    // write your code here

    return vector<long long>((size_t)n, 0);
}

int main() {
    long long n, m;
    if (scanf("%lld %lld", &n, &m) != 2) return 0;

    string out;
    vector<long long> s = shares(n, m);
    for (size_t i = 0; i < s.size(); i++) { if (i) out += ' '; out += to_string(s[i]); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
