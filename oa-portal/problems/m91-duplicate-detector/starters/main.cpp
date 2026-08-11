#include <bits/stdc++.h>
using namespace std;

// a has n + 1 entries, every value in 1..n, exactly one value repeated.
// Try to do this without extra space and without modifying a.
int findDuplicate(const vector<int>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n + 1);
    for (auto &x : a) scanf("%d", &x);

    printf("%d\n", findDuplicate(a));
    return 0;
}
