#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

long long countPaths(const vector<string>& grid) {
    // write your code here

    return 0;
}

int main() {
    int H, W;
    if (scanf("%d %d", &H, &W) != 2) return 0;
    vector<string> grid(H);
    for (int r = 0; r < H; r++) {
        static char buf[1005];
        scanf("%s", buf);
        grid[r] = buf;
    }

    printf("%lld\n", countPaths(grid));
    return 0;
}
