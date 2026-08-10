// Reference - m46 / Q133 Broken Keyboard
// One pass with a 26-slot lookup table.
#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;
    int n = (int)strlen(buf);

    int k;
    if (scanf("%d", &k) != 1) return 0;
    bool works[26] = {false};
    for (int i = 0; i < k; i++) {
        char c[8];
        scanf("%s", c);
        works[c[0] - 'a'] = true;
    }

    int best = 0, run = 0;
    for (int i = 0; i < n; i++) {
        if (works[buf[i] - 'a']) { run++; if (run > best) best = run; }
        else run = 0;
    }
    printf("%d\n", best);
    return 0;
}
