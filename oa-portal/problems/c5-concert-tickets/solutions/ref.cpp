// Reference - c5 / Q34 Concert Tickets (CSES 1091)
// A multiset keeps the unsold tickets ordered while they are removed one by
// one. upper_bound then a step back finds the dearest ticket within budget.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;

    multiset<int> tickets;
    for (int i = 0; i < n; i++) { int h; scanf("%d", &h); tickets.insert(h); }

    string out;
    out.reserve(m * 8);
    for (int j = 0; j < m; j++) {
        int t; scanf("%d", &t);
        auto it = tickets.upper_bound(t);
        if (it == tickets.begin()) {
            out += "-1\n";
        } else {
            --it;
            out += to_string(*it);
            out += '\n';
            tickets.erase(it);          // erase THIS ticket, not every one at that price
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
