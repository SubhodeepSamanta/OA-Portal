// Reference - m20 / Q36 Exam Hall Allocation
// Two heaps: busy halls keyed by end minute, free halls keyed by hall number.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 3>> ex(n);
    for (int i = 0; i < n; i++) {
        long long s, e;
        scanf("%lld %lld", &s, &e);
        ex[i] = {s, e, (long long)(i + 1)};
    }
    // start asc, then end asc, then input order - exactly the stated rule
    sort(ex.begin(), ex.end());

    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> busy;   // (end minute, hall)
    priority_queue<int, vector<int>, greater<int>> freeHalls;

    int H = 0;
    vector<int> hall1;
    for (const auto &x : ex) {
        long long s = x[0], e = x[1];
        int id = (int)x[2];
        while (!busy.empty() && busy.top().first <= s) {
            freeHalls.push(busy.top().second);
            busy.pop();
        }
        int h;
        if (freeHalls.empty()) h = ++H;
        else { h = freeHalls.top(); freeHalls.pop(); }
        busy.push(make_pair(e, h));
        if (h == 1) hall1.push_back(id);
    }
    sort(hall1.begin(), hall1.end());

    string out = to_string(H);
    out += '\n';
    out += to_string(hall1.size());
    for (int v : hall1) { out += ' '; out += to_string(v); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
