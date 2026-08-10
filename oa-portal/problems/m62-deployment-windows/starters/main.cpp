#include <bits/stdc++.h>
using namespace std;

/* services[i] = {l, r, t}. Pausing and resuming is allowed. */
bool canDeployAll(const vector<array<long long,3>>& services) {
    // write your code here

    return false;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,3>> services(n);
    for (auto &s : services) scanf("%lld %lld %lld", &s[0], &s[1], &s[2]);

    printf("%s\n", canDeployAll(services) ? "YES" : "NO");
    return 0;
}
