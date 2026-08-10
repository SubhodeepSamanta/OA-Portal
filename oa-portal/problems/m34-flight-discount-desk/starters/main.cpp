#include <bits/stdc++.h>
using namespace std;

/* flights[i] = {u, v, cost}, one way only. Return -1 if city n is unreachable. */
long long cheapestFare(int n, const vector<array<long long,3>>& flights) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long,3>> flights(m);
    for (auto &e : flights) scanf("%lld %lld %lld", &e[0], &e[1], &e[2]);

    printf("%lld\n", cheapestFare(n, flights));
    return 0;
}
