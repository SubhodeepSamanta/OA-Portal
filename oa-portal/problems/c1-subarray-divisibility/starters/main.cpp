#include <bits/stdc++.h>
using namespace std;

// Count the subarrays whose sum is divisible by n (the array's own length).
long long countDivisibleSubarrays(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%lld\n", countDivisibleSubarrays(a));
    return 0;
}
