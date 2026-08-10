// Brute force - m53 / Q140
// Every window, counted directly. O(n^2) with a running tally per start.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[200006];
    if (scanf("%s", buf) != 1) return 0;
    int n = (int)strlen(buf);

    long long ans = 0;
    for (int i = 0; i < n; i++) {
        int zeros = 0, ones = 0;
        for (int j = i; j < n; j++) {
            if (buf[j] == '0') zeros++; else ones++;
            if (zeros == ones) ans++;
        }
    }
    printf("%lld\n", ans);
    return 0;
}
