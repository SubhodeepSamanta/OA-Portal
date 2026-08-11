#include <bits/stdc++.h>
using namespace std;

int maxPages(int x, const vector<int>& price, const vector<int>& pages) {
    // write your code here

    return 0;
}

int main() {
    int n, x;
    if (scanf("%d %d", &n, &x) != 2) return 0;
    vector<int> price(n), pages(n);
    for (auto &v : price) scanf("%d", &v);
    for (auto &v : pages) scanf("%d", &v);

    printf("%d\n", maxPages(x, price, pages));
    return 0;
}
