#include <bits/stdc++.h>
using namespace std;

/* works[c - 'a'] is true when that key still functions. */
int longestTypeableRun(const string& s, const vector<bool>& works) {
    // write your code here

    return 0;
}

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;
    int k;
    if (scanf("%d", &k) != 1) return 0;
    vector<bool> works(26, false);
    for (int i = 0; i < k; i++) { char c[8]; scanf("%s", c); works[c[0] - 'a'] = true; }

    printf("%d\n", longestTypeableRun(buf, works));
    return 0;
}
