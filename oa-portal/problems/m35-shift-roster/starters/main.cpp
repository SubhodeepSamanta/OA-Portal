#include <bits/stdc++.h>
using namespace std;

/* pairs[i] = {staff, shift}: that staff member can work that shift.
   Return true if every one of the m shifts can be covered. */
bool canCoverEveryShift(int n, int m, const vector<pair<int,int>>& pairs) {
    // write your code here

    return false;
}

int main() {
    int n, m, p;
    if (scanf("%d %d %d", &n, &m, &p) != 3) return 0;
    vector<pair<int,int>> pairs(p);
    for (auto &x : pairs) scanf("%d %d", &x.first, &x.second);

    printf("%s\n", canCoverEveryShift(n, m, pairs) ? "YES" : "NO");
    return 0;
}
