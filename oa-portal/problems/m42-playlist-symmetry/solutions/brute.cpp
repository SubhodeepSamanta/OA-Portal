// Brute force - m42 / Q127
// Every substring, tested directly, collected in a set. No tree anywhere.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[200006];
    if (scanf("%s", buf) != 1) return 0;
    string s = buf;
    int n = (int)s.size();

    set<string> seen;
    for (int i = 0; i < n; i++)
        for (int j = i; j < n; j++) {
            bool pal = true;
            for (int a = i, b = j; a < b; a++, b--)
                if (s[a] != s[b]) { pal = false; break; }
            if (pal) seen.insert(s.substr(i, j - i + 1));
        }

    printf("%d\n", (int)seen.size());
    return 0;
}
