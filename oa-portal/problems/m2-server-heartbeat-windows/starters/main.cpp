#include <bits/stdc++.h>
using namespace std;

vector<int> windowPeaks(const vector<int>& a, int w) {
    // write your code here

    return {};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, w;
    if (!(cin >> n >> w)) return 0;
    vector<int> a(n);
    for (auto &x : a) cin >> x;

    vector<int> res = windowPeaks(a, w);
    string out;
    out.reserve(res.size() * 4);
    for (size_t i = 0; i < res.size(); i++) {
        if (i) out += ' ';
        out += to_string(res[i]);
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
