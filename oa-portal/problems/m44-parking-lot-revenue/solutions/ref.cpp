// Reference - m44 / Q131 Parking Lot Revenue
// Min-heap of departure times. Pop everything that has already left, then a
// bay is free exactly when fewer than k entries remain.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;

    priority_queue<long long, vector<long long>, greater<long long>> busy;
    long long revenue = 0;
    for (int i = 0; i < n; i++) {
        long long a, d;
        scanf("%lld %lld", &a, &d);
        while (!busy.empty() && busy.top() <= a) busy.pop();
        if ((int)busy.size() < k) { busy.push(d); revenue += d - a; }
    }
    printf("%lld\n", revenue);
    return 0;
}
