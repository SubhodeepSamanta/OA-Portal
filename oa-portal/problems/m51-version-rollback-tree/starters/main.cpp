#include <bits/stdc++.h>
using namespace std;

/* ops[i] = {type, v, x}: type 1 is EDIT (x is the character), type 0 is
   QUERY (x is k). Return one character per QUERY, in order. */
vector<char> answerQueries(const vector<array<int,3>>& ops) {
    // write your code here

    return vector<char>();
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<array<int,3>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'E') {
            char c[8];
            scanf("%d %s", &ops[i][1], c);
            ops[i][0] = 1;
            ops[i][2] = c[0];
        } else {
            scanf("%d %d", &ops[i][1], &ops[i][2]);
            ops[i][0] = 0;
        }
    }

    string out;
    for (char c : answerQueries(ops)) { out += c; out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
