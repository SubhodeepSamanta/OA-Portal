#include <bits/stdc++.h>
using namespace std;

vector<int> assignRooms(const vector<int>& a, const vector<int>& b) {
    // write your code here

    return vector<int>(a.size(), 1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n), b(n);
    for (int i = 0; i < n; i++) scanf("%d %d", &a[i], &b[i]);

    vector<int> room = assignRooms(a, b);
    int k = 0;
    for (int r : room) k = max(k, r);

    string out = to_string(k);
    out += '\n';
    for (int i = 0; i < n; i++) {
        out += to_string(room[i]);
        out += (i + 1 == n ? '\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
