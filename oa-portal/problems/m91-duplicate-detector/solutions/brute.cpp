// Brute force - m91 / Q212
// A counting array. Uses O(n) extra space and knows nothing about cycles,
// which is exactly why it is a useful independent check on the pointer walk.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> cnt(n + 2, 0);
    int ans = -1;
    for (int i = 0; i <= n; i++) {
        int v; scanf("%d", &v);
        if (++cnt[v] == 2) ans = v;
    }
    printf("%d\n", ans);
    return 0;
}
