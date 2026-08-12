// Brute force - c26 / Q122
// Tries every start position and compares character by character. No failure
// function, no fallback - so it cannot share the reference's overlap bug.
// O(n*m), small inputs only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char bufS[1000006], bufP[1000006];
    if (scanf("%s", bufS) != 1) return 0;
    if (scanf("%s", bufP) != 1) return 0;
    string s = bufS, p = bufP;
    int n = (int)s.size(), m = (int)p.size();

    long long count = 0;
    for (int i = 0; i + m <= n; i++) {
        int j = 0;
        while (j < m && s[i + j] == p[j]) j++;
        if (j == m) count++;
    }
    printf("%lld\n", count);
    return 0;
}
