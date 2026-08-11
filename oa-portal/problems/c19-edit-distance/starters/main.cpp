#include <bits/stdc++.h>
using namespace std;

// Minimum insertions, removals and replacements to turn a into b.
int editDistance(const string& a, const string& b) {
    // write your code here

    return 0;
}

int main() {
    static char bufA[5005], bufB[5005];
    if (scanf("%s", bufA) != 1) return 0;
    if (scanf("%s", bufB) != 1) return 0;

    printf("%d\n", editDistance(string(bufA), string(bufB)));
    return 0;
}
