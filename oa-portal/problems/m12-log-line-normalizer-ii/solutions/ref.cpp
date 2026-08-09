// Reference - m12 / Q52 Log Line Normalizer II, O(n)
//
// Whatever survives is described by three things: the first kept index i
// (which must be 'a'), the last kept index j (which must be 'b'), and a split
// point m with the a-run in [i, m-1] and the b-run in [m, j].
//
//   cost = i*p                                   front trims
//        + r * (#b in [i, m-1])                  splices inside the a-run
//        + r * (#a in [m, j])                    splices inside the b-run
//        + (n-1-j)*q                             back trims
//
// Sweeping m, the two halves are independent:
//   Left[m]  = r*B[m] + min over i<m with s[i]=='a' of ( i*p - r*B[i] )
//   Right[m] = -r*A[m] + min over j>=m with s[j]=='b' of ( (n-1-j)*q + r*A[j+1] )
// each maintained with a running minimum. Answer = min over m of Left+Right.
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    long long p, q, r;
    if (!(cin >> s)) return 0;
    cin >> p >> q >> r;
    int n = (int)s.size();

    const long long INF = LLONG_MAX / 4;

    // A[k] / B[k] = count of 'a' / 'b' in s[0 .. k-1]
    vector<long long> A(n + 1, 0), B(n + 1, 0);
    for (int k = 0; k < n; k++) {
        A[k + 1] = A[k] + (s[k] == 'a');
        B[k + 1] = B[k] + (s[k] == 'b');
    }

    // Left[m] for m = 1..n-1
    vector<long long> Left(n + 1, INF);
    {
        long long best = INF;                       // min over i<m, s[i]=='a'
        for (int m = 1; m <= n; m++) {
            int i = m - 1;
            if (s[i] == 'a') best = min(best, (long long)i * p - r * B[i]);
            if (best < INF) Left[m] = r * B[m] + best;
        }
    }

    // Right[m] for m = 1..n-1
    vector<long long> Right(n + 1, INF);
    {
        long long best = INF;                       // min over j>=m, s[j]=='b'
        for (int m = n - 1; m >= 0; m--) {
            int j = m;
            if (s[j] == 'b') best = min(best, (long long)(n - 1 - j) * q + r * A[j + 1]);
            if (best < INF) Right[m] = -r * A[m] + best;
        }
    }

    long long ans = INF;
    for (int m = 1; m <= n - 1; m++) {
        if (Left[m] >= INF || Right[m] >= INF) continue;
        ans = min(ans, Left[m] + Right[m]);
    }

    cout << (ans >= INF ? -1 : ans) << '\n';
    return 0;
}
