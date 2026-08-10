// Reference - m55 / Q150 Transaction Router
//
// Read everything first so the success-rate axis can be compressed, then keep
// a segment tree of minimum cost over that axis. Each leaf holds a multiset,
// because several gateways can share a success rate and removing one must
// expose the next cheapest rather than clearing the leaf.
#include <bits/stdc++.h>
using namespace std;

const long long INF = LLONG_MAX / 4;

int SZ;
vector<long long> tree;
vector<multiset<long long>> leafSet;

void refresh(int pos) {
    int node = pos + SZ;
    tree[node] = leafSet[pos].empty() ? INF : *leafSet[pos].begin();
    for (node >>= 1; node >= 1; node >>= 1)
        tree[node] = min(tree[node << 1], tree[node << 1 | 1]);
}

long long querySuffix(int lo) {                 // min over leaves [lo, SZ-1]
    long long best = INF;
    for (int l = lo + SZ, r = 2 * SZ; l < r; l >>= 1, r >>= 1) {
        if (l & 1) best = min(best, tree[l++]);
        if (r & 1) best = min(best, tree[--r]);
    }
    return best;
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;

    vector<long long> initP(n), initC(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &initP[i], &initC[i]);

    vector<int> type(q);
    vector<long long> arg1(q), arg2(q);
    vector<long long> coords(initP.begin(), initP.end());

    char op[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'A') {
            type[i] = 0;
            scanf("%lld %lld", &arg1[i], &arg2[i]);
            coords.push_back(arg1[i]);
        } else if (op[0] == 'R' && op[1] == 'E') {
            type[i] = 1;
            scanf("%lld", &arg1[i]);
        } else {
            type[i] = 2;
            scanf("%lld", &arg1[i]);
        }
    }

    sort(coords.begin(), coords.end());
    coords.erase(unique(coords.begin(), coords.end()), coords.end());
    auto idx = [&](long long v) {
        return (int)(lower_bound(coords.begin(), coords.end(), v) - coords.begin());
    };

    SZ = 1;
    while (SZ < (int)coords.size()) SZ <<= 1;
    tree.assign(2 * SZ, INF);
    leafSet.assign(SZ, multiset<long long>());

    // gateway id -> (compressed rate, cost); ids are 1-based and never reused
    vector<int> gwPos(n + q + 2, -1);
    vector<long long> gwCost(n + q + 2, 0);

    int nextId = 0;
    auto insertGw = [&](long long p, long long c) {
        int id = ++nextId;
        int pos = idx(p);
        gwPos[id] = pos;
        gwCost[id] = c;
        leafSet[pos].insert(c);
        refresh(pos);
    };
    for (int i = 0; i < n; i++) insertGw(initP[i], initC[i]);

    string out;
    out.reserve((size_t)q * 6);
    for (int i = 0; i < q; i++) {
        if (type[i] == 0) {
            insertGw(arg1[i], arg2[i]);
        } else if (type[i] == 1) {
            int id = (int)arg1[i];
            int pos = gwPos[id];
            leafSet[pos].erase(leafSet[pos].find(gwCost[id]));
            gwPos[id] = -1;
            refresh(pos);
        } else {
            // first compressed position whose rate is >= r
            int lo = (int)(lower_bound(coords.begin(), coords.end(), arg1[i]) - coords.begin());
            long long best = (lo >= (int)coords.size()) ? INF : querySuffix(lo);
            out += to_string(best >= INF ? -1LL : best);
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
