// Reference - m91 / Q212 Duplicate Detector
// Read the array as a mapping i -> a[i] on indices 0..n. Index 0 is never a
// target (all values are >= 1), so the walk from 0 runs into a cycle whose
// entrance is the duplicated value. Floyd finds that entrance in O(1) space.
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n + 1);
    for (int i = 0; i <= n; i++) scanf("%d", &a[i]);

    // phase 1: find a meeting point inside the cycle
    int slow = a[0], fast = a[a[0]];
    while (slow != fast) {
        slow = a[slow];
        fast = a[a[fast]];
    }

    // phase 2: walk one pointer from the start; they meet at the entrance
    slow = 0;
    while (slow != fast) {
        slow = a[slow];
        fast = a[fast];
    }
    printf("%d\n", slow);
    return 0;
}
