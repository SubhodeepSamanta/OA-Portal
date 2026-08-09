#include <bits/stdc++.h>
using namespace std;

/* exams[i] = {start, end} for exam i+1, in input order.
   Return {number of halls opened, exam numbers placed in hall 1 ascending}. */
pair<int, vector<int>> allocateHalls(vector<pair<long long,long long>> exams) {
    // write your code here

    return make_pair(1, vector<int>{1});
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<pair<long long,long long>> exams(n);
    for (auto &e : exams) cin >> e.first >> e.second;

    pair<int, vector<int>> r = allocateHalls(exams);
    string out = to_string(r.first);
    out += '\n';
    out += to_string(r.second.size());
    for (int v : r.second) { out += ' '; out += to_string(v); }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
