// Brute force - c12 / Q82
// DFS post-order reversed, with three colours for cycle detection - the other
// standard topological sort, and it normally emits a DIFFERENT valid order
// from Kahn's, which is exactly what the checker has to accept.
// Written with an explicit stack; the graph can be a 1e5-long chain.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b; scanf("%d %d", &a, &b);
        adj[a].push_back(b);
    }

    vector<char> colour(n + 1, 0);       // 0 = unvisited, 1 = on stack, 2 = done
    vector<int> post;
    post.reserve(n);
    vector<pair<int, size_t>> st;        // (node, how far through its edge list)

    for (int s = n; s >= 1; s--) {       // start from the far end, unlike Kahn's
        if (colour[s]) continue;
        st.push_back({ s, 0 });
        colour[s] = 1;
        while (!st.empty()) {
            // Read the top fresh each time: push_back below can reallocate the
            // vector, so holding a reference into it across that call dangles.
            int u = st.back().first;
            size_t idx = st.back().second;
            if (idx < adj[u].size()) {
                st.back().second = idx + 1;
                int v = adj[u][idx];
                if (colour[v] == 1) { printf("IMPOSSIBLE\n"); return 0; }
                if (colour[v] == 0) { colour[v] = 1; st.push_back({ v, 0 }); }
            } else {
                colour[u] = 2;
                post.push_back(u);
                st.pop_back();
            }
        }
    }

    reverse(post.begin(), post.end());
    string out;
    for (int i = 0; i < n; i++) { out += to_string(post[i]); out += (i + 1 == n ? '\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
