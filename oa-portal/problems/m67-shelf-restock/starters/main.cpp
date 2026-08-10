#include <bits/stdc++.h>
using namespace std;

/* shelves[i] = {current stock, capacity}. Return the best achievable
   smallest fill ratio, in millionths (the ratio times 10^6, rounded down). */
long long bestMinRatioMillionths(const vector<pair<long long,long long>>& shelves, long long T) {
    // write your code here

    return 0;
}

int main() {
    int n;
    long long T;
    if (scanf("%d %lld", &n, &T) != 2) return 0;
    vector<pair<long long,long long>> shelves(n);
    for (auto &s : shelves) scanf("%lld %lld", &s.first, &s.second);

    printf("%lld\n", bestMinRatioMillionths(shelves, T));
    return 0;
}
