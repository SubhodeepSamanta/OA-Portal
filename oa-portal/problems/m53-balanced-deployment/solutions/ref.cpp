// Reference - m53 / Q140 Balanced Deployment
// Running total +1 per '1', -1 per '0'. A window is balanced exactly when the
// totals at its two ends match, so count pairs sharing a total.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[200006];
    if (scanf("%s", buf) != 1) return 0;
    int n = (int)strlen(buf);

    vector<long long> seen(2 * n + 2, 0);
    int cur = n;                 // running total, shifted by n so it indexes
    seen[cur] = 1;               // P[0] = 0, present before anything is read
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        cur += (buf[i] == '1') ? 1 : -1;
        ans += seen[cur];        // pairs with every earlier position at this total
        seen[cur]++;
    }
    printf("%lld\n", ans);
    return 0;
}
