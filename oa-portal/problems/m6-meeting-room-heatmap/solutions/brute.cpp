// Brute force - m6 / Q17. O(n^2): peak concurrency can only occur at a start
// instant, so test every start against every meeting. Validation only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> s(n), e(n);
    for (int i = 0; i < n; i++) cin >> s[i] >> e[i];

    int best = 0;
    for (int i = 0; i < n; i++) {
        long long t = s[i];
        int c = 0;
        for (int j = 0; j < n; j++) if (s[j] <= t && t < e[j]) c++;
        best = max(best, c);
    }
    cout << best << '\n';
    return 0;
}
