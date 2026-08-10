// Brute force - m49 / Q136
// Actually shove books around: repeatedly find a shelf above average and
// push one book one step towards a shelf below average, counting the moves.
// No formula, no prefix sums.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); total += a[i]; }

    if (total % n != 0) { printf("-1\n"); return 0; }
    long long avg = total / n;

    long long ops = 0;
    bool moved = true;
    while (moved) {
        moved = false;
        for (int i = 0; i + 1 < n; i++) {
            // settle the boundary between i and i+1 one book at a time
            long long left = 0;
            for (int j = 0; j <= i; j++) left += a[j];
            long long want = (long long)(i + 1) * avg;
            if (left > want) { a[i]--; a[i + 1]++; ops++; moved = true; }
            else if (left < want) { a[i + 1]--; a[i]++; ops++; moved = true; }
        }
    }
    printf("%lld\n", ops);
    return 0;
}
