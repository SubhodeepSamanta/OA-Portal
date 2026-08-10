// Brute force - m82 / Q198
// Keep every accepted timestamp per user forever and rescan the whole list
// on each request. No queue, no trimming - the definition as written.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    long long k, w;
    if (scanf("%d %lld %lld", &q, &k, &w) != 3) return 0;

    map<int, vector<long long>> accepted;
    string out;
    for (int i = 0; i < q; i++) {
        int u;
        long long t;
        scanf("%d %lld", &u, &t);

        long long inWindow = 0;
        for (long long ts : accepted[u]) if (ts > t - w) inWindow++;

        if (inWindow < k) { accepted[u].push_back(t); out += '1'; }
        else out += '0';
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
