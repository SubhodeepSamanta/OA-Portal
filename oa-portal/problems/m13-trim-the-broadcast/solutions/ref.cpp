// Reference - m13 / Q54 Trim the Broadcast, O(n)
//
// Cutting only from the ends means we are choosing a contiguous run.
// "average >= t" becomes "sum of (a[i] - t) >= 0", so with
//     P[j] = sum of the first j shifted scores
// we want the longest (i, j) with i < j and P[j] >= P[i].
//
// Build a stack of indices whose P values strictly decrease from the left -
// only those can ever be the best left endpoint. Then sweep j from the right,
// popping while P[stack.top] <= P[j].
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long t;
    if (!(cin >> n >> t)) return 0;

    vector<long long> P(n + 1, 0);
    for (int i = 0; i < n; i++) {
        long long v; cin >> v;
        P[i + 1] = P[i] + (v - t);
    }

    vector<int> st;
    st.reserve(n + 1);
    for (int i = 0; i <= n; i++) {
        if (st.empty() || P[i] < P[st.back()]) st.push_back(i);
    }

    int best = 0;
    for (int j = n; j >= 0; j--) {
        while (!st.empty() && P[st.back()] <= P[j]) {
            best = max(best, j - st.back());
            st.pop_back();
        }
    }

    cout << best << '\n';
    return 0;
}
