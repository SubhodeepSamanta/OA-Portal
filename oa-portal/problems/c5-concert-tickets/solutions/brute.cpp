// Brute force - c5 / Q34
// A flat array with a sold flag, scanned in full for every customer.
// No ordered container, no binary search. O(n*m).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> h(n);
    vector<char> sold(n, 0);
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);

    string out;
    for (int j = 0; j < m; j++) {
        int t; scanf("%d", &t);
        int bestIdx = -1;
        for (int i = 0; i < n; i++) {
            if (sold[i] || h[i] > t) continue;
            if (bestIdx < 0 || h[i] > h[bestIdx]) bestIdx = i;
        }
        if (bestIdx < 0) out += "-1\n";
        else { sold[bestIdx] = 1; out += to_string(h[bestIdx]); out += '\n'; }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
