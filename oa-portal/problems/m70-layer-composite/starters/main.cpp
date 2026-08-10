#include <bits/stdc++.h>
using namespace std;

/* layers[i] = {x1, y1, x2, y2}, half-open. The last one is on top.
   Count the pixels covered by the top layer and by no other. */
long long exclusiveTopArea(const vector<array<long long,4>>& layers) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,4>> layers(n);
    for (auto &r : layers) scanf("%lld %lld %lld %lld", &r[0], &r[1], &r[2], &r[3]);

    printf("%lld\n", exclusiveTopArea(layers));
    return 0;
}
