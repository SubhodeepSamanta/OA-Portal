// Brute force - m57 / Q152
// The rule played out literally, hour by hour: scan for the highest, resolve
// it, then add 1 to every survivor. Assumes nothing about the escalation
// being irrelevant - which is exactly what makes it a real cross-check.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> p(n);
    vector<char> open(n, 1);
    for (int i = 0; i < n; i++) scanf("%lld", &p[i]);

    string out;
    for (int hour = 0; hour < n; hour++) {
        int pick = -1;
        for (int i = 0; i < n; i++)
            if (open[i] && (pick < 0 || p[i] > p[pick])) pick = i;
        open[pick] = 0;
        if (hour) out += ' ';
        out += to_string(pick + 1);
        for (int i = 0; i < n; i++) if (open[i]) p[i] += 1;
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
