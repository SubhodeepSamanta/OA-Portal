#include <bits/stdc++.h>
using namespace std;

/* Each post is one whole line and may contain spaces. */
int distinctPosts(const vector<string>& posts) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    vector<string> posts(n);
    for (int i = 0; i < n; i++) getline(cin, posts[i]);

    cout << distinctPosts(posts) << '\n';
    return 0;
}
