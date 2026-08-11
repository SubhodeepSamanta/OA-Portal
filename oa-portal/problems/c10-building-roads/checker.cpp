// Checker - c10 / Q80 Building Roads
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// Which cities you join is up to you, so this cannot be a token comparison.
// Accepted means: k matches the true minimum, every road names real cities,
// and the country really is connected once those roads are added.
#include <bits/stdc++.h>
using namespace std;

static vector<int> par;
static int findRoot(int x) {
    while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
    return x;
}
static int reject(const string& msg) {
    printf("%s\n", msg.c_str());
    return 1;
}

int main(int argc, char** argv) {
    if (argc < 4) { printf("checker needs <input> <expected> <submitted>\n"); return 1; }

    ifstream fin(argv[1]), fexp(argv[2]), fout(argv[3]);
    if (!fin) { printf("checker cannot open the input file\n"); return 1; }
    if (!fexp) { printf("checker cannot open the expected file\n"); return 1; }
    if (!fout) return reject("your program produced no output file");

    long long n, m;
    if (!(fin >> n >> m)) { printf("checker cannot read n and m\n"); return 1; }

    par.resize(n + 1);
    for (long long i = 0; i <= n; i++) par[i] = (int)i;
    for (long long i = 0; i < m; i++) {
        long long a, b;
        if (!(fin >> a >> b)) { printf("checker cannot read road %lld\n", i + 1); return 1; }
        par[findRoot((int)a)] = findRoot((int)b);
    }

    long long kExpected;
    if (!(fexp >> kExpected)) { printf("checker cannot read k from the expected file\n"); return 1; }

    long long k;
    if (!(fout >> k)) return reject("expected the number of new roads on the first line, but found nothing readable");

    if (k != kExpected) {
        return reject("you built " + to_string(k) + " road(s); the minimum needed is " +
                      to_string(kExpected));
    }

    for (long long i = 0; i < k; i++) {
        long long a, b;
        if (!(fout >> a >> b)) {
            return reject("you said " + to_string(k) + " road(s) but only " + to_string(i) +
                          " complete pair(s) followed");
        }
        if (a < 1 || a > n || b < 1 || b > n) {
            return reject("road " + to_string(i + 1) + " is \"" + to_string(a) + " " + to_string(b) +
                          "\", but cities are numbered 1.." + to_string(n));
        }
        par[findRoot((int)a)] = findRoot((int)b);
    }

    long long extra;
    if (fout >> extra) {
        return reject("you printed more numbers than expected - there should be exactly " +
                      to_string(k) + " road(s) after k");
    }

    int root = findRoot(1);
    for (long long i = 2; i <= n; i++) {
        if (findRoot((int)i) != root) {
            return reject("after building your roads, city " + to_string(i) +
                          " still cannot be reached from city 1");
        }
    }

    printf("connected the country with the minimum %lld new road(s)\n", k);
    return 0;
}
