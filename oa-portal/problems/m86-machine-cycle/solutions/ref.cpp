// Reference - m86 / Q207 Machine Cycle
// Walk from s until a state repeats: that splits the walk into a tail and a
// cycle, and T is either inside the tail or folded into the cycle.
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, s, T;
    if (scanf("%lld %lld %lld", &n, &s, &T) != 3) return 0;
    vector<int> f(n);
    for (long long i = 0; i < n; i++) scanf("%d", &f[i]);

    vector<long long> firstSeen(n, -1);
    vector<int> order;
    order.reserve(n);

    long long cur = s, step = 0;
    while (firstSeen[cur] == -1) {
        firstSeen[cur] = step++;
        order.push_back((int)cur);
        if (step > T) break;                       // T is inside the tail
        cur = f[cur];
    }

    if (T < (long long)order.size()) { printf("%d\n", order[T]); return 0; }

    long long start = firstSeen[cur];              // cycle begins here
    long long len = (long long)order.size() - start;
    printf("%d\n", order[start + (T - start) % len]);
    return 0;
}
