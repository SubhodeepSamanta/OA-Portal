// Brute force - m61 / Q156
// Every window, checked directly with a fresh set each time. O(n^2 log n).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> b(n);
    for (int i = 0; i < n; i++) scanf("%d", &b[i]);

    set<int> all(b.begin(), b.end());
    size_t need = all.size();

    int best = n;
    for (int i = 0; i < n; i++) {
        set<int> seen;
        for (int j = i; j < n; j++) {
            seen.insert(b[j]);
            if (seen.size() == need) { best = min(best, j - i + 1); break; }
        }
    }
    printf("%d\n", best);
    return 0;
}
