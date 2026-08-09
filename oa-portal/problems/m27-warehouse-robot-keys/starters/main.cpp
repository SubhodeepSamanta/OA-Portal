#include <bits/stdc++.h>
using namespace std;

/* grid[i][j] is one of . # S X a-f A-F. Return -1 if X cannot be reached. */
int fewestMoves(const vector<string>& grid) {
    // write your code here

    return -1;
}

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> grid(r);
    for (int i = 0; i < r; i++) {
        char buf[128];
        scanf("%s", buf);
        grid[i] = buf;
    }

    printf("%d\n", fewestMoves(grid));
    return 0;
}
