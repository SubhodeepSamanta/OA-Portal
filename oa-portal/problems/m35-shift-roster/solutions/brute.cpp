// Brute force - m35 / Q78
//
// tiny  : exhaustive backtracking over every way to hand out the shifts, with
//         no notion of augmenting paths at all
// small : augmenting paths found by BFS rather than recursive DFS
#include <bits/stdc++.h>
using namespace std;

int n, m, p;
vector<vector<int>> canWork;
vector<char> used;

bool rec(int shift) {
    if (shift > m) return true;
    for (int a : canWork[shift]) {
        if (used[a]) continue;
        used[a] = 1;
        if (rec(shift + 1)) return true;
        used[a] = 0;
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

    if (m <= 8 && n <= 12) {
        used.assign(n + 1, 0);
        printf(rec(1) ? "YES\n" : "NO\n");
        return 0;
    }

    // BFS augmenting: grow a layered search from the shift until it lands on
    // a staff member nobody holds, then walk the chain back and flip it
    vector<int> heldBy(n + 1, 0);      // staff -> shift
    vector<int> worksAt(m + 1, 0);     // shift -> staff
    for (int s = 1; s <= m; s++) {
        vector<int> fromStaff(n + 1, -1);
        vector<char> seen(n + 1, 0);
        deque<int> q;
        q.push_back(s);
        int landed = -1;
        while (!q.empty() && landed < 0) {
            int sh = q.front(); q.pop_front();
            for (int a : canWork[sh]) {
                if (seen[a]) continue;
                seen[a] = 1;
                fromStaff[a] = sh;
                if (heldBy[a] == 0) { landed = a; break; }
                q.push_back(heldBy[a]);
            }
        }
        if (landed < 0) { printf("NO\n"); return 0; }
        int a = landed;
        while (a != 0) {
            int sh = fromStaff[a];
            int prev = worksAt[sh];
            heldBy[a] = sh;
            worksAt[sh] = a;
            a = prev;
        }
    }
    printf("YES\n");
    return 0;
}
