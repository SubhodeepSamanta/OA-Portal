// Reference - m57 / Q152 Ticket Escalation
// The hourly +1 lands on every open ticket, so it never changes which of two
// is higher. The escalation is a decoration: sort by priority descending,
// ties by ticket number.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long, int>> t(n);
    for (int i = 0; i < n; i++) {
        long long p;
        scanf("%lld", &p);
        t[i] = make_pair(-p, i + 1);          // negate so a plain sort works
    }
    sort(t.begin(), t.end());

    string out;
    out.reserve((size_t)n * 7);
    for (int i = 0; i < n; i++) {
        if (i) out += ' ';
        out += to_string(t[i].second);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
