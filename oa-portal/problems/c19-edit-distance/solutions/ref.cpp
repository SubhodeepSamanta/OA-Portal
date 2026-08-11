// Reference - c19 / Q103 Edit Distance (CSES 1639)
// Classic O(n*m) DP kept to two rows: the full 5000x5000 table would be 100 MB.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char bufA[5005], bufB[5005];
    if (scanf("%s", bufA) != 1) return 0;
    if (scanf("%s", bufB) != 1) return 0;
    string a = bufA, b = bufB;
    int n = (int)a.size(), m = (int)b.size();

    vector<int> prev(m + 1), cur(m + 1);
    for (int j = 0; j <= m; j++) prev[j] = j;          // insert everything

    for (int i = 1; i <= n; i++) {
        cur[0] = i;                                    // delete everything
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) cur[j] = prev[j - 1];
            else cur[j] = 1 + min(prev[j - 1], min(prev[j], cur[j - 1]));
        }
        prev.swap(cur);
    }
    printf("%d\n", prev[m]);
    return 0;
}
