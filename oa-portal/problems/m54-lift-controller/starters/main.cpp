#include <bits/stdc++.h>
using namespace std;

/* reqs[i] = {time, from, to}, in non-decreasing time order.
   Return the completion time of each request, in input order. */
vector<long long> completionTimes(int f, int e, const vector<array<long long,3>>& reqs) {
    // write your code here

    return vector<long long>(reqs.size(), 0);
}

int main() {
    int f, e, n;
    if (scanf("%d %d %d", &f, &e, &n) != 3) return 0;
    vector<array<long long,3>> reqs(n);
    for (auto &r : reqs) scanf("%lld %lld %lld", &r[0], &r[1], &r[2]);

    string out;
    for (long long v : completionTimes(f, e, reqs)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
