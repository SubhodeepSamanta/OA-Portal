#include <bits/stdc++.h>
using namespace std;

int shortestWindow(const vector<int>& brands) {
    // write your code here

    return (int)brands.size();
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> brands(n);
    for (auto &x : brands) scanf("%d", &x);

    printf("%d\n", shortestWindow(brands));
    return 0;
}
