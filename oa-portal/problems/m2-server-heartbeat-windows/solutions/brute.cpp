// Brute force - m2 / Q3. O(n*w). Validates the reference on small inputs.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, w;
    if (!(cin >> n >> w)) return 0;
    vector<int> a(n);
    for (auto &x : a) cin >> x;

    for (int i = 0; i + w <= n; i++) {
        int mx = a[i];
        for (int j = i; j < i + w; j++) mx = max(mx, a[j]);
        cout << mx << (i + w == n ? '\n' : ' ');
    }
    return 0;
}
