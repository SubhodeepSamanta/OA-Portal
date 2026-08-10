// Reference - m78 / Q177 Lucky Token Count
// Digit DP over (position, digit sum used, still tight against N).
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

string D;
int S, L;
long long memo[20][170][2];

long long go(int pos, int sum, int tight) {
    if (sum > S) return 0;
    if (pos == L) return sum == S ? 1 : 0;
    long long &m = memo[pos][sum][tight];
    if (m >= 0) return m;
    int hi = tight ? D[pos] - '0' : 9;
    long long r = 0;
    for (int d = 0; d <= hi; d++)
        r = (r + go(pos + 1, sum + d, (tight && d == hi) ? 1 : 0)) % MOD;
    return m = r;
}

int main() {
    long long N;
    if (scanf("%lld %d", &N, &S) != 2) return 0;
    D = to_string(N);
    L = (int)D.size();
    memset(memo, -1, sizeof(memo));
    printf("%lld\n", go(0, 0, 1));
    return 0;
}
