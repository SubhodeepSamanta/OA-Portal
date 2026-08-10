// Reference - m83 / Q199 Undo-Redo Editor
//
// Every document that ever exists is a root path in a trie of appended
// characters, so a version is one node: its depth is the length, DELETE k
// climbs k steps, and PRINT i reads the ancestor at depth i. Both jumps use
// binary lifting. Undo and redo are just stacks of node pointers.
#include <bits/stdc++.h>
using namespace std;

const int LOG = 18;

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;

    // node 0 is the empty document
    vector<array<int, LOG>> up(1);
    vector<int> depth(1, 0);
    vector<char> ch(1, 0);
    for (int j = 0; j < LOG; j++) up[0][j] = 0;

    auto addChild = [&](int parent, char c) {
        int id = (int)depth.size();
        array<int, LOG> lift;
        lift[0] = parent;
        for (int j = 1; j < LOG; j++) lift[j] = up[lift[j - 1]][j - 1];
        up.push_back(lift);
        depth.push_back(depth[parent] + 1);
        ch.push_back(c);
        return id;
    };
    auto climb = [&](int v, int steps) {
        for (int j = 0; j < LOG && v; j++) if (steps & (1 << j)) v = up[v][j];
        return v;
    };

    int cur = 0;
    vector<int> undoStack, redoStack;
    string out;
    char cmd[16], buf[200005];

    for (int i = 0; i < q; i++) {
        scanf("%s", cmd);
        if (cmd[0] == 'A') {
            scanf("%s", buf);
            undoStack.push_back(cur);
            redoStack.clear();
            for (int t = 0; buf[t]; t++) cur = addChild(cur, buf[t]);
        } else if (cmd[0] == 'D') {
            int k;
            scanf("%d", &k);
            undoStack.push_back(cur);
            redoStack.clear();
            cur = climb(cur, k);
        } else if (cmd[0] == 'U') {
            if (!undoStack.empty()) { redoStack.push_back(cur); cur = undoStack.back(); undoStack.pop_back(); }
        } else if (cmd[0] == 'R') {
            if (!redoStack.empty()) { undoStack.push_back(cur); cur = redoStack.back(); redoStack.pop_back(); }
        } else {
            int idx;
            scanf("%d", &idx);
            int node = climb(cur, depth[cur] - idx);
            out += ch[node];
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
