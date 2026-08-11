#include <bits/stdc++.h>
using namespace std;

vector<int> ticketPrices(vector<int> h, const vector<int>& t) {
    // write your code here

    return vector<int>(t.size(), -1);
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> h(n), t(m);
    for (auto &v : h) scanf("%d", &v);
    for (auto &v : t) scanf("%d", &v);

    string out;
    for (int v : ticketPrices(h, t)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
