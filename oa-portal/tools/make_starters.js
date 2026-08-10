'use strict';
/**
 * Generates per-problem starter templates: the I/O harness is written for you,
 * you fill in one function. Mirrors how real OA platforms hand you a stub.
 *
 *   node tools/make_starters.js
 *
 * Writes problems/<slug>/starters/main.cpp and main.java
 */
const fs = require('node:fs');
const path = require('node:path');

const PROBLEMS = path.resolve(__dirname, '..', 'problems');

const CPP_HEAD = `#include <bits/stdc++.h>
using namespace std;
`;

const S = {
  // ---------------------------------------------------------------- m1
  m1: {
    cpp: `${CPP_HEAD}
/**
 * Count contiguous windows summing to exactly k.
 *
 * @param a  the ledger entries, in order
 * @param k  the reconciliation target
 * @return   how many windows are balanced at k
 */
long long countBalancedWindows(const vector<long long>& a, long long k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << countBalancedWindows(a, k) << '\\n';
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Count contiguous windows summing to exactly k.
     *
     * @param a  the ledger entries, in order
     * @param k  the reconciliation target
     * @return   how many windows are balanced at k
     */
    static long countBalancedWindows(long[] a, long k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long k = in.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(countBalancedWindows(a, k));
    }

    // ---- fast input, already written for you ----
    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },

  // ---------------------------------------------------------------- m2
  m2: {
    cpp: `${CPP_HEAD}
/**
 * Peak load of every window of w consecutive readings.
 *
 * @param a  the stream, in time order
 * @param w  window width
 * @return   n - w + 1 peaks, left window first
 */
vector<int> windowPeaks(const vector<int>& a, int w) {
    // write your code here

    return {};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, w;
    if (!(cin >> n >> w)) return 0;
    vector<int> a(n);
    for (auto &x : a) cin >> x;

    vector<int> res = windowPeaks(a, w);
    string out;
    out.reserve(res.size() * 4);
    for (size_t i = 0; i < res.size(); i++) {
        if (i) out += ' ';
        out += to_string(res[i]);
    }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Peak load of every window of w consecutive readings.
     *
     * @param a  the stream, in time order
     * @param w  window width
     * @return   n - w + 1 peaks, left window first
     */
    static int[] windowPeaks(int[] a, int w) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), w = in.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = in.nextInt();

        int[] res = windowPeaks(a, w);
        StringBuilder sb = new StringBuilder(res.length * 4);
        for (int i = 0; i < res.length; i++) { if (i > 0) sb.append(' '); sb.append(res[i]); }
        sb.append('\\n');
        System.out.print(sb);
    }

    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },

  // ---------------------------------------------------------------- m3
  m3: {
    cpp: `${CPP_HEAD}
/**
 * Apply every grant, then find the busiest gate.
 *
 * @param m       number of gates, numbered 1..m
 * @param grants  each entry is {l, r, x}: gates l..r each gain x passes
 * @return        {gate number, pass count}; smallest gate number on a tie
 */
pair<int, long long> busiestGate(int m, const vector<array<long long, 3>>& grants) {
    // write your code here

    return {1, 0};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int m, q;
    if (!(cin >> m >> q)) return 0;
    vector<array<long long, 3>> grants(q);
    for (auto &g : grants) cin >> g[0] >> g[1] >> g[2];

    auto res = busiestGate(m, grants);
    cout << res.first << ' ' << res.second << '\\n';
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Apply every grant, then find the busiest gate.
     *
     * @param m       number of gates, numbered 1..m
     * @param grants  each row is {l, r, x}: gates l..r each gain x passes
     * @return        {gate number, pass count}; smallest gate number on a tie
     */
    static long[] busiestGate(int m, long[][] grants) {
        // write your code here

        return new long[]{1, 0};
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int m = in.nextInt(), q = in.nextInt();
        long[][] grants = new long[q][3];
        for (int i = 0; i < q; i++) {
            grants[i][0] = in.nextLong();
            grants[i][1] = in.nextLong();
            grants[i][2] = in.nextLong();
        }

        long[] res = busiestGate(m, grants);
        System.out.println(res[0] + " " + res[1]);
    }

    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },

  // ---------------------------------------------------------------- m4
  m4: {
    cpp: `${CPP_HEAD}
/**
 * Longest run of consecutive shelf IDs present in the scan log.
 *
 * @param ids  scanned shelf IDs, unordered, duplicates possible
 * @return     length of the longest aisle
 */
int longestAisle(const vector<int>& ids) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<int> ids(n);
    for (auto &x : ids) cin >> x;

    cout << longestAisle(ids) << '\\n';
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Longest run of consecutive shelf IDs present in the scan log.
     *
     * @param ids  scanned shelf IDs, unordered, duplicates possible
     * @return     length of the longest aisle
     */
    static int longestAisle(int[] ids) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] ids = new int[n];
        for (int i = 0; i < n; i++) ids[i] = in.nextInt();

        System.out.println(longestAisle(ids));
    }

    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },

  // ---------------------------------------------------------------- m5
  m5: {
    cpp: `${CPP_HEAD}
/**
 * Length of the LONGEST contiguous block summing to exactly k.
 *
 * @param a  transactions, in chronological order
 * @param k  the campaign figure
 * @return   longest qualifying length, or 0 if none exists
 */
int longestStreak(const vector<long long>& a, long long k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << longestStreak(a, k) << '\\n';
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Length of the LONGEST contiguous block summing to exactly k.
     *
     * @param a  transactions, in chronological order
     * @param k  the campaign figure
     * @return   longest qualifying length, or 0 if none exists
     */
    static int longestStreak(long[] a, long k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long k = in.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(longestStreak(a, k));
    }

    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },

  // ---------------------------------------------------------------- m6
  m6: {
    cpp: `${CPP_HEAD}
/**
 * Maximum number of meetings in progress at the same instant.
 * Each meeting occupies the HALF-OPEN interval [s, e):
 * a meeting ending at t and one starting at t do NOT overlap.
 *
 * @param meetings  each entry is {s, e}
 * @return          peak simultaneous count
 */
int peakConcurrent(const vector<pair<int, int>>& meetings) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> meetings(n);
    for (auto &m : meetings) cin >> m.first >> m.second;

    cout << peakConcurrent(meetings) << '\\n';
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Maximum number of meetings in progress at the same instant.
     * Each meeting occupies the HALF-OPEN interval [s, e):
     * a meeting ending at t and one starting at t do NOT overlap.
     *
     * @param meetings  each row is {s, e}
     * @return          peak simultaneous count
     */
    static int peakConcurrent(int[][] meetings) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[][] meetings = new int[n][2];
        for (int i = 0; i < n; i++) {
            meetings[i][0] = in.nextInt();
            meetings[i][1] = in.nextInt();
        }

        System.out.println(peakConcurrent(meetings));
    }

    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },

  // ---------------------------------------------------------------- m7
  m7: {
    cpp: `${CPP_HEAD}
/**
 * Delete EXACTLY one sample, then return the largest sum of any
 * contiguous non-empty segment of what remains.
 *
 * @param a  the recording, n >= 2
 * @return   best achievable segment sum after the mandatory splice
 */
long long bestAfterSplice(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << bestAfterSplice(a) << '\\n';
    return 0;
}
`,
    java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Delete EXACTLY one sample, then return the largest sum of any
     * contiguous non-empty segment of what remains.
     *
     * @param a  the recording, n >= 2
     * @return   best achievable segment sum after the mandatory splice
     */
    static long bestAfterSplice(long[] a) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(bestAfterSplice(a));
    }

    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
    }
}
`,
  },
};

// ------------------------------------------------------------------ batch 2
const FAST_READER_JAVA = `
    static class FastReader {
        private final DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int nextInt() throws IOException { return (int) nextLong(); }
        long nextLong() throws IOException {
            int b = in.read();
            while (b != '-' && (b < '0' || b > '9')) b = in.read();
            boolean neg = b == '-';
            if (neg) b = in.read();
            long v = 0;
            while (b >= '0' && b <= '9') { v = v * 10 + (b - '0'); b = in.read(); }
            return neg ? -v : v;
        }
        String next() throws IOException {
            int b = in.read();
            while (b <= ' ') b = in.read();
            StringBuilder sb = new StringBuilder();
            while (b > ' ') { sb.append((char) b); b = in.read(); }
            return sb.toString();
        }
    }
`;

const arrayCpp = (fn, ret, dflt) => `${CPP_HEAD}
${ret} ${fn}(const vector<long long>& a) {
    // write your code here

    return ${dflt};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << ${fn}(a) << '\\n';
    return 0;
}
`;

const arrayJava = (fn) => `import java.io.*;
import java.util.*;

public class Main {

    static long ${fn}(long[] a) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(${fn}(a));
    }
${FAST_READER_JAVA}}
`;

S.m8 = { cpp: arrayCpp('maxOddSlotTotal', 'long long', '0'), java: arrayJava('maxOddSlotTotal') };
S.m9 = { cpp: arrayCpp('maxCountedTotal', 'long long', '0'), java: arrayJava('maxCountedTotal') };
S.m10 = { cpp: arrayCpp('bestAfterRemoval', 'long long', '0'), java: arrayJava('bestAfterRemoval') };

S.m11 = {
  cpp: `${CPP_HEAD}
long long minDeletions(const string& s) {
    // write your code here
    // return -1 if the log can never be made well-formed

    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    if (!(cin >> s)) return 0;

    cout << minDeletions(s) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long minDeletions(String s) {
        // write your code here
        // return -1 if the log can never be made well-formed

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        String s = in.next();

        System.out.println(minDeletions(s));
    }
${FAST_READER_JAVA}}
`,
};

S.m12 = {
  cpp: `${CPP_HEAD}
long long minCost(const string& s, long long p, long long q, long long r) {
    // write your code here
    // return -1 if the log can never be made well-formed

    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    long long p, q, r;
    if (!(cin >> s)) return 0;
    cin >> p >> q >> r;

    cout << minCost(s, p, q, r) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long minCost(String s, long p, long q, long r) {
        // write your code here
        // return -1 if the log can never be made well-formed

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        String s = in.next();
        long p = in.nextLong(), q = in.nextLong(), r = in.nextLong();

        System.out.println(minCost(s, p, q, r));
    }
${FAST_READER_JAVA}}
`,
};

// ------------------------------------------------------------------ batch 3
S.m13 = {
  cpp: `${CPP_HEAD}
int longestQualifyingRun(const vector<long long>& a, long long t) {
    // write your code here
    // return 0 if no run averages at least t

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long t;
    if (!(cin >> n >> t)) return 0;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;

    cout << longestQualifyingRun(a, t) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static int longestQualifyingRun(long[] a, long t) {
        // write your code here
        // return 0 if no run averages at least t

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long t = in.nextLong();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(longestQualifyingRun(a, t));
    }
${FAST_READER_JAVA}}
`,
};

S.m14 = {
  cpp: `${CPP_HEAD}
/* parent[v] holds the manager of employee v; parent[1] is 1 (the CEO).
   Return one answer per query, in order. */
vector<int> nearestCommonManagers(int n,
                                  const vector<int>& parent,
                                  const vector<pair<int,int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<int> parent(n + 1, 1);
    for (int i = 2; i <= n; i++) cin >> parent[i];
    vector<pair<int,int>> queries(q);
    for (auto &qq : queries) cin >> qq.first >> qq.second;

    string out;
    for (int v : nearestCommonManagers(n, parent, queries)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* parent[v] holds the manager of employee v; parent[1] is 1 (the CEO).
       Return one answer per query, in order. */
    static int[] nearestCommonManagers(int n, int[] parent, int[][] queries) {
        // write your code here

        int[] ans = new int[queries.length];
        Arrays.fill(ans, 1);
        return ans;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] parent = new int[n + 1];
        Arrays.fill(parent, 1);
        for (int i = 2; i <= n; i++) parent[i] = in.nextInt();
        int[][] queries = new int[q][2];
        for (int i = 0; i < q; i++) { queries[i][0] = in.nextInt(); queries[i][1] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : nearestCommonManagers(n, parent, queries)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m15 = { cpp: arrayCpp('maxRevenue', 'long long', '0'), java: arrayJava('maxRevenue') };

// ------------------------------------------------------------------ batch 4
S.m16 = {
  cpp: `${CPP_HEAD}
/* parent[v] is the manager of employee v; parent[1] is 0 (the CEO).
   Return one count per employee, for 1..n in order. */
vector<long long> subordinatesWithin(int n, int k, const vector<int>& parent) {
    // write your code here

    return vector<long long>(n, 0);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> parent(n + 1, 0);
    for (int i = 2; i <= n; i++) cin >> parent[i];

    string out;
    vector<long long> res = subordinatesWithin(n, k, parent);
    for (size_t i = 0; i < res.size(); i++) { if (i) out += ' '; out += to_string(res[i]); }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* parent[v] is the manager of employee v; parent[1] is 0 (the CEO).
       Return one count per employee, for 1..n in order. */
    static long[] subordinatesWithin(int n, int k, int[] parent) {
        // write your code here

        return new long[n];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), k = in.nextInt();
        int[] parent = new int[n + 1];
        for (int i = 2; i <= n; i++) parent[i] = in.nextInt();

        long[] res = subordinatesWithin(n, k, parent);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.length; i++) { if (i > 0) sb.append(' '); sb.append(res[i]); }
        sb.append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m17 = {
  cpp: `${CPP_HEAD}
long long maxRevenue(vector<long long> w, int k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> w(n);
    for (auto &x : w) cin >> x;

    cout << maxRevenue(w, k) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long maxRevenue(long[] w, int k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), k = in.nextInt();
        long[] w = new long[n];
        for (int i = 0; i < n; i++) w[i] = in.nextLong();

        System.out.println(maxRevenue(w, k));
    }
${FAST_READER_JAVA}}
`,
};

S.m18 = {
  cpp: `${CPP_HEAD}
long long earliestFinish(vector<long long> s, long long k) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> s(n);
    for (auto &x : s) cin >> x;

    cout << earliestFinish(s, k) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long earliestFinish(long[] s, long k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long k = in.nextLong();
        long[] s = new long[n];
        for (int i = 0; i < n; i++) s[i] = in.nextLong();

        System.out.println(earliestFinish(s, k));
    }
${FAST_READER_JAVA}}
`,
};

S.m19 = {
  cpp: `${CPP_HEAD}
long long minBusiestLoad(vector<long long> t, int m) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<long long> t(n);
    for (auto &x : t) cin >> x;

    cout << minBusiestLoad(t, m) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long minBusiestLoad(long[] t, int m) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[] t = new long[n];
        for (int i = 0; i < n; i++) t[i] = in.nextLong();

        System.out.println(minBusiestLoad(t, m));
    }
${FAST_READER_JAVA}}
`,
};

S.m20 = {
  cpp: `${CPP_HEAD}
/* exams[i] = {start, end} for exam i+1, in input order.
   Return {number of halls opened, exam numbers placed in hall 1 ascending}. */
pair<int, vector<int>> allocateHalls(vector<pair<long long,long long>> exams) {
    // write your code here

    return make_pair(1, vector<int>{1});
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<pair<long long,long long>> exams(n);
    for (auto &e : exams) cin >> e.first >> e.second;

    pair<int, vector<int>> r = allocateHalls(exams);
    string out = to_string(r.first);
    out += '\\n';
    out += to_string(r.second.size());
    for (int v : r.second) { out += ' '; out += to_string(v); }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* start[i] / end[i] describe exam i+1, in input order.
       Return the hall count in result.halls and the hall-1 exam numbers,
       ascending, in result.hall1. */
    static Allocation allocateHalls(long[] start, long[] end) {
        // write your code here

        Allocation r = new Allocation();
        r.halls = 1;
        r.hall1 = new int[] { 1 };
        return r;
    }

    static class Allocation {
        int halls;
        int[] hall1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] start = new long[n], end = new long[n];
        for (int i = 0; i < n; i++) { start[i] = in.nextLong(); end[i] = in.nextLong(); }

        Allocation r = allocateHalls(start, end);
        StringBuilder sb = new StringBuilder();
        sb.append(r.halls).append('\\n').append(r.hall1.length);
        for (int v : r.hall1) sb.append(' ').append(v);
        sb.append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m21 = {
  cpp: `${CPP_HEAD}
long long minSpliceCost(vector<long long> L) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> L(n);
    for (auto &x : L) cin >> x;

    cout << minSpliceCost(L) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long minSpliceCost(long[] L) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] L = new long[n];
        for (int i = 0; i < n; i++) L[i] = in.nextLong();

        System.out.println(minSpliceCost(L));
    }
${FAST_READER_JAVA}}
`,
};

S.m22 = {
  cpp: `${CPP_HEAD}
long long largestBillboard(vector<long long> h) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (auto &x : h) cin >> x;

    cout << largestBillboard(h) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long largestBillboard(long[] h) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] h = new long[n];
        for (int i = 0; i < n; i++) h[i] = in.nextLong();

        System.out.println(largestBillboard(h));
    }
${FAST_READER_JAVA}}
`,
};

S.m23 = {
  cpp: `${CPP_HEAD}
/* orders[i] = {placed at, minutes of cooking needed}, in input order. */
long long minTotalCompletion(vector<pair<long long,long long>> orders) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<pair<long long,long long>> orders(n);
    for (auto &o : orders) cin >> o.first >> o.second;

    cout << minTotalCompletion(orders) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* placed[i] / cook[i] describe order i+1, in input order. */
    static long minTotalCompletion(long[] placed, long[] cook) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] placed = new long[n], cook = new long[n];
        for (int i = 0; i < n; i++) { placed[i] = in.nextLong(); cook[i] = in.nextLong(); }

        System.out.println(minTotalCompletion(placed, cook));
    }
${FAST_READER_JAVA}}
`,
};

S.m24 = {
  cpp: `${CPP_HEAD}
/* parent[v] is the parent of node v; parent[1] is 1 (the root).
   ops[i] = {type, node, uid}, type 1 lock / 2 unlock / 3 upgrade.
   Return one result per operation, in order. */
vector<bool> runOperations(int n, const vector<int>& parent, const vector<array<int,3>>& ops) {
    // write your code here

    return vector<bool>(ops.size(), false);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> parent(n + 1, 1);
    for (int i = 2; i <= n; i++) scanf("%d", &parent[i]);
    vector<array<int,3>> ops(q);
    for (auto &o : ops) scanf("%d %d %d", &o[0], &o[1], &o[2]);

    string out;
    for (bool ok : runOperations(n, parent, ops)) out += ok ? "true\\n" : "false\\n";
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* parent[v] is the parent of node v; parent[1] is 1 (the root).
       ops[i] = {type, node, uid}, type 1 lock / 2 unlock / 3 upgrade. */
    static boolean[] runOperations(int n, int[] parent, int[][] ops) {
        // write your code here

        return new boolean[ops.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] parent = new int[n + 1];
        parent[1] = 1;
        for (int i = 2; i <= n; i++) parent[i] = in.nextInt();
        int[][] ops = new int[q][3];
        for (int i = 0; i < q; i++) {
            ops[i][0] = in.nextInt(); ops[i][1] = in.nextInt(); ops[i][2] = in.nextInt();
        }

        StringBuilder sb = new StringBuilder();
        for (boolean ok : runOperations(n, parent, ops)) sb.append(ok ? "true" : "false").append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m25 = {
  cpp: `${CPP_HEAD}
/* ops[i] = {type, node, uid}; type 1 lock / 2 unlock / 3 upgrade / 4 count.
   Return 1 or 0 for types 1-3, and the count itself for type 4. */
vector<long long> runOperations(int n, const vector<int>& parent, const vector<array<int,3>>& ops) {
    // write your code here

    return vector<long long>(ops.size(), 0);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> parent(n + 1, 1);
    for (int i = 2; i <= n; i++) scanf("%d", &parent[i]);
    vector<array<int,3>> ops(q);
    for (auto &o : ops) scanf("%d %d %d", &o[0], &o[1], &o[2]);

    vector<long long> res = runOperations(n, parent, ops);
    string out;
    for (size_t i = 0; i < ops.size(); i++) {
        if (ops[i][0] == 4) out += to_string(res[i]);
        else out += res[i] ? "true" : "false";
        out += '\\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] = {type, node, uid}; type 1 lock / 2 unlock / 3 upgrade / 4 count.
       Return 1 or 0 for types 1-3, and the count itself for type 4. */
    static long[] runOperations(int n, int[] parent, int[][] ops) {
        // write your code here

        return new long[ops.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] parent = new int[n + 1];
        parent[1] = 1;
        for (int i = 2; i <= n; i++) parent[i] = in.nextInt();
        int[][] ops = new int[q][3];
        for (int i = 0; i < q; i++) {
            ops[i][0] = in.nextInt(); ops[i][1] = in.nextInt(); ops[i][2] = in.nextInt();
        }

        long[] res = runOperations(n, parent, ops);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ops.length; i++) {
            if (ops[i][0] == 4) sb.append(res[i]);
            else sb.append(res[i] != 0 ? "true" : "false");
            sb.append('\\n');
        }
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m26 = {
  cpp: `${CPP_HEAD}
/* links[i] = {u, v, cost}, two-way. Return -1 if station n is unreachable. */
long long cheapestFare(int n, int k, const vector<array<long long,3>>& links) {
    // write your code here

    return -1;
}

int main() {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return 0;
    vector<array<long long,3>> links(m);
    for (auto &e : links) scanf("%lld %lld %lld", &e[0], &e[1], &e[2]);

    printf("%lld\\n", cheapestFare(n, k, links));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* links[i] = {u, v, cost}, two-way. Return -1 if station n is unreachable. */
    static long cheapestFare(int n, int k, long[][] links) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt(), k = in.nextInt();
        long[][] links = new long[m][3];
        for (int i = 0; i < m; i++) {
            links[i][0] = in.nextLong(); links[i][1] = in.nextLong(); links[i][2] = in.nextLong();
        }

        System.out.println(cheapestFare(n, k, links));
    }
${FAST_READER_JAVA}}
`,
};

S.m27 = {
  cpp: `${CPP_HEAD}
/* grid[i][j] is one of . # S X a-f A-F. Return -1 if X cannot be reached. */
int fewestMoves(const vector<string>& grid) {
    // write your code here

    return -1;
}

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> grid(r);
    for (int i = 0; i < r; i++) {
        char buf[128];
        scanf("%s", buf);
        grid[i] = buf;
    }

    printf("%d\\n", fewestMoves(grid));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* grid[i].charAt(j) is one of . # S X a-f A-F. Return -1 if X is unreachable. */
    static int fewestMoves(String[] grid) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int r = in.nextInt(), c = in.nextInt();
        String[] grid = new String[r];
        for (int i = 0; i < r; i++) grid[i] = in.next();

        System.out.println(fewestMoves(grid));
    }
${FAST_READER_JAVA}}
`,
};

S.m28 = {
  cpp: `${CPP_HEAD}
/* roads[i] = {u, v, w} with w either 0 or 1, two-way.
   Return -1 if city n is unreachable. */
int minimumToll(int n, const vector<array<int,3>>& roads) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int,3>> roads(m);
    for (auto &e : roads) scanf("%d %d %d", &e[0], &e[1], &e[2]);

    printf("%d\\n", minimumToll(n, roads));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* roads[i] = {u, v, w} with w either 0 or 1, two-way.
       Return -1 if city n is unreachable. */
    static int minimumToll(int n, int[][] roads) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[][] roads = new int[m][3];
        for (int i = 0; i < m; i++) {
            roads[i][0] = in.nextInt(); roads[i][1] = in.nextInt(); roads[i][2] = in.nextInt();
        }

        System.out.println(minimumToll(n, roads));
    }
${FAST_READER_JAVA}}
`,
};

S.m29 = {
  cpp: `${CPP_HEAD}
/* t[i] is task i+1's duration. deps[j] = {a, b}: a must finish before b starts.
   Return -1 if the dependencies contain a cycle. */
long long buildTime(const vector<long long>& t, const vector<pair<int,int>>& deps) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> t(n);
    for (auto &x : t) scanf("%lld", &x);
    vector<pair<int,int>> deps(m);
    for (auto &d : deps) scanf("%d %d", &d.first, &d.second);

    printf("%lld\\n", buildTime(t, deps));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* t[i] is task i+1's duration. deps[j] = {a, b}: a must finish before b starts.
       Return -1 if the dependencies contain a cycle. */
    static long buildTime(long[] t, int[][] deps) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[] t = new long[n];
        for (int i = 0; i < n; i++) t[i] = in.nextLong();
        int[][] deps = new int[m][2];
        for (int i = 0; i < m; i++) { deps[i][0] = in.nextInt(); deps[i][1] = in.nextInt(); }

        System.out.println(buildTime(t, deps));
    }
${FAST_READER_JAVA}}
`,
};

S.m30 = {
  cpp: `${CPP_HEAD}
/* offers[i] = {u, v, p, q}: 1 unit of u becomes p/q units of v, one way only.
   Return true if you can end up holding more than 1 unit of currency 1. */
bool canProfit(int n, const vector<array<long long,4>>& offers) {
    // write your code here

    return false;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long,4>> offers(m);
    for (auto &o : offers) scanf("%lld %lld %lld %lld", &o[0], &o[1], &o[2], &o[3]);

    printf("%s\\n", canProfit(n, offers) ? "YES" : "NO");
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* offers[i] = {u, v, p, q}: 1 unit of u becomes p/q units of v, one way only.
       Return true if you can end up holding more than 1 unit of currency 1. */
    static boolean canProfit(int n, long[][] offers) {
        // write your code here

        return false;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[][] offers = new long[m][4];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 4; j++) offers[i][j] = in.nextLong();

        System.out.println(canProfit(n, offers) ? "YES" : "NO");
    }
${FAST_READER_JAVA}}
`,
};

S.m31 = {
  cpp: `${CPP_HEAD}
/* grid[i][j] is one of . # R. Return -1 if somebody can never hear it. */
int minutesToSpread(const vector<string>& grid) {
    // write your code here

    return -1;
}

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<string> grid(r);
    {
        vector<char> buf(c + 8);
        for (int i = 0; i < r; i++) { scanf("%s", buf.data()); grid[i] = buf.data(); }
    }

    printf("%d\\n", minutesToSpread(grid));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* grid[i].charAt(j) is one of . # R. Return -1 if somebody never hears it. */
    static int minutesToSpread(String[] grid) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int r = in.nextInt(), c = in.nextInt();
        String[] grid = new String[r];
        for (int i = 0; i < r; i++) grid[i] = in.next();

        System.out.println(minutesToSpread(grid));
    }
${FAST_READER_JAVA}}
`,
};

S.m32 = {
  cpp: `${CPP_HEAD}
/* cables[i] = {u, v} for cable i+1. events[j] is the cable number unplugged
   at step j. Return the cluster count after each unplugging, in order. */
vector<int> clustersAfterEachRemoval(int n,
                                     const vector<pair<int,int>>& cables,
                                     const vector<int>& events) {
    // write your code here

    return vector<int>(events.size(), n);
}

int main() {
    int n, m, q;
    if (scanf("%d %d %d", &n, &m, &q) != 3) return 0;
    vector<pair<int,int>> cables(m);
    for (auto &e : cables) scanf("%d %d", &e.first, &e.second);
    vector<int> events(q);
    for (auto &x : events) scanf("%d", &x);

    string out;
    for (int v : clustersAfterEachRemoval(n, cables, events)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* cables[i] = {u, v} for cable i+1. events[j] is the cable number unplugged
       at step j. Return the cluster count after each unplugging, in order. */
    static int[] clustersAfterEachRemoval(int n, int[][] cables, int[] events) {
        // write your code here

        int[] res = new int[events.length];
        Arrays.fill(res, n);
        return res;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt(), q = in.nextInt();
        int[][] cables = new int[m][2];
        for (int i = 0; i < m; i++) { cables[i][0] = in.nextInt(); cables[i][1] = in.nextInt(); }
        int[] events = new int[q];
        for (int i = 0; i < q; i++) events[i] = in.nextInt();

        StringBuilder sb = new StringBuilder();
        for (int v : clustersAfterEachRemoval(n, cables, events)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m33 = {
  cpp: `${CPP_HEAD}
/* f[i] is the person employee i referred, for i from 1 to n; f[0] is unused.
   Return chain sizes for employees 1..n, counting the employee themselves. */
vector<long long> chainSizes(int n, const vector<int>& f) {
    // write your code here

    return vector<long long>(n, 1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> f(n + 1, 1);
    for (int i = 1; i <= n; i++) scanf("%d", &f[i]);

    vector<long long> res = chainSizes(n, f);
    string out;
    for (size_t i = 0; i < res.size(); i++) { if (i) out += ' '; out += to_string(res[i]); }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* f[i] is the person employee i referred, for i from 1 to n; f[0] is unused.
       Return chain sizes for employees 1..n, counting the employee themselves. */
    static long[] chainSizes(int n, int[] f) {
        // write your code here

        long[] res = new long[n];
        Arrays.fill(res, 1);
        return res;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] f = new int[n + 1];
        for (int i = 1; i <= n; i++) f[i] = in.nextInt();

        long[] res = chainSizes(n, f);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.length; i++) { if (i > 0) sb.append(' '); sb.append(res[i]); }
        sb.append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m34 = {
  cpp: `${CPP_HEAD}
/* flights[i] = {u, v, cost}, one way only. Return -1 if city n is unreachable. */
long long cheapestFare(int n, const vector<array<long long,3>>& flights) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long,3>> flights(m);
    for (auto &e : flights) scanf("%lld %lld %lld", &e[0], &e[1], &e[2]);

    printf("%lld\\n", cheapestFare(n, flights));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* flights[i] = {u, v, cost}, one way only. Return -1 if n is unreachable. */
    static long cheapestFare(int n, long[][] flights) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[][] flights = new long[m][3];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 3; j++) flights[i][j] = in.nextLong();

        System.out.println(cheapestFare(n, flights));
    }
${FAST_READER_JAVA}}
`,
};

S.m35 = {
  cpp: `${CPP_HEAD}
/* pairs[i] = {staff, shift}: that staff member can work that shift.
   Return true if every one of the m shifts can be covered. */
bool canCoverEveryShift(int n, int m, const vector<pair<int,int>>& pairs) {
    // write your code here

    return false;
}

int main() {
    int n, m, p;
    if (scanf("%d %d %d", &n, &m, &p) != 3) return 0;
    vector<pair<int,int>> pairs(p);
    for (auto &x : pairs) scanf("%d %d", &x.first, &x.second);

    printf("%s\\n", canCoverEveryShift(n, m, pairs) ? "YES" : "NO");
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* pairs[i] = {staff, shift}: that staff member can work that shift.
       Return true if every one of the m shifts can be covered. */
    static boolean canCoverEveryShift(int n, int m, int[][] pairs) {
        // write your code here

        return false;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt(), p = in.nextInt();
        int[][] pairs = new int[p][2];
        for (int i = 0; i < p; i++) { pairs[i][0] = in.nextInt(); pairs[i][1] = in.nextInt(); }

        System.out.println(canCoverEveryShift(n, m, pairs) ? "YES" : "NO");
    }
${FAST_READER_JAVA}}
`,
};

/**
 * The /** ... *\/ blocks above each function are kept in THIS file so the
 * signatures stay self-documenting for whoever edits the templates, but they
 * are stripped from what the student receives - the statement already says
 * everything they explain, and a wall of comments above the stub is noise.
 */
function stripDocBlocks(src) {
  return src
    .replace(/^[ \t]*\/\*\*[\s\S]*?\*\/[ \t]*\r?\n/gm, '')
    .replace(/\n{3,}/g, '\n\n');
}

let n = 0;
for (const d of fs.readdirSync(PROBLEMS)) {
  const pj = path.join(PROBLEMS, d, 'problem.json');
  if (!fs.existsSync(pj)) continue;
  const meta = JSON.parse(fs.readFileSync(pj, 'utf8'));
  const tpl = S[meta.id];
  if (!tpl) { console.log(`  ${meta.id}  no template defined - skipped`); continue; }

  const dir = path.join(PROBLEMS, d, 'starters');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'main.cpp'), stripDocBlocks(tpl.cpp), 'utf8');
  fs.writeFileSync(path.join(dir, 'main.java'), stripDocBlocks(tpl.java), 'utf8');
  console.log(`  ${meta.id}  starters written (cpp + java)`);
  n++;
}
console.log(`\n  ${n} problem(s) now have function-stub starters\n`);
