// Reference - m47 / Q134 Token Refill
// Only the level at each arrival matters, so jump straight between arrivals:
// level = min(C, level + gap), then serve or reject.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long C;
    if (scanf("%d %lld", &n, &C) != 2) return 0;

    long long level = C, prev = 0;
    int served = 0;
    for (int i = 0; i < n; i++) {
        long long t, c;
        scanf("%lld %lld", &t, &c);
        level = min(C, level + (t - prev));
        prev = t;
        if (level >= c) { level -= c; served++; }
    }
    printf("%d\n", served);
    return 0;
}
