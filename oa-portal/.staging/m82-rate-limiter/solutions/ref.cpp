// Reference - m82 / Q198 Rate Limiter
// One queue of in-window accepted timestamps per user. Each timestamp is
// pushed once and popped once, so the trimming is amortised constant.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    long long k, w;
    if (scanf("%d %lld %lld", &q, &k, &w) != 3) return 0;

    unordered_map<int, deque<long long>> seen;
    seen.reserve(1 << 16);

    string out;
    out.reserve(q + 1);
    for (int i = 0; i < q; i++) {
        int u;
        long long t;
        scanf("%d %lld", &u, &t);

        deque<long long> &dq = seen[u];
        while (!dq.empty() && dq.front() <= t - w) dq.pop_front();

        if ((long long)dq.size() < k) { dq.push_back(t); out += '1'; }
        else out += '0';                       // rejected requests are not recorded
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
