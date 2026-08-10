#include <bits/stdc++.h>
using namespace std;

/* Return the smallest achievable difference, or -1 if no split exists. */
long long smallestDifference(const vector<int>& a) {
    // write your code here

    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n);
    for (auto &x : a) scanf("%d", &x);

    printf("%lld\n", smallestDifference(a));
    return 0;
}
