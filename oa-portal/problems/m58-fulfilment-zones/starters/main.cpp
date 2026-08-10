#include <bits/stdc++.h>
using namespace std;

/* Return the fewest sites to open, or -1 if some customer cannot be served. */
int minWarehouses(const vector<pair<long long,long long>>& sites,
                  const vector<pair<long long,long long>>& customers,
                  long long d) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    long long d;
    if (scanf("%d %d %lld", &n, &m, &d) != 3) return 0;
    vector<pair<long long,long long>> sites(n), customers(m);
    for (auto &p : sites) scanf("%lld %lld", &p.first, &p.second);
    for (auto &p : customers) scanf("%lld %lld", &p.first, &p.second);

    printf("%d\n", minWarehouses(sites, customers, d));
    return 0;
}
