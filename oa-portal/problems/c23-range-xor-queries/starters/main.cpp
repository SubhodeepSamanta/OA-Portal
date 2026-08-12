#include <bits/stdc++.h>
using namespace std;

vector<int> rangeXors(const vector<int>& x, const vector<pair<int, int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 0);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &x[i]);
    vector<pair<int, int>> queries(q);
    for (auto &qr : queries) scanf("%d %d", &qr.first, &qr.second);

    string out;
    for (int v : rangeXors(x, queries)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
