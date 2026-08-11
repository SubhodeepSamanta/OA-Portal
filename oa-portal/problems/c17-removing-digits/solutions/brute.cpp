// Brute force - c17 / Q101
// Breadth-first search from n downwards, treating each value as a node with an
// edge to v - d for every digit d it contains. Same answer, arrived at as a
// shortest path rather than as a filled table - and it explores in the
// opposite direction from the reference.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    vector<int> dist(n + 1, -1), q;
    q.reserve(n + 1);
    q.push_back(n);
    dist[n] = 0;

    for (size_t i = 0; i < q.size(); i++) {
        int v = q[i];
        if (v == 0) break;
        for (int t = v; t; t /= 10) {
            int d = t % 10;
            if (d == 0) continue;
            int w = v - d;
            if (dist[w] == -1) { dist[w] = dist[v] + 1; q.push_back(w); }
        }
    }
    printf("%d\n", dist[0]);
    return 0;
}
