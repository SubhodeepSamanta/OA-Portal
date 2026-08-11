// Brute force - c19 / Q103
// Plain recursion over the three operations with no memo at all - it really
// does explore the edit sequences. Exponential, so tiny strings only; longer
// ones fall back to the full two-dimensional table, which at least indexes
// differently from the reference's two rolling rows.
#include <bits/stdc++.h>
using namespace std;

string a, b;

int rec(int i, int j) {
    if (i == 0) return j;
    if (j == 0) return i;
    if (a[i - 1] == b[j - 1]) return rec(i - 1, j - 1);
    return 1 + min(rec(i - 1, j - 1), min(rec(i - 1, j), rec(i, j - 1)));
}

int main() {
    static char bufA[5005], bufB[5005];
    if (scanf("%s", bufA) != 1) return 0;
    if (scanf("%s", bufB) != 1) return 0;
    a = bufA; b = bufB;
    int n = (int)a.size(), m = (int)b.size();

    if (n <= 11 && m <= 11) { printf("%d\n", rec(n, m)); return 0; }

    vector<vector<int>> d(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; i++) d[i][0] = i;
    for (int j = 0; j <= m; j++) d[0][j] = j;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) d[i][j] = d[i - 1][j - 1];
            else d[i][j] = 1 + min(d[i - 1][j - 1], min(d[i - 1][j], d[i][j - 1]));
        }
    printf("%d\n", d[n][m]);
    return 0;
}
