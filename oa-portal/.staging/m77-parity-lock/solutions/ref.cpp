// Reference - m77 / Q176 Parity Lock
//
// n == 1: already equal, nothing to do.
// n == 2: every operation touches both, so the difference is frozen.
// n >= 3, n odd : n*T can be either parity, so a large enough T always works.
// n >= 3, n even: n*T is always even, so an odd total can never be reached.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    long long sum = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); sum += a[i]; }

    bool ok;
    if (n == 1) ok = true;
    else if (n == 2) ok = (a[0] == a[1]);
    else if (n % 2 == 1) ok = true;
    else ok = (sum % 2 == 0);

    printf(ok ? "YES\n" : "NO\n");
    return 0;
}
