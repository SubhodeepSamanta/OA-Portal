#include <bits/stdc++.h>
using namespace std;

string shortestRoute(const vector<string>& grid) {
    // write your code here

    return "";
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<string> grid(n);
    for (int i = 0; i < n; i++) {
        char buf[1024];
        scanf("%s", buf);
        grid[i] = buf;
    }

    string route = shortestRoute(grid);
    if (route.empty()) { printf("NO\n"); return 0; }
    printf("YES\n%d\n%s\n", (int)route.size(), route.c_str());
    return 0;
}
