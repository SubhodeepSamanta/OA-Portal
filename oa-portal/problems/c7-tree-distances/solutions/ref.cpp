// Reference - c7 / Q60 Tree Distances I (CSES 1132)
// The furthest node from any v is an endpoint of the diameter, so three BFS
// passes answer every node at once. Iterative throughout - the tree can be a
// 2e5-deep path.
#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> head_, nxt_, to_;

void addEdge(int u, int v) {
    to_.push_back(v); nxt_.push_back(head_[u]); head_[u] = (int)to_.size() - 1;
}

// BFS from src, fill dist, return the furthest node
int bfs(int src, vector<int>& dist) {
    dist.assign(n + 1, -1);
    vector<int> q;
    q.reserve(n);
    q.push_back(src);
    dist[src] = 0;
    int best = src;
    for (size_t i = 0; i < q.size(); i++) {
        int u = q[i];
        if (dist[u] > dist[best]) best = u;
        for (int e = head_[u]; e != -1; e = nxt_[e]) {
            int v = to_[e];
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push_back(v); }
        }
    }
    return best;
}

int main() {
    if (scanf("%d", &n) != 1) return 0;
    head_.assign(n + 1, -1);
    to_.reserve(2 * (n > 0 ? n - 1 : 0));
    nxt_.reserve(2 * (n > 0 ? n - 1 : 0));
    for (int i = 0; i < n - 1; i++) {
        int a, b; scanf("%d %d", &a, &b);
        addEdge(a, b);
        addEdge(b, a);
    }

    vector<int> d0, dA, dB;
    int a = bfs(1, d0);
    int b = bfs(a, dA);
    bfs(b, dB);

    string out;
    out.reserve(n * 7);
    for (int v = 1; v <= n; v++) {
        out += to_string(max(dA[v], dB[v]));
        out += (v == n ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
