#include <bits/stdc++.h>
using namespace std;

/* roads[i] = {u, v, w} with w either 0 or 1, two-way.
   Return -1 if city n is unreachable. */
int minimumToll(int n, const vector<array<int,3>>& roads) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int,3>> roads(m);
    for (auto &e : roads) scanf("%d %d %d", &e[0], &e[1], &e[2]);

    printf("%d\n", minimumToll(n, roads));
    return 0;
}
