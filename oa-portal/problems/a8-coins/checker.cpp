// Checker - a8 / Q96 Coins (AtCoder EDPC I)
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// The answer is a real number, so token comparison would reject a correct
// solution for printing a different number of digits, or for the last bit of
// a double landing elsewhere. AtCoder accepts an absolute error up to 1e-9,
// and so does this: the value is a probability in [0, 1], so absolute error
// is the meaningful measure and no relative term is needed.
#include <bits/stdc++.h>
using namespace std;

static const double TOL = 1e-9;

static int reject(const string& msg) {
    printf("%s\n", msg.c_str());
    return 1;
}

int main(int argc, char** argv) {
    if (argc < 4) { printf("checker needs <input> <expected> <submitted>\n"); return 1; }

    ifstream fexp(argv[2]), fout(argv[3]);
    if (!fexp) { printf("checker cannot open the expected file\n"); return 1; }
    if (!fout) return reject("your program produced no output file");

    double want;
    if (!(fexp >> want)) { printf("checker cannot read the expected probability\n"); return 1; }

    string tok;
    if (!(fout >> tok)) return reject("your program printed nothing");

    double got;
    try {
        size_t used = 0;
        got = stod(tok, &used);
        if (used != tok.size()) throw invalid_argument("trailing characters");
    } catch (const exception&) {
        return reject("\"" + tok.substr(0, 32) + "\" is not a number");
    }
    if (std::isnan(got)) return reject("you printed NaN");

    string extra;
    if (fout >> extra) {
        return reject("print the probability and nothing else; found a second token \"" +
                      extra.substr(0, 32) + "\"");
    }

    const double diff = fabs(got - want);
    if (!(diff <= TOL)) {
        char buf[256];
        snprintf(buf, sizeof buf,
                 "your %.12f differs from the correct %.12f by %.3g, over the 1e-9 allowed",
                 got, want, diff);
        return reject(buf);
    }

    char note[128];
    snprintf(note, sizeof note, "within 1e-9 (off by %.3g)", diff);
    printf("%s\n", note);
    return 0;
}
