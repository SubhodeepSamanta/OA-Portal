#include <bits/stdc++.h>
using namespace std;

/* parent[v] is the manager of employee v; parent[1] is 0 (the CEO).
   Return one count per employee, for 1..n in order. */
vector<long long> subordinatesWithin(int n, int k, const vector<int>& parent) {
    // write your code here

    return vector<long long>(n, 0);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> parent(n + 1, 0);
    for (int i = 2; i <= n; i++) cin >> parent[i];

    string out;
    vector<long long> res = subordinatesWithin(n, k, parent);
    for (size_t i = 0; i < res.size(); i++) { if (i) out += ' '; out += to_string(res[i]); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
