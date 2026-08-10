// Brute force - m80 / Q183
// Count occurrences in a map and report the two singletons. No bit tricks.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    map<long long, int> count;
    for (int i = 0; i < n; i++) {
        long long v;
        scanf("%lld", &v);
        count[v]++;
    }

    vector<long long> once;
    for (const auto &kv : count) if (kv.second == 1) once.push_back(kv.first);
    sort(once.begin(), once.end());

    printf("%lld %lld\n", once[0], once[1]);
    return 0;
}
