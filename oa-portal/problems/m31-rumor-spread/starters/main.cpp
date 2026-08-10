#include <bits/stdc++.h>
using namespace std;

/* grid[i][j] is one of . # R. Return -1 if somebody can never hear it. */
int minutesToSpread(const vector<string>& grid) {
    // write your code here

    return -1;
}

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> grid(r);
    {
        vector<char> buf(c + 8);
        for (int i = 0; i < r; i++) { scanf("%s", buf.data()); grid[i] = buf.data(); }
    }

    printf("%d\n", minutesToSpread(grid));
    return 0;
}
