// Reference - a7 / Q94 LCS (AtCoder EDPC F)
// Prefix table: dp[i][j] = LCS length of s[0..i) and t[0..j), then walk the
// table BACKWARDS from (n, m) to rebuild one longest common subsequence.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char bs[3005], bt[3005];
    if (scanf("%s", bs) != 1) return 0;
    if (scanf("%s", bt) != 1) return 0;
    string s = bs, t = bt;
    const int n = (int)s.size(), m = (int)t.size();

    // flat (n+1) x (m+1); 3001*3001 ints is ~36 MB, comfortably inside the limit
    vector<int> dp((size_t)(n + 1) * (m + 1), 0);
    auto at = [&](int i, int j) -> int& { return dp[(size_t)i * (m + 1) + j]; };

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            at(i, j) = (s[i - 1] == t[j - 1]) ? at(i - 1, j - 1) + 1
                                              : max(at(i - 1, j), at(i, j - 1));
        }
    }

    string res;
    res.reserve(at(n, m));
    for (int i = n, j = m; i > 0 && j > 0; ) {
        if (s[i - 1] == t[j - 1]) { res += s[i - 1]; i--; j--; }
        else if (at(i - 1, j) >= at(i, j - 1)) i--;
        else j--;
    }
    reverse(res.begin(), res.end());

    printf("%s\n", res.c_str());
    return 0;
}
