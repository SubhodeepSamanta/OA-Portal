// Reference - m42 / Q127 Playlist Symmetry
//
// Palindromic tree (eertree). Every node is one distinct palindromic
// substring, so the answer is simply the node count. Two roots are kept:
// one of length -1 (so that odd palindromes bottom out) and one of length 0.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[200006];
    if (scanf("%s", buf) != 1) return 0;
    int n = (int)strlen(buf);

    vector<array<int, 26>> nxt;
    vector<int> len, link;
    auto newNode = [&](int l, int lk) {
        array<int, 26> e;
        e.fill(0);
        nxt.push_back(e);
        len.push_back(l);
        link.push_back(lk);
        return (int)len.size() - 1;
    };

    nxt.reserve(n + 2); len.reserve(n + 2); link.reserve(n + 2);
    newNode(-1, 0);          // node 0: imaginary root of length -1
    newNode(0, 0);           // node 1: empty string
    int last = 1;

    // walk up the suffix links until the palindrome can be extended by buf[i]
    auto findExtendable = [&](int v, int i) {
        while (i - len[v] - 1 < 0 || buf[i - len[v] - 1] != buf[i]) v = link[v];
        return v;
    };

    for (int i = 0; i < n; i++) {
        int c = buf[i] - 'a';
        int x = findExtendable(last, i);
        if (nxt[x][c]) { last = nxt[x][c]; continue; }
        int cur = newNode(len[x] + 2, 1);
        if (len[cur] != 1) link[cur] = nxt[findExtendable(link[x], i)][c];
        nxt[x][c] = cur;
        last = cur;
    }

    printf("%d\n", (int)len.size() - 2);   // discount the two roots
    return 0;
}
