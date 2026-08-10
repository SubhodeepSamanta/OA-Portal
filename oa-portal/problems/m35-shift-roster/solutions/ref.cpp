// Reference - m35 / Q78 Shift Roster
// Kuhn's algorithm: for each shift, hunt for an augmenting chain of
// displacements ending at an unclaimed staff member.
#include <bits/stdc++.h>
using namespace std;

int n, m, p;
vector<vector<int>> canWork;      // canWork[shift] = staff willing to do it
vector<int> heldBy;               // heldBy[staff] = shift they are rostered on, 0 = free
vector<char> tried;

bool assign(int shift) {
    for (int a : canWork[shift]) {
        if (tried[a]) continue;
        tried[a] = 1;
        if (heldBy[a] == 0 || assign(heldBy[a])) { heldBy[a] = shift; return true; }
    }
    return false;
}

int main() {
    if (scanf("%d %d %d", &n, &m, &p) != 3) return 0;
    canWork.assign(m + 1, {});
    for (int i = 0; i < p; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        canWork[b].push_back(a);
    }

    if (m > n) { printf("NO\n"); return 0; }
    for (int s = 1; s <= m; s++) if (canWork[s].empty()) { printf("NO\n"); return 0; }

    heldBy.assign(n + 1, 0);
    for (int s = 1; s <= m; s++) {
        tried.assign(n + 1, 0);
        if (!assign(s)) { printf("NO\n"); return 0; }
    }
    printf("YES\n");
    return 0;
}
