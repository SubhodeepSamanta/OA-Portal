#include <bits/stdc++.h>
using namespace std;

/* t[i] is task i+1's duration. deps[j] = {a, b}: a must finish before b starts.
   Return -1 if the dependencies contain a cycle. */
long long buildTime(const vector<long long>& t, const vector<pair<int,int>>& deps) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> t(n);
    for (auto &x : t) scanf("%lld", &x);
    vector<pair<int,int>> deps(m);
    for (auto &d : deps) scanf("%d %d", &d.first, &d.second);

    printf("%lld\n", buildTime(t, deps));
    return 0;
}
