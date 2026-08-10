// Reference - m54 / Q149 Lift Controller
// Two numbers per lift: when it next goes idle, and the floor it is on.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int f, e, n;
    if (scanf("%d %d %d", &f, &e, &n) != 3) return 0;

    vector<long long> freeAt(e, 0), at(e, 1);
    string out;
    out.reserve((size_t)n * 12);

    for (int i = 0; i < n; i++) {
        long long t, from, to;
        scanf("%lld %lld %lld", &t, &from, &to);

        int best = 0;
        long long bestArrive = LLONG_MAX;
        for (int j = 0; j < e; j++) {
            long long arrive = max(t, freeAt[j]) + llabs(at[j] - from);
            if (arrive < bestArrive) { bestArrive = arrive; best = j; }
        }

        long long done = bestArrive + llabs(from - to);
        freeAt[best] = done;
        at[best] = to;

        out += to_string(done);
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
