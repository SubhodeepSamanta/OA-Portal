// Brute force - c14 / Q84
//
// Enumerates every SIMPLE cycle by depth-first search and reports the first
// with negative total weight. No relaxation, no distance array, no parent
// pointers - genuinely different machinery from Bellman-Ford.
//
// It is correct to look only at simple cycles: any closed walk of negative
// weight decomposes into simple cycles, and if every one of those were
// non-negative the walk could not be negative either. So a negative cycle
// exists exactly when a negative SIMPLE cycle exists.
//
// The enumeration is exponential, so it is bounded; the generator keeps every
// stress case inside that bound.
#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<vector<pair<int, long long>>> adj;
vector<int> path_;
vector<char> onPath;
vector<int> answer;
bool found = false;

// Explore simple paths that start at `start`, only visiting nodes >= start so
// each cycle is enumerated once, from its lowest-numbered node.
void dfs(int start, int v, long long weight) {
    if (found) return;
    for (auto [w, c] : adj[v]) {
        if (found) return;
        if (w == start) {
            if (weight + c < 0) {
                answer = path_;
                answer.push_back(start);
                found = true;
                return;
            }
            continue;
        }
        if (w < start || onPath[w]) continue;
        onPath[w] = 1;
        path_.push_back(w);
        dfs(start, w, weight + c);
        path_.pop_back();
        onPath[w] = 0;
    }
}

int main() {
    if (scanf("%d %d", &n, &m) != 2) return 0;
    adj.assign(n + 1, {});
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        scanf("%d %d %lld", &a, &b, &c);
        adj[a].push_back({ b, c });
    }

    onPath.assign(n + 1, 0);
    for (int s = 1; s <= n && !found; s++) {
        path_.clear();
        path_.push_back(s);
        onPath[s] = 1;
        dfs(s, s, 0);
        onPath[s] = 0;
    }

    if (!found) { printf("NO\n"); return 0; }

    string out = "YES\n";
    for (size_t i = 0; i < answer.size(); i++) {
        out += to_string(answer[i]);
        out += (i + 1 == answer.size() ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
