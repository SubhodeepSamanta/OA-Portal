#include <bits/stdc++.h>
using namespace std;

/* ranges[i] = {l, r}, inclusive, in priority order. The ALLOW/DENY action is
   read for you and deliberately not passed on - it does not affect shadowing. */
int countShadowed(const vector<pair<long long,long long>>& ranges) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long,long long>> ranges(n);
    char action[16];
    for (auto &r : ranges) scanf("%lld %lld %s", &r.first, &r.second, action);

    printf("%d\n", countShadowed(ranges));
    return 0;
}
