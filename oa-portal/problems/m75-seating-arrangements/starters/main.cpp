#include <bits/stdc++.h>
using namespace std;

/* queries[i] = {n, r}. Return each answer modulo 1e9+7, in order. */
vector<long long> answerQueries(const vector<pair<int,int>>& queries) {
    // write your code here

    return vector<long long>(queries.size(), 0);
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<pair<int,int>> queries(q);
    for (auto &x : queries) scanf("%d %d", &x.first, &x.second);

    string out;
    for (long long v : answerQueries(queries)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
