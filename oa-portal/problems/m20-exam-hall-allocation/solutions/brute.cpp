// Brute force - m20 / Q36
// The office procedure written out literally: keep an array of halls and
// linear-scan it from hall 1 upward looking for the first free one.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long, 3>> ex(n);
    for (int i = 0; i < n; i++) {
        long long s, e;
        scanf("%lld %lld", &s, &e);
        ex[i] = {s, e, (long long)(i + 1)};
    }
    sort(ex.begin(), ex.end());

    vector<long long> endOf;      // endOf[h] = minute hall h+1 becomes free
    vector<int> hall1;
    for (const auto &x : ex) {
        long long s = x[0], e = x[1];
        int id = (int)x[2];
        int h = -1;
        for (size_t j = 0; j < endOf.size(); j++)
            if (endOf[j] <= s) { h = (int)j; break; }
        if (h < 0) { endOf.push_back(e); h = (int)endOf.size() - 1; }
        else endOf[h] = e;
        if (h == 0) hall1.push_back(id);
    }
    // exams are processed by start minute, but the output wants input order
    sort(hall1.begin(), hall1.end());

    printf("%d\n", (int)endOf.size());
    printf("%d", (int)hall1.size());
    for (int v : hall1) printf(" %d", v);
    printf("\n");
    return 0;
}
