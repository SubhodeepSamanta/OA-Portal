// Brute force - m46 / Q133
// Try every start and end, checking each candidate run character by
// character against a plain list of the working keys.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;
    string s = buf;
    int n = (int)s.size();

    int k;
    if (scanf("%d", &k) != 1) return 0;
    vector<char> keys(k);
    for (int i = 0; i < k; i++) { char c[8]; scanf("%s", c); keys[i] = c[0]; }

    auto usable = [&](char c) {
        for (int i = 0; i < k; i++) if (keys[i] == c) return true;
        return false;
    };

    int best = 0;
    for (int i = 0; i < n; i++)
        for (int j = i; j < n; j++) {
            bool ok = true;
            for (int t = i; t <= j; t++) if (!usable(s[t])) { ok = false; break; }
            if (ok) best = max(best, j - i + 1);
        }
    printf("%d\n", best);
    return 0;
}
