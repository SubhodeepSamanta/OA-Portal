// Checker - c2 / Q16 Room Allocation
//
//   checker <input> <expected> <submitted>
//
// exit 0  -> accepted   (a one-line note on stdout is shown as context)
// exit 1  -> rejected   (the reason is printed on stdout)
//
// The room numbering is not unique, so this cannot be a token comparison.
// Accepted means: the count k matches the true minimum, every booking is in
// a room from 1..k, and no two bookings sharing a room overlap.
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

    int n;
    if (!(fin >> n)) { printf("checker cannot read n from the input\n"); return 1; }
    vector<long long> a(n), b(n);
    for (int i = 0; i < n; i++) {
        if (!(fin >> a[i] >> b[i])) { printf("checker cannot read booking %d\n", i + 1); return 1; }
    }

    long long kExpected;
    if (!(fexp >> kExpected)) { printf("checker cannot read k from the expected file\n"); return 1; }

    long long k;
    if (!(fout >> k)) return reject("expected the number of rooms on the first line, but found nothing readable");

    if (k != kExpected) {
        return reject("you used " + to_string(k) + " room(s); the minimum for this input is " +
                      to_string(kExpected));
    }

    vector<long long> room(n);
    for (int i = 0; i < n; i++) {
        if (!(fout >> room[i])) {
            return reject("expected " + to_string(n) + " room numbers after k, but only found " +
                          to_string(i));
        }
        if (room[i] < 1 || room[i] > k) {
            return reject("booking " + to_string(i + 1) + " was given room " + to_string(room[i]) +
                          ", which is outside 1.." + to_string(k));
        }
    }

    long long extra;
    if (fout >> extra) {
        return reject("you printed more numbers than expected - there should be exactly " +
                      to_string(n) + " room numbers after k");
    }

    // group by room, then check each room's bookings do not overlap
    vector<vector<int>> byRoom(k + 1);
    for (int i = 0; i < n; i++) byRoom[room[i]].push_back(i);

    for (long long r = 1; r <= k; r++) {
        auto& v = byRoom[r];
        sort(v.begin(), v.end(), [&](int p, int q) { return a[p] < a[q]; });
        for (size_t j = 1; j < v.size(); j++) {
            int prev = v[j - 1], cur = v[j];
            // sharing is allowed only if one departs strictly before the other arrives
            if (!(b[prev] < a[cur])) {
                return reject("room " + to_string(r) + " holds both booking " + to_string(prev + 1) +
                              " (days " + to_string(a[prev]) + ".." + to_string(b[prev]) +
                              ") and booking " + to_string(cur + 1) +
                              " (days " + to_string(a[cur]) + ".." + to_string(b[cur]) +
                              ") - those stays overlap");
            }
        }
    }

    printf("valid allocation using the minimum %lld room(s)\n", k);
    return 0;
}
