#include <bits/stdc++.h>
using namespace std;

/* Return the two IDs that appear once, in increasing order. */
pair<long long,long long> findFaulty(const vector<long long>& ids) {
    // write your code here

    return make_pair(0, 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> ids(n);
    for (auto &x : ids) scanf("%lld", &x);

    pair<long long,long long> r = findFaulty(ids);
    printf("%lld %lld\n", r.first, r.second);
    return 0;
}
