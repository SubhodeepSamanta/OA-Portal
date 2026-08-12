// Checker - a7 / Q94 LCS (AtCoder EDPC F)
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// Several different subsequences can tie for the longest - AtCoder's own
// sample 1 lists two - so this cannot be a token comparison. Accepted means:
// your string is as long as the true LCS, and it really is a subsequence of
// both s and t. Any string meeting both is by definition A longest common
// subsequence, so nothing more needs checking.
//
// The empty answer is a legitimate output (sample 3 has no common character),
// so "no token in the file" means the empty string here, not a missing answer.
#include <bits/stdc++.h>
using namespace std;

static int reject(const string& msg) {
    printf("%s\n", msg.c_str());
    return 1;
}

/** Does `sub` appear in `of` in order, not necessarily contiguously? */
static bool isSubsequence(const string& sub, const string& of) {
    size_t k = 0;
    for (char c : of) {
        if (k < sub.size() && sub[k] == c) k++;
    }
    return k == sub.size();
}

int main(int argc, char** argv) {
    if (argc < 4) { printf("checker needs <input> <expected> <submitted>\n"); return 1; }

    ifstream fin(argv[1]), fexp(argv[2]), fout(argv[3]);
    if (!fin) { printf("checker cannot open the input file\n"); return 1; }
    if (!fexp) { printf("checker cannot open the expected file\n"); return 1; }
    if (!fout) return reject("your program produced no output file");

    string s, t;
    if (!(fin >> s >> t)) { printf("checker cannot read s and t\n"); return 1; }

    // An empty expected file means the true LCS is empty - a real answer.
    string want;
    if (!(fexp >> want)) want.clear();

    string got;
    if (!(fout >> got)) got.clear();

    string extra;
    if (fout >> extra) {
        return reject("print one line holding a single subsequence; found a second token \"" +
                      extra.substr(0, 32) + "\"");
    }

    if (got.size() != want.size()) {
        return reject("your subsequence is " + to_string(got.size()) +
                      " characters long; the longest common subsequence is " +
                      to_string(want.size()));
    }

    if (!isSubsequence(got, s)) {
        return reject("\"" + got.substr(0, 64) + "\" is not a subsequence of s");
    }
    if (!isSubsequence(got, t)) {
        return reject("\"" + got.substr(0, 64) + "\" is not a subsequence of t");
    }

    printf("a common subsequence of the maximum length %zu\n", got.size());
    return 0;
}
