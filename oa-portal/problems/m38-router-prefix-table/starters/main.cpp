#include <bits/stdc++.h>
using namespace std;

/* One answer per address: the length of the longest rule that is a prefix
   of it, or -1 when none is. */
vector<int> longestMatches(const vector<string>& rules, const vector<string>& addresses) {
    // write your code here

    return vector<int>(addresses.size(), -1);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<char> buf(64);
    vector<string> rules(n), addresses(q);
    for (int i = 0; i < n; i++) { scanf("%s", buf.data()); rules[i] = buf.data(); }
    for (int i = 0; i < q; i++) { scanf("%s", buf.data()); addresses[i] = buf.data(); }

    string out;
    for (int v : longestMatches(rules, addresses)) { out += to_string(v); out += '\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
