// Reference - c17 / Q101 Removing Digits (CSES 1637)
// steps[v] = 1 + min over the non-zero digits d of v of steps[v-d].
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    vector<int> steps(n + 1, 0);
    for (int v = 1; v <= n; v++) {
        int best = INT_MAX;
        for (int t = v; t; t /= 10) {
            int d = t % 10;
            if (d == 0) continue;             // subtracting 0 makes no progress
            best = min(best, steps[v - d]);
        }
        steps[v] = best + 1;
    }
    printf("%d\n", steps[n]);
    return 0;
}
