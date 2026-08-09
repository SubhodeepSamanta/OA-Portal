// Reference - m21 / Q37 Cable Merge Cost
// Repeatedly splice the two shortest segments; a min-heap makes each step O(log n).
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> v(n);
    for (auto &x : v) scanf("%lld", &x);

    priority_queue<long long, vector<long long>, greater<long long>> pq(v.begin(), v.end());
    long long total = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        total += a + b;
        pq.push(a + b);
    }
    printf("%lld\n", total);
    return 0;
}
