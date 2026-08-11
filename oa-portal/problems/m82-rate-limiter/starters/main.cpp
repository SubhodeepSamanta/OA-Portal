#include <bits/stdc++.h>
using namespace std;

/* requests[i] = {userId, timestamp}, timestamps non-decreasing.
   Return true where the request is accepted. */
vector<char> decide(long long k, long long w, const vector<pair<int,long long>>& requests) {
    // write your code here

    return vector<char>(requests.size(), '0');
}

int main() {
    int q;
    long long k, w;
    if (scanf("%d %lld %lld", &q, &k, &w) != 3) return 0;
    vector<pair<int,long long>> requests(q);
    for (auto &r : requests) scanf("%d %lld", &r.first, &r.second);

    string out;
    for (char c : decide(k, w, requests)) out += c;
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
