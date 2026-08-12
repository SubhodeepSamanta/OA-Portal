#include <bits/stdc++.h>
using namespace std;

// Largest gcd over all pairs at distinct positions. Values repeat, and a pair
// of two EQUAL values is a valid pair.
int maxPairGcd(const vector<int>& x) {
    // write your code here

    return 1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> x(n);
    for (auto &v : x) scanf("%d", &v);

    printf("%d\n", maxPairGcd(x));
    return 0;
}
