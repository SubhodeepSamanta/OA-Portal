#include <bits/stdc++.h>
using namespace std;

/* queries[i] = {l, r}. Return how many primes lie in each range. */
vector<int> countPrimesInRanges(const vector<pair<int,int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 0);
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<pair<int,int>> queries(q);
    for (auto &x : queries) scanf("%d %d", &x.first, &x.second);

    string out;
    for (int v : countPrimesInRanges(queries)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
