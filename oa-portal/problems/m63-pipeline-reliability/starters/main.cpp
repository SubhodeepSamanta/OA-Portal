#include <bits/stdc++.h>
using namespace std;

/* w[i] is stage i+1's risk. edges[j] = {a, b} means a runs before b.
   Starts are stages with no incoming edge, ends have no outgoing edge. */
long long minRisk(const vector<long long>& w, const vector<pair<int,int>>& edges) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> w(n);
    for (auto &x : w) scanf("%lld", &x);
    vector<pair<int,int>> edges(m);
    for (auto &e : edges) scanf("%d %d", &e.first, &e.second);

    printf("%lld\n", minRisk(w, edges));
    return 0;
}
