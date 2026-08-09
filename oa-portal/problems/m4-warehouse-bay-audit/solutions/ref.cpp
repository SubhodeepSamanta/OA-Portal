// Reference solution - m4 / Q11 Warehouse Bay Audit
// sort + dedupe + single scan, O(n log n). Deterministic and cache friendly.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (auto &x : a) cin >> x;

    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());

    int best = 1, cur = 1;
    for (size_t i = 1; i < a.size(); i++) {
        if ((long long)a[i] == (long long)a[i - 1] + 1) cur++;
        else cur = 1;
        best = max(best, cur);
    }

    cout << best << '\n';
    return 0;
}
