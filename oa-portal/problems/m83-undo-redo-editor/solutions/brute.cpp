// Brute force - m83 / Q199
// Keep the document as a real string and snapshot it before every edit.
// Quadratic, and completely free of trees or binary lifting.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;

    string doc;
    vector<string> undoStack, redoStack;
    string out;
    char cmd[16], buf[200005];

    for (int i = 0; i < q; i++) {
        scanf("%s", cmd);
        if (cmd[0] == 'A') {
            scanf("%s", buf);
            undoStack.push_back(doc);
            redoStack.clear();
            doc += buf;
        } else if (cmd[0] == 'D') {
            int k;
            scanf("%d", &k);
            undoStack.push_back(doc);
            redoStack.clear();
            doc.erase(doc.size() - k);
        } else if (cmd[0] == 'U') {
            if (!undoStack.empty()) { redoStack.push_back(doc); doc = undoStack.back(); undoStack.pop_back(); }
        } else if (cmd[0] == 'R') {
            if (!redoStack.empty()) { undoStack.push_back(doc); doc = redoStack.back(); redoStack.pop_back(); }
        } else {
            int idx;
            scanf("%d", &idx);
            out += doc[idx - 1];
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
