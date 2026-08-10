#include <bits/stdc++.h>
using namespace std;

/* Return the minimum number of one-step moves, or -1 if impossible. */
long long minMoves(const vector<long long>& a) {
    // write your code here

    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%lld\n", minMoves(a));
    return 0;
}
