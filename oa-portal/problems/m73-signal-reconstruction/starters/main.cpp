#include <bits/stdc++.h>
using namespace std;

/* Return the 1-based block {l, r} to reverse, or {-1, -1} if impossible. */
pair<int,int> findReversedBlock(const vector<long long>& a) {
    // write your code here

    return make_pair(-1, -1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    pair<int,int> r = findReversedBlock(a);
    if (r.first < 0) printf("-1\n");
    else printf("%d %d\n", r.first, r.second);
    return 0;
}
