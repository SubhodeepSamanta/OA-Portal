#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

long long countColourings(int n, const vector<pair<int, int>>& edges) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<int, int>> edges(n - 1);
    for (int i = 0; i < n - 1; i++) scanf("%d %d", &edges[i].first, &edges[i].second);

    printf("%lld\n", countColourings(n, edges));
    return 0;
}
