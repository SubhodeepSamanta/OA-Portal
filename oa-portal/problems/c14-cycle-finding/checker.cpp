// Checker - c14 / Q84 Cycle Finding
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// Any negative cycle is correct, from any starting node, so this cannot be a
// token comparison. Accepted means: the YES/NO decision matches, every
// consecutive pair really is an edge, the walk closes on itself, and its
// total weight is negative.
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

    // parallel edges are allowed; the cheapest one is the most generous
    // reading of a submitted step, so keep the minimum per (a, b)
    map<pair<long long, long long>, long long> best;
    for (long long i = 0; i < m; i++) {
        long long a, b, c;
        if (!(fin >> a >> b >> c)) { printf("checker cannot read edge %lld\n", i + 1); return 1; }
        auto key = make_pair(a, b);
        auto it = best.find(key);
        if (it == best.end() || c < it->second) best[key] = c;
    }

    string expTok, gotTok;
    if (!(fexp >> expTok)) { printf("checker cannot read the expected verdict\n"); return 1; }
    if (!(fout >> gotTok)) return reject("expected YES or NO on the first line, but found nothing");
    for (auto& ch : expTok) ch = toupper((unsigned char)ch);
    for (auto& ch : gotTok) ch = toupper((unsigned char)ch);

    if (gotTok != "YES" && gotTok != "NO") {
        return reject("the first line must be YES or NO, but you printed \"" + gotTok + "\"");
    }
    if (gotTok != expTok) {
        return reject(gotTok == "NO"
            ? "you printed NO, but this graph does contain a negative cycle"
            : "you printed YES, but this graph has no negative cycle");
    }
    if (expTok == "NO") return 0;

    vector<long long> cyc;
    long long v;
    while (fout >> v) {
        cyc.push_back(v);
        if ((long long)cyc.size() > 4 * n + 10) {
            return reject("your cycle is far longer than any negative cycle needs to be");
        }
    }

    if (cyc.size() < 2) {
        return reject("after YES you must print the cycle's nodes, starting and ending at the same node");
    }
    if (cyc.front() != cyc.back()) {
        return reject("the cycle must end where it starts, but it begins at " +
                      to_string(cyc.front()) + " and ends at " + to_string(cyc.back()));
    }

    long long total = 0;
    for (size_t i = 0; i + 1 < cyc.size(); i++) {
        long long a = cyc[i], b = cyc[i + 1];
        if (a < 1 || a > n || b < 1 || b > n) {
            return reject("step " + to_string(i + 1) + " names node " +
                          to_string(a < 1 || a > n ? a : b) + ", but nodes are numbered 1.." +
                          to_string(n));
        }
        auto it = best.find(make_pair(a, b));
        if (it == best.end()) {
            return reject("there is no edge from " + to_string(a) + " to " + to_string(b) +
                          " (step " + to_string(i + 1) + " of your cycle)");
        }
        total += it->second;
    }

    if (total >= 0) {
        return reject("your cycle has total weight " + to_string(total) +
                      ", which is not negative");
    }

    printf("valid negative cycle of weight %lld\n", total);
    return 0;
}
