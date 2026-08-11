#include <bits/stdc++.h>
using namespace std;

/* Count pairs i < j whose masks together set all b bits. */
long long countCoveringPairs(const vector<int>& masks, int b) {
    // write your code here

    return 0;
}

int main() {
    int n, b;
    if (scanf("%d %d", &n, &b) != 2) return 0;
    vector<int> masks(n);
    for (auto &x : masks) scanf("%d", &x);

    printf("%lld\n", countCoveringPairs(masks, b));
    return 0;
}
