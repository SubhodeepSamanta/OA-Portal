#include <bits/stdc++.h>
using namespace std;

/* p[i] is ticket i+1's priority. Return the ticket NUMBERS in resolution order. */
vector<int> resolutionOrder(const vector<long long>& p) {
    // write your code here

    return vector<int>();
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> p(n);
    for (auto &x : p) scanf("%lld", &x);

    string out;
    vector<int> order = resolutionOrder(p);
    for (size_t i = 0; i < order.size(); i++) { if (i) out += ' '; out += to_string(order[i]); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
