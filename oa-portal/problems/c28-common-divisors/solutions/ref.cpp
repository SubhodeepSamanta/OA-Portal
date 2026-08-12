// Reference - c28 / Q169 Common Divisors (CSES 1081)
// For each candidate d, count how many inputs are multiples of d. The answer
// is the largest d whose count reaches 2. Sweep downwards and stop early.
#include <bits/stdc++.h>
using namespace std;

static const int LIMIT = 1000000;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    static int present[LIMIT + 1];
    for (int i = 0; i < n; i++) {
        int v; scanf("%d", &v);
        present[v]++;                    // count occurrences, not distinct values
    }

    for (int d = LIMIT; d >= 1; d--) {
        int count = 0;
        for (int m = d; m <= LIMIT; m += d) {
            count += present[m];
            if (count >= 2) break;
        }
        if (count >= 2) { printf("%d\n", d); return 0; }
    }
    printf("1\n");                       // n >= 2 guarantees we never get here
    return 0;
}
