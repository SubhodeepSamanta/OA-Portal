// Reference - c26 / Q122 String Matching (CSES 1753)
// KMP. After a full match the counter falls back to fail[m-1] rather than 0,
// which is what finds overlapping occurrences.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char bufS[1000006], bufP[1000006];
    if (scanf("%s", bufS) != 1) return 0;
    if (scanf("%s", bufP) != 1) return 0;
    string s = bufS, p = bufP;
    int n = (int)s.size(), m = (int)p.size();
    if (m > n) { printf("0\n"); return 0; }

    vector<int> fail(m, 0);
    for (int i = 1, k = 0; i < m; i++) {
        while (k > 0 && p[i] != p[k]) k = fail[k - 1];
        if (p[i] == p[k]) k++;
        fail[i] = k;
    }

    long long count = 0;
    for (int i = 0, k = 0; i < n; i++) {
        while (k > 0 && s[i] != p[k]) k = fail[k - 1];
        if (s[i] == p[k]) k++;
        if (k == m) { count++; k = fail[k - 1]; }   // not 0 - overlaps matter
    }
    printf("%lld\n", count);
    return 0;
}
