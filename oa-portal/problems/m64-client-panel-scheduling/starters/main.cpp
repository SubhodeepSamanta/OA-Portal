#include <bits/stdc++.h>
using namespace std;

/* meetings[i] = {start, end, value}. Touching meetings do not clash. */
long long maxValue(const vector<array<long long,3>>& meetings) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,3>> meetings(n);
    for (auto &m : meetings) scanf("%lld %lld %lld", &m[0], &m[1], &m[2]);

    printf("%lld\n", maxValue(meetings));
    return 0;
}
