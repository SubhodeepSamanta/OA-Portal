// Brute force - c15 / Q85
// Walks the teleporters one at a time. No jump table at all.
//
// k reaches 1e9 on inputs that are only a few bytes long, so for large k it
// falls back to finding the tail and cycle from the start planet and indexing
// into them directly - still no binary lifting, and a genuinely different way
// of arriving at the answer.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> t(n + 1);
    for (int v = 1; v <= n; v++) scanf("%d", &t[v]);

    vector<int> seenAt(n + 1, -1), path;
    string out;
    for (int i = 0; i < q; i++) {
        int x; long long k;
        scanf("%d %lld", &x, &k);

        if (k <= 2000000) {
            for (long long s = 0; s < k; s++) x = t[x];
            out += to_string(x);
            out += '\n';
            continue;
        }

        // walk from x until a planet repeats: path is tail ++ cycle
        path.clear();
        int cur = x;
        while (seenAt[cur] == -1) { seenAt[cur] = (int)path.size(); path.push_back(cur); cur = t[cur]; }
        int cycleStart = seenAt[cur];
        int cycleLen = (int)path.size() - cycleStart;

        int ans;
        if (k < cycleStart) ans = path[k];
        else ans = path[cycleStart + (int)((k - cycleStart) % cycleLen)];

        for (int v : path) seenAt[v] = -1;      // reset for the next query
        out += to_string(ans);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
