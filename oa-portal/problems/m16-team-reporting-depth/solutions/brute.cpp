// Brute force - m16 / Q66. Walks down from every employee, level by level.
// O(n^2) in a chain. Validation only.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> par(n + 1, 0);
    vector<vector<int>> kids(n + 1);
    for (int i = 2; i <= n; i++) { cin >> par[i]; kids[par[i]].push_back(i); }

    for (int v = 1; v <= n; v++) {
        long long cnt = 0;
        // BFS limited to k levels
        vector<int> cur{v};
        for (int d = 1; d <= k && !cur.empty(); d++) {
            vector<int> nxt;
            for (int x : cur) for (int c : kids[x]) nxt.push_back(c);
            cnt += (long long)nxt.size();
            cur.swap(nxt);
        }
        cout << cnt << (v == n ? '\n' : ' ');
    }
    return 0;
}
