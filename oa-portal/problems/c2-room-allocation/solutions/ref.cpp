// Reference - c2 / Q16 Room Allocation (CSES 1164)
// Sweep bookings in arrival order. A min-heap keyed by the day a room frees
// up holds the rooms in use; if the earliest one frees strictly before the
// current arrival, reuse it, otherwise open a new room.
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

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> freeAt;
    vector<int> room(n);
    int k = 0;

    for (int t = 0; t < n; t++) {
        int i = idx[t];
        if (!freeAt.empty() && freeAt.top().first < a[i]) {
            int r = freeAt.top().second;
            freeAt.pop();
            room[i] = r;
            freeAt.push({ b[i], r });
        } else {
            room[i] = ++k;
            freeAt.push({ b[i], k });
        }
    }

    string out = to_string(k);
    out += '\n';
    for (int i = 0; i < n; i++) {
        out += to_string(room[i]);
        out += (i + 1 == n ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
