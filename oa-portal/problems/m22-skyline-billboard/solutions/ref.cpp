// Reference - m22 / Q41 Skyline Billboard
// Monotonic stack of increasing heights; each building is popped once and its
// maximal span is known exactly at that moment.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> h(n + 1);
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    h[n] = -1;                      // sentinel forces the stack to drain

    vector<int> st;
    st.reserve(n + 1);
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        while (!st.empty() && h[st.back()] >= h[i]) {
            long long ht = h[st.back()];
            st.pop_back();
            long long left = st.empty() ? -1 : st.back();
            long long width = (long long)i - left - 1;
            best = max(best, ht * width);
        }
        st.push_back(i);
    }
    printf("%lld\n", best);
    return 0;
}
