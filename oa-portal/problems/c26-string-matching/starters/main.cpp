#include <bits/stdc++.h>
using namespace std;

// Occurrences of pattern in text. They may OVERLAP.
long long countOccurrences(const string& text, const string& pattern) {
    // write your code here

    return 0;
}

int main() {
    static char bufS[1000006], bufP[1000006];
    if (scanf("%s", bufS) != 1) return 0;
    if (scanf("%s", bufP) != 1) return 0;

    printf("%lld\n", countOccurrences(string(bufS), string(bufP)));
    return 0;
}
