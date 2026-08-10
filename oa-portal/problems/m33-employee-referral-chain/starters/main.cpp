#include <bits/stdc++.h>
using namespace std;

/* f[i] is the person employee i referred, for i from 1 to n; f[0] is unused.
   Return chain sizes for employees 1..n, counting the employee themselves. */
vector<long long> chainSizes(int n, const vector<int>& f) {
    // write your code here

    return vector<long long>(n, 1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> f(n + 1, 1);
    for (int i = 1; i <= n; i++) scanf("%d", &f[i]);

    vector<long long> res = chainSizes(n, f);
    string out;
    for (size_t i = 0; i < res.size(); i++) { if (i) out += ' '; out += to_string(res[i]); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
