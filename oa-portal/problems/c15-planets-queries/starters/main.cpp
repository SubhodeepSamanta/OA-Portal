#include <bits/stdc++.h>
using namespace std;

vector<int> destinations(const vector<int>& t,
                         const vector<pair<int, long long>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 1);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> t(n + 1);
    for (int v = 1; v <= n; v++) scanf("%d", &t[v]);
    vector<pair<int, long long>> queries(q);
    for (auto &qr : queries) scanf("%d %lld", &qr.first, &qr.second);

    string out;
    for (int v : destinations(t, queries)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
