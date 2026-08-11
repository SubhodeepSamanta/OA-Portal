// Checker - c12 / Q82 Course Schedule
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// Any order satisfying every requirement is correct, so this cannot be a token
// comparison. Accepted means: the IMPOSSIBLE decision matches, and when an
// order is given it lists every course exactly once with every requirement
// respected.
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
    vector<long long> ra(m), rb(m);
    for (long long i = 0; i < m; i++) {
        if (!(fin >> ra[i] >> rb[i])) { printf("checker cannot read requirement %lld\n", i + 1); return 1; }
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
            if (gotImpossible) {
                return reject("you printed IMPOSSIBLE, but a valid order does exist");
            }
            return reject("you printed an order, but the requirements contain a cycle "
                          "so the answer is IMPOSSIBLE");
        }
        if (expImpossible) return 0;
    }

    // gotTok is the first course of the order
    vector<long long> order;
    order.reserve(n);
    order.push_back(atoll(gotTok.c_str()));
    for (long long i = 1; i < n; i++) {
        long long v;
        if (!(fout >> v)) {
            return reject("expected " + to_string(n) + " courses but only found " + to_string(i));
        }
        order.push_back(v);
    }

    long long extra;
    if (fout >> extra) {
        return reject("you printed more than " + to_string(n) + " courses");
    }

    vector<long long> pos(n + 1, -1);
    for (long long i = 0; i < n; i++) {
        long long v = order[i];
        if (v < 1 || v > n) {
            return reject("position " + to_string(i + 1) + " holds " + to_string(v) +
                          ", but courses are numbered 1.." + to_string(n));
        }
        if (pos[v] != -1) {
            return reject("course " + to_string(v) + " appears twice (positions " +
                          to_string(pos[v] + 1) + " and " + to_string(i + 1) + ")");
        }
        pos[v] = i;
    }

    for (long long i = 0; i < m; i++) {
        if (pos[ra[i]] >= pos[rb[i]]) {
            return reject("requirement \"" + to_string(ra[i]) + " before " + to_string(rb[i]) +
                          "\" is broken: you put " + to_string(ra[i]) + " at position " +
                          to_string(pos[ra[i]] + 1) + " and " + to_string(rb[i]) + " at position " +
                          to_string(pos[rb[i]] + 1));
        }
    }

    printf("valid order satisfying all %lld requirement(s)\n", m);
    return 0;
}
