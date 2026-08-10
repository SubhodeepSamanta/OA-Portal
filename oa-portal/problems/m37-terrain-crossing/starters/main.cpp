#include <bits/stdc++.h>
using namespace std;

/* h[i][j] is the height of the cell in row i, column j.
   Return the smallest possible worst single step. */
long long minStrain(const vector<vector<long long>>& h) {
    // write your code here

    return 0;
}

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<vector<long long>> h(r, vector<long long>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%lld", &h[i][j]);

    printf("%lld\n", minStrain(h));
    return 0;
}
