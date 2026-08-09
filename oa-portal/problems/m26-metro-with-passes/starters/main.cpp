#include <bits/stdc++.h>
using namespace std;

/* links[i] = {u, v, cost}, two-way. Return -1 if station n is unreachable. */
long long cheapestFare(int n, int k, const vector<array<long long,3>>& links) {
    // write your code here

    return -1;
}

int main() {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return 0;
    vector<array<long long,3>> links(m);
    for (auto &e : links) scanf("%lld %lld %lld", &e[0], &e[1], &e[2]);

    printf("%lld\n", cheapestFare(n, k, links));
    return 0;
}
