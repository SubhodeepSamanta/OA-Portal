#include <bits/stdc++.h>
using namespace std;

string longestCommonSubsequence(const string& s, const string& t) {
    // write your code here

    return "";
}

int main() {
    static char bs[3005], bt[3005];
    if (scanf("%s", bs) != 1) return 0;
    if (scanf("%s", bt) != 1) return 0;

    printf("%s\n", longestCommonSubsequence(string(bs), string(bt)).c_str());
    return 0;
}
