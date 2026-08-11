// Brute force - c2 / Q16
// Same arrival-order sweep, but no heap: for each booking it scans every open
// room and takes the first that is free. O(n*k), and it hands out different
// room numbers from the reference - which is exactly the point, since the
// checker has to accept both.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n), b(n), idx(n);
    for (int i = 0; i < n; i++) { scanf("%d %d", &a[i], &b[i]); idx[i] = i; }

    sort(idx.begin(), idx.end(), [&](int p, int q) {
        if (a[p] != a[q]) return a[p] < a[q];
        return b[p] < b[q];
    });

    vector<int> freeAt;             // freeAt[r] = day room r+1 frees up
    vector<int> room(n);

    for (int t = 0; t < n; t++) {
        int i = idx[t];
        int chosen = -1;
        for (int r = (int)freeAt.size() - 1; r >= 0; r--) {   // scan from the back
            if (freeAt[r] < a[i]) { chosen = r; break; }
        }
        if (chosen < 0) { freeAt.push_back(b[i]); chosen = (int)freeAt.size() - 1; }
        else freeAt[chosen] = b[i];
        room[i] = chosen + 1;
    }

    printf("%d\n", (int)freeAt.size());
    for (int i = 0; i < n; i++) printf("%d%c", room[i], i + 1 == n ? '\n' : ' ');
    return 0;
}
