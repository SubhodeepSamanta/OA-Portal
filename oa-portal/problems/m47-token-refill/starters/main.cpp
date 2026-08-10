#include <bits/stdc++.h>
using namespace std;

/* requests[i] = {arrival time, tokens needed}, times strictly increasing.
   The bucket holds at most C and starts full at time 0. */
int servedCount(long long C, const vector<pair<long long,long long>>& requests) {
    // write your code here

    return 0;
}

int main() {
    int n;
    long long C;
    if (scanf("%d %lld", &n, &C) != 2) return 0;
    vector<pair<long long,long long>> requests(n);
    for (auto &r : requests) scanf("%lld %lld", &r.first, &r.second);

    printf("%d\n", servedCount(C, requests));
    return 0;
}
