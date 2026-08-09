// Reference solution - m5 / Q12 Loyalty Streak
// prefix sums + map of FIRST occurrence index, O(n)
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

    unordered_map<long long, int, H> firstAt;
    firstAt.reserve(n * 2);
    firstAt.max_load_factor(0.5f);
    firstAt[0] = -1;                 // empty prefix ends before index 0

    long long pref = 0;
    int best = 0;
    for (int i = 0; i < n; i++) {
        long long v;
        cin >> v;
        pref += v;

        auto it = firstAt.find(pref - k);
        if (it != firstAt.end()) best = max(best, i - it->second);

        // keep only the EARLIEST index for each prefix value
        if (!firstAt.count(pref)) firstAt[pref] = i;
    }

    cout << best << '\n';
    return 0;
}
