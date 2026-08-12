// Reference - c27 / Q123 Finding Borders (CSES 1732)
// The borders of a string are exactly the chain fail[n-1], fail[that-1], ...
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;
    string s = buf;
    int n = (int)s.size();

    vector<int> fail(n, 0);
    for (int i = 1, k = 0; i < n; i++) {
        while (k > 0 && s[i] != s[k]) k = fail[k - 1];
        if (s[i] == s[k]) k++;
        fail[i] = k;
    }

    vector<int> borders;
    for (int k = fail[n - 1]; k > 0; k = fail[k - 1]) borders.push_back(k);
    reverse(borders.begin(), borders.end());

    string out;
    out.reserve(borders.size() * 8 + 2);
    for (size_t i = 0; i < borders.size(); i++) {
        out += to_string(borders[i]);
        if (i + 1 < borders.size()) out += ' ';
    }
    out += '\n';                       // no borders -> just an empty line
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
