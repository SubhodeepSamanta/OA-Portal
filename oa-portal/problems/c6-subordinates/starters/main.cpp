#include <bits/stdc++.h>
using namespace std;

vector<int> subordinateCounts(const vector<int>& boss) {
    int n = (int)boss.size() - 1;
    // write your code here

    return vector<int>(n + 1, 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> boss(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &boss[i]);

    vector<int> cnt = subordinateCounts(boss);
    string out;
    for (int i = 1; i <= n; i++) { out += to_string(cnt[i]); out += (i == n ? '\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
