#include <bits/stdc++.h>
using namespace std;

long long maxHappiness(const vector<array<long long, 3>>& day) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 3>> day(n);
    for (auto &d : day) scanf("%lld %lld %lld", &d[0], &d[1], &d[2]);

    printf("%lld\n", maxHappiness(day));
    return 0;
}
