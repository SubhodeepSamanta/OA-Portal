#include <bits/stdc++.h>
using namespace std;

/* Patients sharing a score always land in the same bucket. */
long long smallestLargestBucket(vector<int> scores, int k) {
    // write your code here

    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<int> scores(n);
    for (auto &x : scores) scanf("%d", &x);

    printf("%lld\n", smallestLargestBucket(scores, k));
    return 0;
}
