#include <bits/stdc++.h>
using namespace std;

/* constraints[j] = {i, j, type}: type 0 means equal, 1 means differ.
   Return the count of satisfying assignments modulo 1e9+7. */
long long countAssignments(int n, const vector<array<int,3>>& constraints) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int,3>> constraints(m);
    for (auto &c : constraints) scanf("%d %d %d", &c[0], &c[1], &c[2]);

    printf("%lld\n", countAssignments(n, constraints));
    return 0;
}
