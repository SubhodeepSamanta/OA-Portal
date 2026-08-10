// Reference - m51 / Q138 Version Rollback Tree
//
// Each version is one node whose depth IS its length and whose stored
// character is the one appended to reach it. So the k-th character of v is
// the character on the ancestor of v at depth k - a jump of depth[v] - k
// steps, done with binary lifting in O(log q).
#include <bits/stdc++.h>
using namespace std;

const int LOG = 18;

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;

    vector<array<int, LOG>> up(q + 1);
    vector<int> depth(q + 1, 0);
    vector<char> ch(q + 1, 0);
    for (int j = 0; j < LOG; j++) up[0][j] = 0;

    int versions = 0;
    string out;
    out.reserve((size_t)q * 2);

    char op[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", op);
        if (op[0] == 'E') {
            int v;
            char c[8];
            scanf("%d %s", &v, c);
            int cur = ++versions;
            depth[cur] = depth[v] + 1;
            ch[cur] = c[0];
            up[cur][0] = v;
            for (int j = 1; j < LOG; j++) up[cur][j] = up[up[cur][j - 1]][j - 1];
        } else {
            int v, k;
            scanf("%d %d", &v, &k);
            int steps = depth[v] - k;              // climb to the node at depth k
            int node = v;
            for (int j = 0; j < LOG; j++)
                if (steps & (1 << j)) node = up[node][j];
            out += ch[node];
            out += '\n';
        }
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
