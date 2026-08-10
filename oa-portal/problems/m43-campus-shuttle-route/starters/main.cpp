#include <bits/stdc++.h>
using namespace std;

/* dist[i][j] is the distance from location i to location j, 0 being the
   depot. Not symmetric. Return the best round trip. */
long long shortestRoute(const vector<vector<long long>>& dist) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<long long>> dist(n + 1, vector<long long>(n + 1));
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= n; j++) scanf("%lld", &dist[i][j]);

    printf("%lld\n", shortestRoute(dist));
    return 0;
}
