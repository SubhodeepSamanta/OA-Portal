#include <bits/stdc++.h>
using namespace std;

double probabilityMoreHeads(const vector<double>& p) {
    // write your code here

    return 0.0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<double> p(n);
    for (int i = 0; i < n; i++) scanf("%lf", &p[i]);

    // an absolute error up to 1e-9 is accepted, so print plenty of digits
    printf("%.10f\n", probabilityMoreHeads(p));
    return 0;
}
