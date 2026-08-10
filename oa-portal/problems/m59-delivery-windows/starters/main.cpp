#include <bits/stdc++.h>
using namespace std;

/* windows[i] = {s, e}. Each delivery takes one whole hour. */
int maxDeliveries(const vector<pair<long long,long long>>& windows) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long,long long>> windows(n);
    for (auto &w : windows) scanf("%lld %lld", &w.first, &w.second);

    printf("%d\n", maxDeliveries(windows));
    return 0;
}
