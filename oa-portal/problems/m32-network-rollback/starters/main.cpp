#include <bits/stdc++.h>
using namespace std;

/* cables[i] = {u, v} for cable i+1. events[j] is the cable number unplugged
   at step j. Return the cluster count after each unplugging, in order. */
vector<int> clustersAfterEachRemoval(int n,
                                     const vector<pair<int,int>>& cables,
                                     const vector<int>& events) {
    // write your code here

    return vector<int>(events.size(), n);
}

int main() {
    int n, m, q;
    if (scanf("%d %d %d", &n, &m, &q) != 3) return 0;
    vector<pair<int,int>> cables(m);
    for (auto &e : cables) scanf("%d %d", &e.first, &e.second);
    vector<int> events(q);
    for (auto &x : events) scanf("%d", &x);

    string out;
    for (int v : clustersAfterEachRemoval(n, cables, events)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
