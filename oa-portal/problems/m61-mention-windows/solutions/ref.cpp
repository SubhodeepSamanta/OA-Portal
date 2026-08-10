// Reference - m61 / Q156 Mention Windows
// Two pointers over compressed brand ids: the leftmost workable start never
// moves backwards, so each index enters and leaves the window once.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> b(n);
    for (int i = 0; i < n; i++) scanf("%d", &b[i]);

    vector<int> sorted(b);
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    int distinct = (int)sorted.size();
    for (int i = 0; i < n; i++)
        b[i] = (int)(lower_bound(sorted.begin(), sorted.end(), b[i]) - sorted.begin());

    vector<int> count(distinct, 0);
    int have = 0, best = n, left = 0;
    for (int right = 0; right < n; right++) {
        if (count[b[right]]++ == 0) have++;
        while (have == distinct) {
            best = min(best, right - left + 1);
            if (--count[b[left]] == 0) have--;
            left++;
        }
    }
    printf("%d\n", best);
    return 0;
}
