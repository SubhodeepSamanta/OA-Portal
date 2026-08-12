#include <bits/stdc++.h>
using namespace std;

vector<int> borderLengths(const string& s) {
    // write your code here

    return {};
}

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;

    vector<int> borders = borderLengths(string(buf));
    string out;
    for (size_t i = 0; i < borders.size(); i++) {
        out += to_string(borders[i]);
        if (i + 1 < borders.size()) out += ' ';
    }
    out += '\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
