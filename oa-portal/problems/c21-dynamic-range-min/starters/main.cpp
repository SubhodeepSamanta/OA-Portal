#include <bits/stdc++.h>
using namespace std;

vector<int> answerQueries(vector<int> x, const vector<array<int, 3>>& ops) {
    // ops[i] = {type, first, second}
    // write your code here

    return {};
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &x[i]);
    vector<array<int, 3>> ops;
    for (int i = 0; i < q; i++) {
        int t, a, b;
        scanf("%d %d %d", &t, &a, &b);
        ops.push_back({ t, a, b });
    }

    string out;
    for (int v : answerQueries(x, ops)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
