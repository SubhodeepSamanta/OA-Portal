// Checker - c9 / Q79 Labyrinth
//
//   checker <input> <expected> <submitted>
//
// exit 0 -> accepted, exit 1 -> rejected (reason on stdout)
//
// There is usually more than one shortest route, so this cannot be a token
// comparison. Accepted means: the YES/NO decision matches, the stated length
// is the true shortest distance, and the move string really walks from A to B
// through floor squares without leaving the grid.
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

    int n, m;
    if (!(fin >> n >> m)) { printf("checker cannot read n and m\n"); return 1; }
    vector<string> g(n);
    for (int i = 0; i < n; i++) {
        if (!(fin >> g[i])) { printf("checker cannot read grid row %d\n", i + 1); return 1; }
    }

    int ar = -1, ac = -1, br = -1, bc = -1;
    for (int r = 0; r < n; r++)
        for (int c = 0; c < m; c++) {
            if (g[r][c] == 'A') { ar = r; ac = c; }
            else if (g[r][c] == 'B') { br = r; bc = c; }
        }

    string expVerdict, gotVerdict;
    if (!(fexp >> expVerdict)) { printf("checker cannot read the expected verdict\n"); return 1; }
    if (!(fout >> gotVerdict)) return reject("expected YES or NO on the first line, but found nothing");

    for (auto& ch : expVerdict) ch = toupper((unsigned char)ch);
    for (auto& ch : gotVerdict) ch = toupper((unsigned char)ch);

    if (gotVerdict != "YES" && gotVerdict != "NO") {
        return reject("the first line must be YES or NO, but you printed \"" + gotVerdict + "\"");
    }
    if (gotVerdict != expVerdict) {
        return reject("you answered " + gotVerdict + " but the correct answer is " + expVerdict +
                      (expVerdict == "YES" ? " - a route does exist" : " - no route exists"));
    }
    if (expVerdict == "NO") return 0;   // nothing more to check

    long long expLen, gotLen;
    if (!(fexp >> expLen)) { printf("checker cannot read the expected length\n"); return 1; }
    if (!(fout >> gotLen)) return reject("after YES you must print the route length, but found nothing");

    if (gotLen != expLen) {
        return reject("you reported a route of length " + to_string(gotLen) +
                      "; the shortest route is " + to_string(expLen) +
                      (gotLen > expLen ? " - your route is not the shortest one"
                                       : " - no route that short exists"));
    }

    string moves;
    if (!(fout >> moves)) {
        if (gotLen == 0) return 0;
        return reject("after the length you must print the moves, but found nothing");
    }
    if ((long long)moves.size() != gotLen) {
        return reject("you said the route has length " + to_string(gotLen) + " but printed " +
                      to_string(moves.size()) + " move(s)");
    }

    int r = ar, c = ac;
    for (size_t i = 0; i < moves.size(); i++) {
        char mv = toupper((unsigned char)moves[i]);
        if (mv == 'U') r--;
        else if (mv == 'D') r++;
        else if (mv == 'L') c--;
        else if (mv == 'R') c++;
        else return reject("move " + to_string(i + 1) + " is '" + string(1, moves[i]) +
                           "', which is not one of L, R, U, D");

        if (r < 0 || r >= n || c < 0 || c >= m) {
            return reject("move " + to_string(i + 1) + " ('" + string(1, mv) +
                          "') walks off the grid");
        }
        if (g[r][c] == '#') {
            return reject("move " + to_string(i + 1) + " ('" + string(1, mv) +
                          "') walks into a wall at row " + to_string(r + 1) +
                          ", column " + to_string(c + 1));
        }
    }

    if (r != br || c != bc) {
        return reject("your route ends at row " + to_string(r + 1) + ", column " + to_string(c + 1) +
                      ", but B is at row " + to_string(br + 1) + ", column " + to_string(bc + 1));
    }

    printf("valid shortest route of length %lld\n", gotLen);
    return 0;
}
