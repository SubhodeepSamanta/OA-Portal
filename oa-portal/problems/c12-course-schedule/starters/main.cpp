#include <bits/stdc++.h>
using namespace std;

vector<int> courseOrder(int n, const vector<pair<int, int>>& before) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> before(m);
    for (auto &r : before) scanf("%d %d", &r.first, &r.second);

    vector<int> order = courseOrder(n, before);
    if (order.empty()) { printf("IMPOSSIBLE\n"); return 0; }

    string out;
    for (int i = 0; i < (int)order.size(); i++) {
        out += to_string(order[i]);
        out += (i + 1 == (int)order.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
