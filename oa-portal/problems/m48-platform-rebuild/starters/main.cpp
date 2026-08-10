#include <bits/stdc++.h>
using namespace std;

/* trains[i] = {arrival, departure}, both inclusive. At most one train may be
   cancelled. Return the minimum number of platforms. */
int minPlatforms(const vector<pair<long long,long long>>& trains) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long,long long>> trains(n);
    for (auto &t : trains) scanf("%lld %lld", &t.first, &t.second);

    printf("%d\n", minPlatforms(trains));
    return 0;
}
