#include <bits/stdc++.h>
using namespace std;

vector<long long> answerQueries(vector<long long> x, const vector<array<long long, 4>>& ops) {
    // write your code here

    return {};
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &x[i]);

    vector<array<long long, 4>> ops;
    for (int i = 0; i < q; i++) {
        long long t;
        scanf("%lld", &t);
        if (t == 1) {
            long long a, b, u;
            scanf("%lld %lld %lld", &a, &b, &u);
            ops.push_back({ t, a, b, u });
        } else {
            long long k;
            scanf("%lld", &k);
            ops.push_back({ t, k, 0, 0 });
        }
    }

    string out;
    for (long long v : answerQueries(x, ops)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
