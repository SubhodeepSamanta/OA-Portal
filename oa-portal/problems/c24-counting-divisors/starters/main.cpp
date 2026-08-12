#include <bits/stdc++.h>
using namespace std;

// All queries share one small universe (x <= 1e6) - precompute once.
vector<int> divisorCounts(const vector<int>& xs) {
    // write your code here

    return vector<int>(xs.size(), 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> xs(n);
    for (auto &v : xs) scanf("%d", &v);

    string out;
    for (int v : divisorCounts(xs)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
