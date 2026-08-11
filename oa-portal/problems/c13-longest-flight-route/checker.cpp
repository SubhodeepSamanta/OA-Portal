// Checker - c13 / Q83 Longest Flight Route
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// Several routes can tie for the maximum, so this cannot be a token
// comparison. Accepted means: the IMPOSSIBLE decision matches, the count
// equals the true maximum, and the listed cities really form a route from 1
// to n along flights that exist.
#include <bits/stdc++.h>
using namespace std;

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
    set<pair<long long, long long>> flights;
    for (long long i = 0; i < m; i++) {
        long long a, b;
        if (!(fin >> a >> b)) { printf("checker cannot read flight %lld\n", i + 1); return 1; }
        flights.insert({ a, b });
    }

    string expTok, gotTok;
    bool expImpossible = false;
    if (fexp >> expTok) {
        string up = expTok;
        for (auto& ch : up) ch = toupper((unsigned char)ch);
        expImpossible = (up == "IMPOSSIBLE");
    }

    if (!(fout >> gotTok)) return reject("your program printed nothing");
    {
        string up = gotTok;
        for (auto& ch : up) ch = toupper((unsigned char)ch);
        bool gotImpossible = (up == "IMPOSSIBLE");
        if (gotImpossible != expImpossible) {
            return reject(gotImpossible
                ? "you printed IMPOSSIBLE, but city " + to_string(n) + " can be reached from city 1"
                : "you printed a route, but city " + to_string(n) + " cannot be reached from city 1");
        }
        if (expImpossible) return 0;
    }

    // expTok already HOLDS the expected count - it was read above for the
    // IMPOSSIBLE test. Reading the stream again here would pick up the first
    // city of the expected route instead.
    long long expCount = atoll(expTok.c_str());
    long long gotCount = atoll(gotTok.c_str());

    if (gotCount != expCount) {
        return reject("you reported a route through " + to_string(gotCount) +
                      " cities; the maximum is " + to_string(expCount));
    }

    vector<long long> route(gotCount);
    for (long long i = 0; i < gotCount; i++) {
        if (!(fout >> route[i])) {
            return reject("you said " + to_string(gotCount) + " cities but only listed " +
                          to_string(i));
        }
        if (route[i] < 1 || route[i] > n) {
            return reject("position " + to_string(i + 1) + " holds " + to_string(route[i]) +
                          ", but cities are numbered 1.." + to_string(n));
        }
    }

    long long extra;
    if (fout >> extra) {
        return reject("you listed more than " + to_string(gotCount) + " cities");
    }

    if (route.front() != 1) {
        return reject("the route must start at city 1, but it starts at " + to_string(route.front()));
    }
    if (route.back() != n) {
        return reject("the route must end at city " + to_string(n) + ", but it ends at " +
                      to_string(route.back()));
    }
    for (long long i = 1; i < gotCount; i++) {
        if (!flights.count({ route[i - 1], route[i] })) {
            return reject("there is no flight from " + to_string(route[i - 1]) + " to " +
                          to_string(route[i]) + " (step " + to_string(i) + " of your route)");
        }
    }

    printf("valid route through the maximum %lld cities\n", gotCount);
    return 0;
}
