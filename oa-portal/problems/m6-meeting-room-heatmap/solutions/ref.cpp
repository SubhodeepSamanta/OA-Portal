// Reference solution - m6 / Q17 Meeting Room Heatmap
// sweep line over endpoints, O(n log n).
// Half-open [s,e): at an equal coordinate, ENDS must be processed before STARTS.
// Sorting pairs by (coord, delta) achieves this because -1 sorts before +1.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;

    vector<pair<int, int>> ev;
    ev.reserve((size_t)n * 2);
    for (int i = 0; i < n; i++) {
        int s, e;
        cin >> s >> e;
        ev.emplace_back(s, +1);
        ev.emplace_back(e, -1);
    }

    sort(ev.begin(), ev.end());

    int cur = 0, best = 0;
    for (auto &p : ev) {
        cur += p.second;
        best = max(best, cur);
    }

    cout << best << '\n';
    return 0;
}
