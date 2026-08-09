#include <bits/stdc++.h>
using namespace std;

/* orders[i] = {placed at, minutes of cooking needed}, in input order. */
long long minTotalCompletion(vector<pair<long long,long long>> orders) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<pair<long long,long long>> orders(n);
    for (auto &o : orders) cin >> o.first >> o.second;

    cout << minTotalCompletion(orders) << '\n';
    return 0;
}
