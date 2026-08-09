// Reference solution - m1 / Q2 Refund Reconciliation
// prefix sums + frequency map, O(n)
#include <bits/stdc++.h>
using namespace std;

struct H {
    static uint64_t splitmix64(uint64_t x) {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return x ^ (x >> 31);
    }
    size_t operator()(long long v) const {
        static const uint64_t S =
            chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64((uint64_t)v + S);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;

    unordered_map<long long, long long, H> freq;
    freq.reserve(n * 2);
    freq.max_load_factor(0.5f);
    freq[0] = 1;

    long long pref = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        long long v;
        cin >> v;
        pref += v;
        auto it = freq.find(pref - k);
        if (it != freq.end()) ans += it->second;
        freq[pref] += 1;
    }

    cout << ans << '\n';
    return 0;
}
