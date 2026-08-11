#include <bits/stdc++.h>
using namespace std;

/* ops[i] is one command line, exactly as read.
   Return one character per PRINT, in order. */
vector<char> runEditor(const vector<string>& ops) {
    // write your code here

    return vector<char>();
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<string> ops(q);
    {
        char cmd[16];
        static char buf[200005];
        for (int i = 0; i < q; i++) {
            scanf("%s", cmd);
            ops[i] = cmd;
            if (cmd[0] == 'A' || cmd[0] == 'D' || cmd[0] == 'P') {
                scanf("%s", buf);
                ops[i] += ' ';
                ops[i] += buf;
            }
        }
    }

    string out;
    for (char c : runEditor(ops)) { out += c; out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
