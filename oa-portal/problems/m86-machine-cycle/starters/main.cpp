#include <bits/stdc++.h>
using namespace std;

// next[i] is the state the machine moves to from state i.
int stateAfter(const vector<int>& next, int start, long long T) {
    // write your code here

    return 0;
}

int main() {
    int n, s;
    long long T;
    if (scanf("%d %d %lld", &n, &s, &T) != 3) return 0;
    vector<int> next(n);
    for (auto &x : next) scanf("%d", &x);

    printf("%d\n", stateAfter(next, s, T));
    return 0;
}
