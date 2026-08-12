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

S.m36 = {
  cpp: `${CPP_HEAD}
/* c[i][j] is the cost of putting server i+1 in position j+1. */
long long minTotalCost(const vector<vector<long long>>& c) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<long long>> c(n, vector<long long>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%lld", &c[i][j]);

    printf("%lld\\n", minTotalCost(c));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* c[i][j] is the cost of putting server i+1 in position j+1. */
    static long minTotalCost(long[][] c) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] c = new long[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) c[i][j] = in.nextLong();

        System.out.println(minTotalCost(c));
    }
${FAST_READER_JAVA}}
`,
};

S.m37 = {
  cpp: `${CPP_HEAD}
/* h[i][j] is the height of the cell in row i, column j.
   Return the smallest possible worst single step. */
long long minStrain(const vector<vector<long long>>& h) {
    // write your code here

    return 0;
}

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    vector<vector<long long>> h(r, vector<long long>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%lld", &h[i][j]);

    printf("%lld\\n", minStrain(h));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* h[i][j] is the height of the cell in row i, column j.
       Return the smallest possible worst single step. */
    static long minStrain(long[][] h) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int r = in.nextInt(), c = in.nextInt();
        long[][] h = new long[r][c];
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++) h[i][j] = in.nextLong();

        System.out.println(minStrain(h));
    }
${FAST_READER_JAVA}}
`,
};

S.m38 = {
  cpp: `${CPP_HEAD}
/* One answer per address: the length of the longest rule that is a prefix
   of it, or -1 when none is. */
vector<int> longestMatches(const vector<string>& rules, const vector<string>& addresses) {
    // write your code here

    return vector<int>(addresses.size(), -1);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<char> buf(64);
    vector<string> rules(n), addresses(q);
    for (int i = 0; i < n; i++) { scanf("%s", buf.data()); rules[i] = buf.data(); }
    for (int i = 0; i < q; i++) { scanf("%s", buf.data()); addresses[i] = buf.data(); }

    string out;
    for (int v : longestMatches(rules, addresses)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* One answer per address: the length of the longest rule that is a prefix
       of it, or -1 when none is. */
    static int[] longestMatches(String[] rules, String[] addresses) {
        // write your code here

        int[] res = new int[addresses.length];
        Arrays.fill(res, -1);
        return res;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        String[] rules = new String[n], addresses = new String[q];
        for (int i = 0; i < n; i++) rules[i] = in.next();
        for (int i = 0; i < q; i++) addresses[i] = in.next();

        StringBuilder sb = new StringBuilder();
        for (int v : longestMatches(rules, addresses)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m39 = {
  cpp: `${CPP_HEAD}
/* ops[i] = {type, player, score}: type 1 is UPDATE (score is meaningful),
   type 0 is RANK (score is 0 and unused).
   Return one answer per RANK operation, in order. */
vector<long long> answerRanks(int n, const vector<array<long long,3>>& ops) {
    // write your code here

    return vector<long long>();
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<array<long long,3>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'U') { ops[i][0] = 1; scanf("%lld %lld", &ops[i][1], &ops[i][2]); }
        else { ops[i][0] = 0; scanf("%lld", &ops[i][1]); ops[i][2] = 0; }
    }

    string out;
    for (long long v : answerRanks(n, ops)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] = {type, player, score}: type 1 is UPDATE (score is meaningful),
       type 0 is RANK (score is 0 and unused).
       Return one answer per RANK operation, in order. */
    static long[] answerRanks(int n, long[][] ops) {
        // write your code here

        return new long[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        long[][] ops = new long[q][3];
        for (int i = 0; i < q; i++) {
            String w = in.next();
            if (w.charAt(0) == 'U') { ops[i][0] = 1; ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong(); }
            else { ops[i][0] = 0; ops[i][1] = in.nextLong(); }
        }

        StringBuilder sb = new StringBuilder();
        for (long v : answerRanks(n, ops)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m40 = {
  cpp: `${CPP_HEAD}
/* a[i] is sensor i+1's starting reading.
   ops[i] = {type, l, r, x}: type 1 is ADD (x is the amount), type 0 is MAX
   (x is 0 and unused). Return one answer per MAX operation, in order. */
vector<long long> answerMaxQueries(const vector<long long>& a,
                                   const vector<array<long long,4>>& ops) {
    // write your code here

    return vector<long long>();
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);
    vector<array<long long,4>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'A') { ops[i][0] = 1; scanf("%lld %lld %lld", &ops[i][1], &ops[i][2], &ops[i][3]); }
        else { ops[i][0] = 0; scanf("%lld %lld", &ops[i][1], &ops[i][2]); ops[i][3] = 0; }
    }

    string out;
    for (long long v : answerMaxQueries(a, ops)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* a[i] is sensor i+1's starting reading.
       ops[i] = {type, l, r, x}: type 1 is ADD (x is the amount), type 0 is MAX
       (x is 0 and unused). Return one answer per MAX operation, in order. */
    static long[] answerMaxQueries(long[] a, long[][] ops) {
        // write your code here

        return new long[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();
        long[][] ops = new long[q][4];
        for (int i = 0; i < q; i++) {
            String w = in.next();
            if (w.charAt(0) == 'A') {
                ops[i][0] = 1; ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong(); ops[i][3] = in.nextLong();
            } else {
                ops[i][0] = 0; ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong();
            }
        }

        StringBuilder sb = new StringBuilder();
        for (long v : answerMaxQueries(a, ops)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m41 = {
  cpp: `${CPP_HEAD}
/* Return every 1-based start position where p occurs in s, increasing.
   Overlapping occurrences all count. */
vector<int> findOccurrences(const string& p, const string& s) {
    // write your code here

    return vector<int>();
}

int main() {
    static char pbuf[1000006], sbuf[1000006];
    if (scanf("%s", pbuf) != 1) return 0;
    if (scanf("%s", sbuf) != 1) return 0;

    vector<int> hits = findOccurrences(pbuf, sbuf);
    string out = to_string(hits.size());
    out += '\\n';
    for (size_t i = 0; i < hits.size(); i++) { if (i) out += ' '; out += to_string(hits[i]); }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return every 1-based start position where p occurs in s, increasing.
       Overlapping occurrences all count. */
    static int[] findOccurrences(String p, String s) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        String p = in.next(), s = in.next();

        int[] hits = findOccurrences(p, s);
        StringBuilder sb = new StringBuilder();
        sb.append(hits.length).append('\\n');
        for (int i = 0; i < hits.length; i++) { if (i > 0) sb.append(' '); sb.append(hits[i]); }
        sb.append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m42 = {
  cpp: `${CPP_HEAD}
long long countDistinctPalindromes(const string& s) {
    // write your code here

    return 0;
}

int main() {
    static char buf[200006];
    if (scanf("%s", buf) != 1) return 0;

    printf("%lld\\n", countDistinctPalindromes(buf));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long countDistinctPalindromes(String s) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(countDistinctPalindromes(in.next()));
    }
${FAST_READER_JAVA}}
`,
};

S.m43 = {
  cpp: `${CPP_HEAD}
/* dist[i][j] is the distance from location i to location j, 0 being the
   depot. Not symmetric. Return the best round trip. */
long long shortestRoute(const vector<vector<long long>>& dist) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<long long>> dist(n + 1, vector<long long>(n + 1));
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= n; j++) scanf("%lld", &dist[i][j]);

    printf("%lld\\n", shortestRoute(dist));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* dist[i][j] is the distance from location i to location j, 0 being the
       depot. Not symmetric. Return the best round trip. */
    static long shortestRoute(long[][] dist) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] dist = new long[n + 1][n + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= n; j++) dist[i][j] = in.nextLong();

        System.out.println(shortestRoute(dist));
    }
${FAST_READER_JAVA}}
`,
};

S.m44 = {
  cpp: `${CPP_HEAD}
/* cars[i] = {arrival, departure}, already in non-decreasing arrival order. */
long long totalRevenue(int k, const vector<pair<long long,long long>>& cars) {
    // write your code here

    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<pair<long long,long long>> cars(n);
    for (auto &c : cars) scanf("%lld %lld", &c.first, &c.second);

    printf("%lld\\n", totalRevenue(k, cars));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* arrival[i] / departure[i], already in non-decreasing arrival order. */
    static long totalRevenue(int k, long[] arrival, long[] departure) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), k = in.nextInt();
        long[] arrival = new long[n], departure = new long[n];
        for (int i = 0; i < n; i++) { arrival[i] = in.nextLong(); departure[i] = in.nextLong(); }

        System.out.println(totalRevenue(k, arrival, departure));
    }
${FAST_READER_JAVA}}
`,
};

S.m45 = {
  cpp: `${CPP_HEAD}
/* Return the smallest achievable difference, or -1 if no split exists. */
long long smallestDifference(const vector<int>& a) {
    // write your code here

    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n);
    for (auto &x : a) scanf("%d", &x);

    printf("%lld\\n", smallestDifference(a));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the smallest achievable difference, or -1 if no split exists. */
    static long smallestDifference(int[] a) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = in.nextInt();

        System.out.println(smallestDifference(a));
    }
${FAST_READER_JAVA}}
`,
};

S.m46 = {
  cpp: `${CPP_HEAD}
/* works[c - 'a'] is true when that key still functions. */
int longestTypeableRun(const string& s, const vector<bool>& works) {
    // write your code here

    return 0;
}

int main() {
    static char buf[1000006];
    if (scanf("%s", buf) != 1) return 0;
    int k;
    if (scanf("%d", &k) != 1) return 0;
    vector<bool> works(26, false);
    for (int i = 0; i < k; i++) { char c[8]; scanf("%s", c); works[c[0] - 'a'] = true; }

    printf("%d\\n", longestTypeableRun(buf, works));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* works[c - 'a'] is true when that key still functions. */
    static int longestTypeableRun(String s, boolean[] works) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        String s = in.next();
        int k = in.nextInt();
        boolean[] works = new boolean[26];
        for (int i = 0; i < k; i++) works[in.next().charAt(0) - 'a'] = true;

        System.out.println(longestTypeableRun(s, works));
    }
${FAST_READER_JAVA}}
`,
};

S.m47 = {
  cpp: `${CPP_HEAD}
/* requests[i] = {arrival time, tokens needed}, times strictly increasing.
   The bucket holds at most C and starts full at time 0. */
int servedCount(long long C, const vector<pair<long long,long long>>& requests) {
    // write your code here

    return 0;
}

int main() {
    int n;
    long long C;
    if (scanf("%d %lld", &n, &C) != 2) return 0;
    vector<pair<long long,long long>> requests(n);
    for (auto &r : requests) scanf("%lld %lld", &r.first, &r.second);

    printf("%d\\n", servedCount(C, requests));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* time[i] / need[i], times strictly increasing.
       The bucket holds at most C and starts full at time 0. */
    static int servedCount(long C, long[] time, long[] need) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long C = in.nextLong();
        long[] time = new long[n], need = new long[n];
        for (int i = 0; i < n; i++) { time[i] = in.nextLong(); need[i] = in.nextLong(); }

        System.out.println(servedCount(C, time, need));
    }
${FAST_READER_JAVA}}
`,
};

S.m48 = {
  cpp: `${CPP_HEAD}
/* trains[i] = {arrival, departure}, both inclusive. At most one train may be
   cancelled. Return the minimum number of platforms. */
int minPlatforms(const vector<pair<long long,long long>>& trains) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long,long long>> trains(n);
    for (auto &t : trains) scanf("%lld %lld", &t.first, &t.second);

    printf("%d\\n", minPlatforms(trains));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* arrival[i] / departure[i], both inclusive. At most one train may be
       cancelled. Return the minimum number of platforms. */
    static int minPlatforms(long[] arrival, long[] departure) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] arrival = new long[n], departure = new long[n];
        for (int i = 0; i < n; i++) { arrival[i] = in.nextLong(); departure[i] = in.nextLong(); }

        System.out.println(minPlatforms(arrival, departure));
    }
${FAST_READER_JAVA}}
`,
};

S.m49 = {
  cpp: `${CPP_HEAD}
/* Return the minimum number of one-step moves, or -1 if impossible. */
long long minMoves(const vector<long long>& a) {
    // write your code here

    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%lld\\n", minMoves(a));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the minimum number of one-step moves, or -1 if impossible. */
    static long minMoves(long[] a) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(minMoves(a));
    }
${FAST_READER_JAVA}}
`,
};

S.m50 = {
  cpp: `${CPP_HEAD}
/* Return the minimum total spend in PAISE (1 rupee = 100 paise). */
long long minSpendPaise(const vector<long long>& prices, const vector<long long>& discounts) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> prices(n), discounts(m);
    for (auto &x : prices) scanf("%lld", &x);
    for (auto &x : discounts) scanf("%lld", &x);

    printf("%lld\\n", minSpendPaise(prices, discounts));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the minimum total spend in PAISE (1 rupee = 100 paise). */
    static long minSpendPaise(long[] prices, long[] discounts) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[] prices = new long[n], discounts = new long[m];
        for (int i = 0; i < n; i++) prices[i] = in.nextLong();
        for (int i = 0; i < m; i++) discounts[i] = in.nextLong();

        System.out.println(minSpendPaise(prices, discounts));
    }
${FAST_READER_JAVA}}
`,
};

S.m51 = {
  cpp: `${CPP_HEAD}
/* ops[i] = {type, v, x}: type 1 is EDIT (x is the character), type 0 is
   QUERY (x is k). Return one character per QUERY, in order. */
vector<char> answerQueries(const vector<array<int,3>>& ops) {
    // write your code here

    return vector<char>();
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<array<int,3>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'E') {
            char c[8];
            scanf("%d %s", &ops[i][1], c);
            ops[i][0] = 1;
            ops[i][2] = c[0];
        } else {
            scanf("%d %d", &ops[i][1], &ops[i][2]);
            ops[i][0] = 0;
        }
    }

    string out;
    for (char c : answerQueries(ops)) { out += c; out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] = {type, v, x}: type 1 is EDIT (x is the character code), type 0
       is QUERY (x is k). Return one character per QUERY, in order. */
    static char[] answerQueries(int[][] ops) {
        // write your code here

        return new char[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int q = in.nextInt();
        int[][] ops = new int[q][3];
        for (int i = 0; i < q; i++) {
            String w = in.next();
            if (w.charAt(0) == 'E') { ops[i][0] = 1; ops[i][1] = in.nextInt(); ops[i][2] = in.next().charAt(0); }
            else { ops[i][0] = 0; ops[i][1] = in.nextInt(); ops[i][2] = in.nextInt(); }
        }

        StringBuilder sb = new StringBuilder();
        for (char c : answerQueries(ops)) sb.append(c).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m52 = {
  cpp: `${CPP_HEAD}
int minRewrites(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%d\\n", minRewrites(a));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static int minRewrites(long[] a) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(minRewrites(a));
    }
${FAST_READER_JAVA}}
`,
};

S.m53 = {
  cpp: `${CPP_HEAD}
long long countBalancedWindows(const string& s) {
    // write your code here

    return 0;
}

int main() {
    static char buf[200006];
    if (scanf("%s", buf) != 1) return 0;

    printf("%lld\\n", countBalancedWindows(buf));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long countBalancedWindows(String s) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(countBalancedWindows(in.next()));
    }
${FAST_READER_JAVA}}
`,
};

S.m54 = {
  cpp: `${CPP_HEAD}
/* reqs[i] = {time, from, to}, in non-decreasing time order.
   Return the completion time of each request, in input order. */
vector<long long> completionTimes(int f, int e, const vector<array<long long,3>>& reqs) {
    // write your code here

    return vector<long long>(reqs.size(), 0);
}

int main() {
    int f, e, n;
    if (scanf("%d %d %d", &f, &e, &n) != 3) return 0;
    vector<array<long long,3>> reqs(n);
    for (auto &r : reqs) scanf("%lld %lld %lld", &r[0], &r[1], &r[2]);

    string out;
    for (long long v : completionTimes(f, e, reqs)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* reqs[i] = {time, from, to}, in non-decreasing time order.
       Return the completion time of each request, in input order. */
    static long[] completionTimes(int f, int e, long[][] reqs) {
        // write your code here

        return new long[reqs.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int f = in.nextInt(), e = in.nextInt(), n = in.nextInt();
        long[][] reqs = new long[n][3];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < 3; j++) reqs[i][j] = in.nextLong();

        StringBuilder sb = new StringBuilder();
        for (long v : completionTimes(f, e, reqs)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m55 = {
  cpp: `${CPP_HEAD}
/* initial[i] = {p, c} for gateway i+1.
   ops[j] = {type, a, b}: type 0 is ADD (a=p, b=c), type 1 is REMOVE (a=id),
   type 2 is ROUTE (a=r). Return one answer per ROUTE, in order. */
vector<long long> answerRoutes(const vector<pair<long long,long long>>& initial,
                               const vector<array<long long,3>>& ops) {
    // write your code here

    return vector<long long>();
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<pair<long long,long long>> initial(n);
    for (auto &g : initial) scanf("%lld %lld", &g.first, &g.second);

    vector<array<long long,3>> ops(q);
    char word[16];
    for (int i = 0; i < q; i++) {
        scanf("%s", word);
        if (word[0] == 'A') { ops[i][0] = 0; scanf("%lld %lld", &ops[i][1], &ops[i][2]); }
        else if (word[1] == 'E') { ops[i][0] = 1; scanf("%lld", &ops[i][1]); ops[i][2] = 0; }
        else { ops[i][0] = 2; scanf("%lld", &ops[i][1]); ops[i][2] = 0; }
    }

    string out;
    for (long long v : answerRoutes(initial, ops)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* initial[i] = {p, c} for gateway i+1.
       ops[j] = {type, a, b}: type 0 is ADD (a=p, b=c), type 1 is REMOVE (a=id),
       type 2 is ROUTE (a=r). Return one answer per ROUTE, in order. */
    static long[] answerRoutes(long[][] initial, long[][] ops) {
        // write your code here

        return new long[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        long[][] initial = new long[n][2];
        for (int i = 0; i < n; i++) { initial[i][0] = in.nextLong(); initial[i][1] = in.nextLong(); }
        long[][] ops = new long[q][3];
        for (int i = 0; i < q; i++) {
            String w = in.next();
            if (w.charAt(0) == 'A') { ops[i][0] = 0; ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong(); }
            else if (w.charAt(1) == 'E') { ops[i][0] = 1; ops[i][1] = in.nextLong(); }
            else { ops[i][0] = 2; ops[i][1] = in.nextLong(); }
        }

        StringBuilder sb = new StringBuilder();
        for (long v : answerRoutes(initial, ops)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m56 = {
  cpp: `${CPP_HEAD}
/* Return the minimum cost, or -1 if the requirement cannot be met. */
long long minCost(const vector<long long>& s, long long m) {
    // write your code here

    return -1;
}

int main() {
    int n;
    long long m;
    if (scanf("%d %lld", &n, &m) != 2) return 0;
    vector<long long> s(n);
    for (auto &x : s) scanf("%lld", &x);

    printf("%lld\\n", minCost(s, m));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the minimum cost, or -1 if the requirement cannot be met. */
    static long minCost(long[] s, long m) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long m = in.nextLong();
        long[] s = new long[n];
        for (int i = 0; i < n; i++) s[i] = in.nextLong();

        System.out.println(minCost(s, m));
    }
${FAST_READER_JAVA}}
`,
};

S.m57 = {
  cpp: `${CPP_HEAD}
/* p[i] is ticket i+1's priority. Return the ticket NUMBERS in resolution order. */
vector<int> resolutionOrder(const vector<long long>& p) {
    // write your code here

    return vector<int>();
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> p(n);
    for (auto &x : p) scanf("%lld", &x);

    string out;
    vector<int> order = resolutionOrder(p);
    for (size_t i = 0; i < order.size(); i++) { if (i) out += ' '; out += to_string(order[i]); }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* p[i] is ticket i+1's priority. Return the ticket NUMBERS in resolution order. */
    static int[] resolutionOrder(long[] p) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] p = new long[n];
        for (int i = 0; i < n; i++) p[i] = in.nextLong();

        int[] order = resolutionOrder(p);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) { if (i > 0) sb.append(' '); sb.append(order[i]); }
        sb.append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m58 = {
  cpp: `${CPP_HEAD}
/* Return the fewest sites to open, or -1 if some customer cannot be served. */
int minWarehouses(const vector<pair<long long,long long>>& sites,
                  const vector<pair<long long,long long>>& customers,
                  long long d) {
    // write your code here

    return -1;
}

int main() {
    int n, m;
    long long d;
    if (scanf("%d %d %lld", &n, &m, &d) != 3) return 0;
    vector<pair<long long,long long>> sites(n), customers(m);
    for (auto &p : sites) scanf("%lld %lld", &p.first, &p.second);
    for (auto &p : customers) scanf("%lld %lld", &p.first, &p.second);

    printf("%d\\n", minWarehouses(sites, customers, d));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the fewest sites to open, or -1 if some customer cannot be served. */
    static int minWarehouses(long[][] sites, long[][] customers, long d) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long d = in.nextLong();
        long[][] sites = new long[n][2], customers = new long[m][2];
        for (int i = 0; i < n; i++) { sites[i][0] = in.nextLong(); sites[i][1] = in.nextLong(); }
        for (int i = 0; i < m; i++) { customers[i][0] = in.nextLong(); customers[i][1] = in.nextLong(); }

        System.out.println(minWarehouses(sites, customers, d));
    }
${FAST_READER_JAVA}}
`,
};

S.m59 = {
  cpp: `${CPP_HEAD}
/* windows[i] = {s, e}. Each delivery takes one whole hour. */
int maxDeliveries(const vector<pair<long long,long long>>& windows) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long,long long>> windows(n);
    for (auto &w : windows) scanf("%lld %lld", &w.first, &w.second);

    printf("%d\\n", maxDeliveries(windows));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* start[i] / end[i]. Each delivery takes one whole hour. */
    static int maxDeliveries(long[] start, long[] end) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] start = new long[n], end = new long[n];
        for (int i = 0; i < n; i++) { start[i] = in.nextLong(); end[i] = in.nextLong(); }

        System.out.println(maxDeliveries(start, end));
    }
${FAST_READER_JAVA}}
`,
};

S.m60 = {
  cpp: `${CPP_HEAD}
/* Each post is one whole line and may contain spaces. */
int distinctPosts(const vector<string>& posts) {
    // write your code here

    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    cin.ignore(numeric_limits<streamsize>::max(), '\\n');
    vector<string> posts(n);
    for (int i = 0; i < n; i++) getline(cin, posts[i]);

    cout << distinctPosts(posts) << '\\n';
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Each post is one whole line and may contain spaces. */
    static int distinctPosts(String[] posts) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        String[] posts = new String[n];
        for (int i = 0; i < n; i++) {
            String line = br.readLine();
            posts[i] = line == null ? "" : line;
        }

        System.out.println(distinctPosts(posts));
    }
}
`,
};

S.m61 = {
  cpp: `${CPP_HEAD}
int shortestWindow(const vector<int>& brands) {
    // write your code here

    return (int)brands.size();
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> brands(n);
    for (auto &x : brands) scanf("%d", &x);

    printf("%d\\n", shortestWindow(brands));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static int shortestWindow(int[] brands) {
        // write your code here

        return brands.length;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] brands = new int[n];
        for (int i = 0; i < n; i++) brands[i] = in.nextInt();

        System.out.println(shortestWindow(brands));
    }
${FAST_READER_JAVA}}
`,
};

S.m62 = {
  cpp: `${CPP_HEAD}
/* services[i] = {l, r, t}. Pausing and resuming is allowed. */
bool canDeployAll(const vector<array<long long,3>>& services) {
    // write your code here

    return false;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,3>> services(n);
    for (auto &s : services) scanf("%lld %lld %lld", &s[0], &s[1], &s[2]);

    printf("%s\\n", canDeployAll(services) ? "YES" : "NO");
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* services[i] = {l, r, t}. Pausing and resuming is allowed. */
    static boolean canDeployAll(long[][] services) {
        // write your code here

        return false;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] services = new long[n][3];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < 3; j++) services[i][j] = in.nextLong();

        System.out.println(canDeployAll(services) ? "YES" : "NO");
    }
${FAST_READER_JAVA}}
`,
};

S.m63 = {
  cpp: `${CPP_HEAD}
/* w[i] is stage i+1's risk. edges[j] = {a, b} means a runs before b.
   Starts are stages with no incoming edge, ends have no outgoing edge. */
long long minRisk(const vector<long long>& w, const vector<pair<int,int>>& edges) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<long long> w(n);
    for (auto &x : w) scanf("%lld", &x);
    vector<pair<int,int>> edges(m);
    for (auto &e : edges) scanf("%d %d", &e.first, &e.second);

    printf("%lld\\n", minRisk(w, edges));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* w[i] is stage i+1's risk. edges[j] = {a, b} means a runs before b.
       Starts are stages with no incoming edge, ends have no outgoing edge. */
    static long minRisk(long[] w, int[][] edges) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[] w = new long[n];
        for (int i = 0; i < n; i++) w[i] = in.nextLong();
        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) { edges[i][0] = in.nextInt(); edges[i][1] = in.nextInt(); }

        System.out.println(minRisk(w, edges));
    }
${FAST_READER_JAVA}}
`,
};

S.m64 = {
  cpp: `${CPP_HEAD}
/* meetings[i] = {start, end, value}. Touching meetings do not clash. */
long long maxValue(const vector<array<long long,3>>& meetings) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,3>> meetings(n);
    for (auto &m : meetings) scanf("%lld %lld %lld", &m[0], &m[1], &m[2]);

    printf("%lld\\n", maxValue(meetings));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* meetings[i] = {start, end, value}. Touching meetings do not clash. */
    static long maxValue(long[][] meetings) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] meetings = new long[n][3];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < 3; j++) meetings[i][j] = in.nextLong();

        System.out.println(maxValue(meetings));
    }
${FAST_READER_JAVA}}
`,
};

S.m65 = {
  cpp: `${CPP_HEAD}
/* Patients sharing a score always land in the same bucket. */
long long smallestLargestBucket(vector<int> scores, int k) {
    // write your code here

    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<int> scores(n);
    for (auto &x : scores) scanf("%d", &x);

    printf("%lld\\n", smallestLargestBucket(scores, k));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Patients sharing a score always land in the same bucket. */
    static long smallestLargestBucket(int[] scores, int k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), k = in.nextInt();
        int[] scores = new int[n];
        for (int i = 0; i < n; i++) scores[i] = in.nextInt();

        System.out.println(smallestLargestBucket(scores, k));
    }
${FAST_READER_JAVA}}
`,
};

S.m66 = {
  cpp: `${CPP_HEAD}
/* c[i] is leaf i+1's cost. The leaf order is fixed. */
long long minPlanCost(const vector<long long>& c) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> c(n);
    for (auto &x : c) scanf("%lld", &x);

    printf("%lld\\n", minPlanCost(c));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* c[i] is leaf i+1's cost. The leaf order is fixed. */
    static long minPlanCost(long[] c) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] c = new long[n];
        for (int i = 0; i < n; i++) c[i] = in.nextLong();

        System.out.println(minPlanCost(c));
    }
${FAST_READER_JAVA}}
`,
};

S.m67 = {
  cpp: `${CPP_HEAD}
/* shelves[i] = {current stock, capacity}. Return the best achievable
   smallest fill ratio, in millionths (the ratio times 10^6, rounded down). */
long long bestMinRatioMillionths(const vector<pair<long long,long long>>& shelves, long long T) {
    // write your code here

    return 0;
}

int main() {
    int n;
    long long T;
    if (scanf("%d %lld", &n, &T) != 2) return 0;
    vector<pair<long long,long long>> shelves(n);
    for (auto &s : shelves) scanf("%lld %lld", &s.first, &s.second);

    printf("%lld\\n", bestMinRatioMillionths(shelves, T));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* stock[i] / capacity[i]. Return the best achievable smallest fill ratio,
       in millionths (the ratio times 10^6, rounded down). */
    static long bestMinRatioMillionths(long[] stock, long[] capacity, long T) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long T = in.nextLong();
        long[] stock = new long[n], capacity = new long[n];
        for (int i = 0; i < n; i++) { stock[i] = in.nextLong(); capacity[i] = in.nextLong(); }

        System.out.println(bestMinRatioMillionths(stock, capacity, T));
    }
${FAST_READER_JAVA}}
`,
};

S.m68 = {
  cpp: `${CPP_HEAD}
/* trades[j] = {a, b, x}: a owes b the amount x.
   Return one entry per clearing group: {smallest member, non-zero count,
   total moving}, ordered by smallest member. */
vector<array<long long,3>> netGroups(int n, const vector<array<long long,3>>& trades) {
    // write your code here

    return vector<array<long long,3>>();
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<long long,3>> trades(m);
    for (auto &t : trades) scanf("%lld %lld %lld", &t[0], &t[1], &t[2]);

    vector<array<long long,3>> groups = netGroups(n, trades);
    string out = to_string(groups.size());
    out += '\\n';
    for (const auto &g : groups) {
        out += to_string(g[0]); out += ' ';
        out += to_string(g[1]); out += ' ';
        out += to_string(g[2]); out += '\\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* trades[j] = {a, b, x}: a owes b the amount x.
       Return one row per clearing group: {smallest member, non-zero count,
       total moving}, ordered by smallest member. */
    static long[][] netGroups(int n, long[][] trades) {
        // write your code here

        return new long[0][3];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[][] trades = new long[m][3];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 3; j++) trades[i][j] = in.nextLong();

        long[][] groups = netGroups(n, trades);
        StringBuilder sb = new StringBuilder();
        sb.append(groups.length).append('\\n');
        for (long[] g : groups) sb.append(g[0]).append(' ').append(g[1]).append(' ').append(g[2]).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m69 = {
  cpp: `${CPP_HEAD}
/* assets[i] = {current, target, fee}. Return -1 if the targets are unreachable. */
long long minRebalanceCost(const vector<array<long long,3>>& assets) {
    // write your code here

    return -1;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,3>> assets(n);
    for (auto &a : assets) scanf("%lld %lld %lld", &a[0], &a[1], &a[2]);

    printf("%lld\\n", minRebalanceCost(assets));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* assets[i] = {current, target, fee}. Return -1 if unreachable. */
    static long minRebalanceCost(long[][] assets) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] assets = new long[n][3];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < 3; j++) assets[i][j] = in.nextLong();

        System.out.println(minRebalanceCost(assets));
    }
${FAST_READER_JAVA}}
`,
};

S.m70 = {
  cpp: `${CPP_HEAD}
/* layers[i] = {x1, y1, x2, y2}, half-open. The last one is on top.
   Count the pixels covered by the top layer and by no other. */
long long exclusiveTopArea(const vector<array<long long,4>>& layers) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<array<long long,4>> layers(n);
    for (auto &r : layers) scanf("%lld %lld %lld %lld", &r[0], &r[1], &r[2], &r[3]);

    printf("%lld\\n", exclusiveTopArea(layers));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* layers[i] = {x1, y1, x2, y2}, half-open. The last one is on top.
       Count the pixels covered by the top layer and by no other. */
    static long exclusiveTopArea(long[][] layers) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] layers = new long[n][4];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < 4; j++) layers[i][j] = in.nextLong();

        System.out.println(exclusiveTopArea(layers));
    }
${FAST_READER_JAVA}}
`,
};

S.m71 = {
  cpp: `${CPP_HEAD}
/* ranges[i] = {l, r}, inclusive, in priority order. The ALLOW/DENY action is
   read for you and deliberately not passed on - it does not affect shadowing. */
int countShadowed(const vector<pair<long long,long long>>& ranges) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<pair<long long,long long>> ranges(n);
    char action[16];
    for (auto &r : ranges) scanf("%lld %lld %s", &r.first, &r.second, action);

    printf("%d\\n", countShadowed(ranges));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* lo[i] / hi[i], inclusive, in priority order. The ALLOW/DENY action is
       read for you and deliberately not passed on - it does not affect this. */
    static int countShadowed(long[] lo, long[] hi) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] lo = new long[n], hi = new long[n];
        for (int i = 0; i < n; i++) { lo[i] = in.nextLong(); hi[i] = in.nextLong(); in.next(); }

        System.out.println(countShadowed(lo, hi));
    }
${FAST_READER_JAVA}}
`,
};

S.m72 = {
  cpp: `${CPP_HEAD}
long long minTotalSpread(vector<long long> scores, int k) {
    // write your code here

    return 0;
}

int main() {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    vector<long long> scores(n);
    for (auto &x : scores) scanf("%lld", &x);

    printf("%lld\\n", minTotalSpread(scores, k));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long minTotalSpread(long[] scores, int k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), k = in.nextInt();
        long[] scores = new long[n];
        for (int i = 0; i < n; i++) scores[i] = in.nextLong();

        System.out.println(minTotalSpread(scores, k));
    }
${FAST_READER_JAVA}}
`,
};

S.m73 = {
  cpp: `${CPP_HEAD}
/* Return the 1-based block {l, r} to reverse, or {-1, -1} if impossible. */
pair<int,int> findReversedBlock(const vector<long long>& a) {
    // write your code here

    return make_pair(-1, -1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    pair<int,int> r = findReversedBlock(a);
    if (r.first < 0) printf("-1\\n");
    else printf("%d %d\\n", r.first, r.second);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the 1-based block {l, r} to reverse, or {-1, -1} if impossible. */
    static int[] findReversedBlock(long[] a) {
        // write your code here

        return new int[] { -1, -1 };
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        int[] r = findReversedBlock(a);
        System.out.println(r[0] < 0 ? "-1" : (r[0] + " " + r[1]));
    }
${FAST_READER_JAVA}}
`,
};

S.m74 = {
  cpp: `${CPP_HEAD}
long long rotationsOfA(long long a, long long b) {
    // write your code here

    return 0;
}

int main() {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;

    printf("%lld\\n", rotationsOfA(a, b));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long rotationsOfA(long a, long b) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(rotationsOfA(in.nextLong(), in.nextLong()));
    }
${FAST_READER_JAVA}}
`,
};

S.m75 = {
  cpp: `${CPP_HEAD}
/* queries[i] = {n, r}. Return each answer modulo 1e9+7, in order. */
vector<long long> answerQueries(const vector<pair<int,int>>& queries) {
    // write your code here

    return vector<long long>(queries.size(), 0);
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<pair<int,int>> queries(q);
    for (auto &x : queries) scanf("%d %d", &x.first, &x.second);

    string out;
    for (long long v : answerQueries(queries)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* queries[i] = {n, r}. Return each answer modulo 1e9+7, in order. */
    static long[] answerQueries(int[][] queries) {
        // write your code here

        return new long[queries.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int q = in.nextInt();
        int[][] queries = new int[q][2];
        for (int i = 0; i < q; i++) { queries[i][0] = in.nextInt(); queries[i][1] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (long v : answerQueries(queries)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m76 = {
  cpp: `${CPP_HEAD}
/* queries[i] = {l, r}. Return how many primes lie in each range. */
vector<int> countPrimesInRanges(const vector<pair<int,int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 0);
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<pair<int,int>> queries(q);
    for (auto &x : queries) scanf("%d %d", &x.first, &x.second);

    string out;
    for (int v : countPrimesInRanges(queries)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* queries[i] = {l, r}. Return how many primes lie in each range. */
    static int[] countPrimesInRanges(int[][] queries) {
        // write your code here

        return new int[queries.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int q = in.nextInt();
        int[][] queries = new int[q][2];
        for (int i = 0; i < q; i++) { queries[i][0] = in.nextInt(); queries[i][1] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : countPrimesInRanges(queries)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m77 = {
  cpp: `${CPP_HEAD}
bool canEqualise(const vector<long long>& a) {
    // write your code here

    return false;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%s\\n", canEqualise(a) ? "YES" : "NO");
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static boolean canEqualise(long[] a) {
        // write your code here

        return false;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(canEqualise(a) ? "YES" : "NO");
    }
${FAST_READER_JAVA}}
`,
};

S.m78 = {
  cpp: `${CPP_HEAD}
/* Count tokens in [1, N] whose digits sum to exactly s, modulo 1e9+7. */
long long countLucky(long long N, int s) {
    // write your code here

    return 0;
}

int main() {
    long long N;
    int s;
    if (scanf("%lld %d", &N, &s) != 2) return 0;

    printf("%lld\\n", countLucky(N, s));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Count tokens in [1, N] whose digits sum to exactly s, modulo 1e9+7. */
    static long countLucky(long N, int s) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(countLucky(in.nextLong(), in.nextInt()));
    }
${FAST_READER_JAVA}}
`,
};

S.m79 = {
  cpp: `${CPP_HEAD}
/* Return the n shares in non-decreasing order. */
vector<long long> shares(long long n, long long m) {
    // write your code here

    return vector<long long>((size_t)n, 0);
}

int main() {
    long long n, m;
    if (scanf("%lld %lld", &n, &m) != 2) return 0;

    string out;
    vector<long long> s = shares(n, m);
    for (size_t i = 0; i < s.size(); i++) { if (i) out += ' '; out += to_string(s[i]); }
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the n shares in non-decreasing order. */
    static long[] shares(long n, long m) {
        // write your code here

        return new long[(int) n];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        long n = in.nextLong(), m = in.nextLong();

        long[] s = shares(n, m);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length; i++) { if (i > 0) sb.append(' '); sb.append(s[i]); }
        sb.append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.m80 = {
  cpp: `${CPP_HEAD}
/* Return the two IDs that appear once, in increasing order. */
pair<long long,long long> findFaulty(const vector<long long>& ids) {
    // write your code here

    return make_pair(0, 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> ids(n);
    for (auto &x : ids) scanf("%lld", &x);

    pair<long long,long long> r = findFaulty(ids);
    printf("%lld %lld\\n", r.first, r.second);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Return the two IDs that appear once, in increasing order. */
    static long[] findFaulty(long[] ids) {
        // write your code here

        return new long[] { 0, 0 };
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] ids = new long[n];
        for (int i = 0; i < n; i++) ids[i] = in.nextLong();

        long[] r = findFaulty(ids);
        System.out.println(r[0] + " " + r[1]);
    }
${FAST_READER_JAVA}}
`,
};

S.m81 = {
  cpp: `${CPP_HEAD}
/* Count pairs i < j whose masks together set all b bits. */
long long countCoveringPairs(const vector<int>& masks, int b) {
    // write your code here

    return 0;
}

int main() {
    int n, b;
    if (scanf("%d %d", &n, &b) != 2) return 0;
    vector<int> masks(n);
    for (auto &x : masks) scanf("%d", &x);

    printf("%lld\\n", countCoveringPairs(masks, b));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* Count pairs i < j whose masks together set all b bits. */
    static long countCoveringPairs(int[] masks, int b) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), b = in.nextInt();
        int[] masks = new int[n];
        for (int i = 0; i < n; i++) masks[i] = in.nextInt();

        System.out.println(countCoveringPairs(masks, b));
    }
${FAST_READER_JAVA}}
`,
};

S.m82 = {
  cpp: `${CPP_HEAD}
/* requests[i] = {userId, timestamp}, timestamps non-decreasing.
   Return true where the request is accepted. */
vector<char> decide(long long k, long long w, const vector<pair<int,long long>>& requests) {
    // write your code here

    return vector<char>(requests.size(), '0');
}

int main() {
    int q;
    long long k, w;
    if (scanf("%d %lld %lld", &q, &k, &w) != 3) return 0;
    vector<pair<int,long long>> requests(q);
    for (auto &r : requests) scanf("%d %lld", &r.first, &r.second);

    string out;
    for (char c : decide(k, w, requests)) out += c;
    out += '\\n';
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* user[i] / time[i], timestamps non-decreasing.
       Return '1' where the request is accepted and '0' where rejected. */
    static char[] decide(long k, long w, int[] user, long[] time) {
        // write your code here

        char[] r = new char[user.length];
        Arrays.fill(r, '0');
        return r;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int q = in.nextInt();
        long k = in.nextLong(), w = in.nextLong();
        int[] user = new int[q];
        long[] time = new long[q];
        for (int i = 0; i < q; i++) { user[i] = in.nextInt(); time[i] = in.nextLong(); }

        System.out.println(new String(decide(k, w, user, time)));
    }
${FAST_READER_JAVA}}
`,
};

S.m83 = {
  cpp: `${CPP_HEAD}
/* ops[i] is one command line, exactly as read.
   Return one character per PRINT, in order. */
vector<char> runEditor(const vector<string>& ops) {
    // write your code here

    return vector<char>();
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    vector<string> ops(q);
    {
        char cmd[16];
        static char buf[200005];
        for (int i = 0; i < q; i++) {
            scanf("%s", cmd);
            ops[i] = cmd;
            if (cmd[0] == 'A' || cmd[0] == 'D' || cmd[0] == 'P') {
                scanf("%s", buf);
                ops[i] += ' ';
                ops[i] += buf;
            }
        }
    }

    string out;
    for (char c : runEditor(ops)) { out += c; out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] is one command line. Return one character per PRINT, in order. */
    static char[] runEditor(String[] ops) {
        // write your code here

        return new char[0];
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int q = Integer.parseInt(br.readLine().trim());
        String[] ops = new String[q];
        for (int i = 0; i < q; i++) ops[i] = br.readLine().trim();

        StringBuilder sb = new StringBuilder();
        for (char c : runEditor(ops)) sb.append(c).append('\\n');
        System.out.print(sb);
    }
}
`,
};

S.m84 = {
  cpp: `${CPP_HEAD}
/* constraints[j] = {i, j, type}: type 0 means equal, 1 means differ.
   Return the count of satisfying assignments modulo 1e9+7. */
long long countAssignments(int n, const vector<array<int,3>>& constraints) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<array<int,3>> constraints(m);
    for (auto &c : constraints) scanf("%d %d %d", &c[0], &c[1], &c[2]);

    printf("%lld\\n", countAssignments(n, constraints));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /* constraints[j] = {i, j, type}: type 0 means equal, 1 means differ.
       Return the count of satisfying assignments modulo 1e9+7. */
    static long countAssignments(int n, int[][] constraints) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[][] constraints = new int[m][3];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 3; j++) constraints[i][j] = in.nextInt();

        System.out.println(countAssignments(n, constraints));
    }
${FAST_READER_JAVA}}
`,
};

S.m85 = {
  cpp: `${CPP_HEAD}
long long firstPlayerTotal(const vector<long long>& v) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> v(n);
    for (auto &x : v) scanf("%lld", &x);

    printf("%lld\\n", firstPlayerTotal(v));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long firstPlayerTotal(long[] v) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] v = new long[n];
        for (int i = 0; i < n; i++) v[i] = in.nextLong();

        System.out.println(firstPlayerTotal(v));
    }
${FAST_READER_JAVA}}
`,
};

S.m86 = {
  cpp: `${CPP_HEAD}
// next[i] is the state the machine moves to from state i.
int stateAfter(const vector<int>& next, int start, long long T) {
    // write your code here

    return 0;
}

int main() {
    int n, s;
    long long T;
    if (scanf("%d %d %lld", &n, &s, &T) != 3) return 0;
    vector<int> next(n);
    for (auto &x : next) scanf("%d", &x);

    printf("%d\\n", stateAfter(next, s, T));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // next[i] is the state the machine moves to from state i.
    static int stateAfter(int[] next, int start, long T) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int s = in.nextInt();
        long T = in.nextLong();
        int[] next = new int[n];
        for (int i = 0; i < n; i++) next[i] = in.nextInt();

        System.out.println(stateAfter(next, s, T));
    }
${FAST_READER_JAVA}}
`,
};

S.m87 = {
  cpp: `${CPP_HEAD}
const long long MOD = 1000000007LL;

// p(t) = a * p(t-1) + b * p(t-2), returned modulo 1e9+7.
long long populationAt(long long p0, long long p1, long long a, long long b, long long T) {
    // write your code here

    return 0;
}

int main() {
    long long p0, p1, a, b, T;
    if (scanf("%lld %lld %lld %lld %lld", &p0, &p1, &a, &b, &T) != 5) return 0;

    printf("%lld\\n", populationAt(p0, p1, a, b, T));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static final long MOD = 1000000007L;

    // p(t) = a * p(t-1) + b * p(t-2), returned modulo 1e9+7.
    static long populationAt(long p0, long p1, long a, long b, long T) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        long p0 = in.nextLong();
        long p1 = in.nextLong();
        long a = in.nextLong();
        long b = in.nextLong();
        long T = in.nextLong();

        System.out.println(populationAt(p0, p1, a, b, T));
    }
${FAST_READER_JAVA}}
`,
};

S.m88 = {
  cpp: `${CPP_HEAD}
// How many values in [L, R] have no two adjacent digits equal.
long long countClean(long long L, long long R) {
    // write your code here

    return 0;
}

int main() {
    long long L, R;
    if (scanf("%lld %lld", &L, &R) != 2) return 0;

    printf("%lld\\n", countClean(L, R));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // How many values in [L, R] have no two adjacent digits equal.
    static long countClean(long L, long R) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        long L = in.nextLong();
        long R = in.nextLong();

        System.out.println(countClean(L, R));
    }
${FAST_READER_JAVA}}
`,
};

S.m89 = {
  cpp: `${CPP_HEAD}
long long minDifference(const vector<long long>& w) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> w(n);
    for (auto &x : w) scanf("%lld", &x);

    printf("%lld\\n", minDifference(w));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static long minDifference(long[] w) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] w = new long[n];
        for (int i = 0; i < n; i++) w[i] = in.nextLong();

        System.out.println(minDifference(w));
    }
${FAST_READER_JAVA}}
`,
};

S.m90 = {
  cpp: `${CPP_HEAD}
// Minimum of sum (x[i] - p)^2 over integer positions p.
long long minTotalCost(const vector<long long>& x) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> x(n);
    for (auto &v : x) scanf("%lld", &v);

    printf("%lld\\n", minTotalCost(x));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // Minimum of sum (x[i] - p)^2 over integer positions p.
    static long minTotalCost(long[] x) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] x = new long[n];
        for (int i = 0; i < n; i++) x[i] = in.nextLong();

        System.out.println(minTotalCost(x));
    }
${FAST_READER_JAVA}}
`,
};

S.m91 = {
  cpp: `${CPP_HEAD}
// a has n + 1 entries, every value in 1..n, exactly one value repeated.
// Try to do this without extra space and without modifying a.
int findDuplicate(const vector<int>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n + 1);
    for (auto &x : a) scanf("%d", &x);

    printf("%d\\n", findDuplicate(a));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // a has n + 1 entries, every value in 1..n, exactly one value repeated.
    // Try to do this without extra space and without modifying a.
    static int findDuplicate(int[] a) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] a = new int[n + 1];
        for (int i = 0; i <= n; i++) a[i] = in.nextInt();

        System.out.println(findDuplicate(a));
    }
${FAST_READER_JAVA}}
`,
};

// ------------------------------------------------------- CSES mirrors
// Same I/O as cses.fi, so whatever compiles here pastes straight into the
// CSES submit box.

S.c1 = {
  cpp: `${CPP_HEAD}
// Count the subarrays whose sum is divisible by n (the array's own length).
long long countDivisibleSubarrays(const vector<long long>& a) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<long long> a(n);
    for (auto &x : a) scanf("%lld", &x);

    printf("%lld\\n", countDivisibleSubarrays(a));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // Count the subarrays whose sum is divisible by n (the array's own length).
    static long countDivisibleSubarrays(long[] a) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = in.nextLong();

        System.out.println(countDivisibleSubarrays(a));
    }
${FAST_READER_JAVA}}
`,
};

S.c2 = {
  cpp: `${CPP_HEAD}
/**
 * Assign a room to every booking, using as few rooms as possible.
 * Booking i occupies days a[i]..b[i] inclusive; two bookings can share a room
 * only if one departs STRICTLY before the other arrives.
 *
 * @return room number for each booking, in input order, numbered from 1.
 */
vector<int> assignRooms(const vector<int>& a, const vector<int>& b) {
    // write your code here

    return vector<int>(a.size(), 1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> a(n), b(n);
    for (int i = 0; i < n; i++) scanf("%d %d", &a[i], &b[i]);

    vector<int> room = assignRooms(a, b);
    int k = 0;
    for (int r : room) k = max(k, r);

    string out = to_string(k);
    out += '\\n';
    for (int i = 0; i < n; i++) {
        out += to_string(room[i]);
        out += (i + 1 == n ? '\\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Assign a room to every booking, using as few rooms as possible.
     * Booking i occupies days a[i]..b[i] inclusive; two bookings can share a
     * room only if one departs STRICTLY before the other arrives.
     *
     * Returns the room number for each booking, in input order, from 1.
     */
    static int[] assignRooms(int[] a, int[] b) {
        // write your code here

        int[] room = new int[a.length];
        Arrays.fill(room, 1);
        return room;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] a = new int[n], b = new int[n];
        for (int i = 0; i < n; i++) { a[i] = in.nextInt(); b[i] = in.nextInt(); }

        int[] room = assignRooms(a, b);
        int k = 0;
        for (int r : room) k = Math.max(k, r);

        StringBuilder sb = new StringBuilder();
        sb.append(k).append('\\n');
        for (int i = 0; i < n; i++) sb.append(room[i]).append(i + 1 == n ? '\\n' : ' ');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c3 = {
  cpp: `${CPP_HEAD}
// k[i] is the seconds machine i needs per product. All machines run at once.
long long minTime(const vector<long long>& k, long long t) {
    // write your code here

    return 0;
}

int main() {
    long long n, t;
    if (scanf("%lld %lld", &n, &t) != 2) return 0;
    vector<long long> k(n);
    for (auto &x : k) scanf("%lld", &x);

    printf("%lld\\n", minTime(k, t));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // k[i] is the seconds machine i needs per product. All machines run at once.
    static long minTime(long[] k, long t) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = (int) in.nextLong();
        long t = in.nextLong();
        long[] k = new long[n];
        for (int i = 0; i < n; i++) k[i] = in.nextLong();

        System.out.println(minTime(k, t));
    }
${FAST_READER_JAVA}}
`,
};

S.c4 = {
  cpp: `${CPP_HEAD}
// Split x into k contiguous pieces; minimise the largest piece sum.
long long minLargestPiece(const vector<long long>& x, long long k) {
    // write your code here

    return 0;
}

int main() {
    long long n, k;
    if (scanf("%lld %lld", &n, &k) != 2) return 0;
    vector<long long> x(n);
    for (auto &v : x) scanf("%lld", &v);

    printf("%lld\\n", minLargestPiece(x, k));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // Split x into k contiguous pieces; minimise the largest piece sum.
    static long minLargestPiece(long[] x, long k) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long k = in.nextLong();
        long[] x = new long[n];
        for (int i = 0; i < n; i++) x[i] = in.nextLong();

        System.out.println(minLargestPiece(x, k));
    }
${FAST_READER_JAVA}}
`,
};

S.c5 = {
  cpp: `${CPP_HEAD}
/**
 * h holds the ticket prices, t the customer maximums in arrival order.
 * Each customer takes the dearest remaining ticket costing at most their
 * maximum; that ticket is then gone.
 *
 * @return what each customer pays, or -1 if they get nothing.
 */
vector<int> ticketPrices(vector<int> h, const vector<int>& t) {
    // write your code here

    return vector<int>(t.size(), -1);
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> h(n), t(m);
    for (auto &v : h) scanf("%d", &v);
    for (auto &v : t) scanf("%d", &v);

    string out;
    for (int v : ticketPrices(h, t)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * h holds the ticket prices, t the customer maximums in arrival order.
     * Each customer takes the dearest remaining ticket costing at most their
     * maximum; that ticket is then gone.
     *
     * Returns what each customer pays, or -1 if they get nothing.
     */
    static int[] ticketPrices(int[] h, int[] t) {
        // write your code here

        int[] paid = new int[t.length];
        Arrays.fill(paid, -1);
        return paid;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] h = new int[n], t = new int[m];
        for (int i = 0; i < n; i++) h[i] = in.nextInt();
        for (int i = 0; i < m; i++) t[i] = in.nextInt();

        StringBuilder sb = new StringBuilder();
        for (int v : ticketPrices(h, t)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c6 = {
  cpp: `${CPP_HEAD}
/**
 * boss[i] is the direct boss of employee i, for i in 2..n. boss[1] is 0.
 * Careful: the hierarchy can be a 200000-deep chain, so a recursive DFS
 * will overflow the stack. Use BFS order or an explicit stack.
 *
 * @return the number of subordinates of each employee 1..n.
 */
vector<int> subordinateCounts(const vector<int>& boss) {
    int n = (int)boss.size() - 1;
    // write your code here

    return vector<int>(n + 1, 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> boss(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &boss[i]);

    vector<int> cnt = subordinateCounts(boss);
    string out;
    for (int i = 1; i <= n; i++) { out += to_string(cnt[i]); out += (i == n ? '\\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * boss[i] is the direct boss of employee i, for i in 2..n. boss[1] is 0.
     * Careful: the hierarchy can be a 200000-deep chain, so a recursive DFS
     * will overflow the stack. Use BFS order or an explicit stack.
     *
     * Returns the number of subordinates of each employee 1..n (index 0 unused).
     */
    static int[] subordinateCounts(int[] boss) {
        int n = boss.length - 1;
        // write your code here

        return new int[n + 1];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] boss = new int[n + 1];
        for (int i = 2; i <= n; i++) boss[i] = in.nextInt();

        int[] cnt = subordinateCounts(boss);
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) sb.append(cnt[i]).append(i == n ? '\\n' : ' ');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c7 = {
  cpp: `${CPP_HEAD}
/**
 * adj is the tree's adjacency list over nodes 1..n (index 0 unused).
 * A BFS from every node is O(n^2) and too slow - three passes are enough.
 *
 * @return for each node 1..n, the distance to the node furthest from it.
 */
vector<int> farthestDistances(const vector<vector<int>>& adj) {
    int n = (int)adj.size() - 1;
    // write your code here

    return vector<int>(n + 1, 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b; scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    vector<int> ans = farthestDistances(adj);
    string out;
    for (int v = 1; v <= n; v++) { out += to_string(ans[v]); out += (v == n ? '\\n' : ' '); }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * adj is the tree's adjacency list over nodes 1..n (index 0 unused).
     * A BFS from every node is O(n^2) and too slow - three passes are enough.
     *
     * Returns, for each node 1..n, the distance to the node furthest from it.
     */
    static int[] farthestDistances(List<List<Integer>> adj) {
        int n = adj.size() - 1;
        // write your code here

        return new int[n + 1];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < n - 1; i++) {
            int a = in.nextInt(), b = in.nextInt();
            adj.get(a).add(b);
            adj.get(b).add(a);
        }

        int[] ans = farthestDistances(adj);
        StringBuilder sb = new StringBuilder();
        for (int v = 1; v <= n; v++) sb.append(ans[v]).append(v == n ? '\\n' : ' ');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c8 = {
  cpp: `${CPP_HEAD}
/**
 * boss[i] is the direct boss of employee i, for i in 2..n, and is always
 * smaller than i. queries holds q pairs (a, b).
 *
 * Climbing one step at a time is too slow: the hierarchy can be 200000 deep
 * with 200000 queries.
 *
 * @return the lowest common boss for each query, in order.
 */
vector<int> lowestCommonBosses(const vector<int>& boss,
                               const vector<pair<int, int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 1);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> boss(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &boss[i]);
    vector<pair<int, int>> queries(q);
    for (auto &pr : queries) scanf("%d %d", &pr.first, &pr.second);

    string out;
    for (int v : lowestCommonBosses(boss, queries)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * boss[i] is the direct boss of employee i, for i in 2..n, and is always
     * smaller than i. qa[j] and qb[j] are the j-th query pair.
     *
     * Climbing one step at a time is too slow: the hierarchy can be 200000
     * deep with 200000 queries.
     *
     * Returns the lowest common boss for each query, in order.
     */
    static int[] lowestCommonBosses(int[] boss, int[] qa, int[] qb) {
        // write your code here

        int[] ans = new int[qa.length];
        Arrays.fill(ans, 1);
        return ans;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] boss = new int[n + 1];
        for (int i = 2; i <= n; i++) boss[i] = in.nextInt();
        int[] qa = new int[q], qb = new int[q];
        for (int i = 0; i < q; i++) { qa[i] = in.nextInt(); qb[i] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : lowestCommonBosses(boss, qa, qb)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c9 = {
  cpp: `${CPP_HEAD}
/**
 * grid[r][c] is '.', '#', 'A' or 'B'. Moves are L, R, U, D.
 * Any SHORTEST route is accepted.
 *
 * @return "" if B cannot be reached, otherwise the moves of a shortest route.
 */
string shortestRoute(const vector<string>& grid) {
    // write your code here

    return "";
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<string> grid(n);
    for (int i = 0; i < n; i++) {
        char buf[1024];
        scanf("%s", buf);
        grid[i] = buf;
    }

    string route = shortestRoute(grid);
    if (route.empty()) { printf("NO\\n"); return 0; }
    printf("YES\\n%d\\n%s\\n", (int)route.size(), route.c_str());
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * grid[r] is a row of '.', '#', 'A' or 'B'. Moves are L, R, U, D.
     * Any SHORTEST route is accepted.
     *
     * Returns "" if B cannot be reached, otherwise a shortest route's moves.
     */
    static String shortestRoute(String[] grid) {
        // write your code here

        return "";
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        String[] grid = new String[n];
        for (int i = 0; i < n; i++) grid[i] = in.next();

        String route = shortestRoute(grid);
        if (route.isEmpty()) { System.out.println("NO"); return; }
        System.out.println("YES");
        System.out.println(route.length());
        System.out.println(route);
    }
${FAST_READER_JAVA}}
`,
};

S.c10 = {
  cpp: `${CPP_HEAD}
/**
 * n cities, and roads[i] = {a, b} is an existing two-way road.
 * Any set of new roads that connects everything using the minimum number
 * is accepted.
 *
 * @return the new roads to build.
 */
vector<pair<int, int>> roadsToBuild(int n, const vector<pair<int, int>>& roads) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> roads(m);
    for (auto &r : roads) scanf("%d %d", &r.first, &r.second);

    vector<pair<int, int>> add = roadsToBuild(n, roads);
    string out = to_string((int)add.size());
    out += '\\n';
    for (auto &r : add) {
        out += to_string(r.first);
        out += ' ';
        out += to_string(r.second);
        out += '\\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * n cities; ra[i]-rb[i] is an existing two-way road.
     * Any set of new roads that connects everything using the minimum number
     * is accepted. Return them as an array of {a, b} pairs.
     */
    static int[][] roadsToBuild(int n, int[] ra, int[] rb) {
        // write your code here

        return new int[0][];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] ra = new int[m], rb = new int[m];
        for (int i = 0; i < m; i++) { ra[i] = in.nextInt(); rb[i] = in.nextInt(); }

        int[][] add = roadsToBuild(n, ra, rb);
        StringBuilder sb = new StringBuilder();
        sb.append(add.length).append('\\n');
        for (int[] r : add) sb.append(r[0]).append(' ').append(r[1]).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c11 = {
  cpp: `${CPP_HEAD}
/**
 * Flights are one-way: from[i] -> to[i] costing cost[i].
 * One coupon may halve ONE flight's price, rounded down.
 *
 * @return the cheapest total price from city 1 to city n.
 */
long long cheapestWithDiscount(int n, const vector<int>& from, const vector<int>& to,
                               const vector<long long>& cost) {
    // write your code here

    return 0;
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> from(m), to(m);
    vector<long long> cost(m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &from[i], &to[i], &cost[i]);

    printf("%lld\\n", cheapestWithDiscount(n, from, to, cost));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Flights are one-way: from[i] -> to[i] costing cost[i].
     * One coupon may halve ONE flight's price, rounded down.
     *
     * Returns the cheapest total price from city 1 to city n.
     */
    static long cheapestWithDiscount(int n, int[] from, int[] to, long[] cost) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] from = new int[m], to = new int[m];
        long[] cost = new long[m];
        for (int i = 0; i < m; i++) { from[i] = in.nextInt(); to[i] = in.nextInt(); cost[i] = in.nextLong(); }

        System.out.println(cheapestWithDiscount(n, from, to, cost));
    }
${FAST_READER_JAVA}}
`,
};

S.c12 = {
  cpp: `${CPP_HEAD}
/**
 * before[i] = {a, b} means course a must be completed before course b.
 * Any order satisfying every requirement is accepted.
 *
 * @return a valid order of all n courses, or an empty vector if none exists.
 */
vector<int> courseOrder(int n, const vector<pair<int, int>>& before) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> before(m);
    for (auto &r : before) scanf("%d %d", &r.first, &r.second);

    vector<int> order = courseOrder(n, before);
    if (order.empty()) { printf("IMPOSSIBLE\\n"); return 0; }

    string out;
    for (int i = 0; i < (int)order.size(); i++) {
        out += to_string(order[i]);
        out += (i + 1 == (int)order.size() ? '\\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * a[i] must be completed before b[i].
     * Any order satisfying every requirement is accepted.
     *
     * Returns a valid order of all n courses, or an empty array if none exists.
     */
    static int[] courseOrder(int n, int[] a, int[] b) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] a = new int[m], b = new int[m];
        for (int i = 0; i < m; i++) { a[i] = in.nextInt(); b[i] = in.nextInt(); }

        int[] order = courseOrder(n, a, b);
        if (order.length == 0) { System.out.println("IMPOSSIBLE"); return; }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) sb.append(order[i]).append(i + 1 == order.length ? '\\n' : ' ');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c13 = {
  cpp: `${CPP_HEAD}
/**
 * flights[i] = {a, b} is a one-way flight. The network has no directed cycles.
 * Any route visiting the maximum number of cities is accepted.
 *
 * @return the cities in order, or an empty vector if n is unreachable from 1.
 */
vector<int> longestRoute(int n, const vector<pair<int, int>>& flights) {
    // write your code here

    return {};
}

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<pair<int, int>> flights(m);
    for (auto &f : flights) scanf("%d %d", &f.first, &f.second);

    vector<int> route = longestRoute(n, flights);
    if (route.empty()) { printf("IMPOSSIBLE\\n"); return 0; }

    string out = to_string((int)route.size());
    out += '\\n';
    for (size_t i = 0; i < route.size(); i++) {
        out += to_string(route[i]);
        out += (i + 1 == route.size() ? '\\n' : ' ');
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * a[i] -> b[i] is a one-way flight. The network has no directed cycles.
     * Any route visiting the maximum number of cities is accepted.
     *
     * Returns the cities in order, or an empty array if n is unreachable.
     */
    static int[] longestRoute(int n, int[] a, int[] b) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] a = new int[m], b = new int[m];
        for (int i = 0; i < m; i++) { a[i] = in.nextInt(); b[i] = in.nextInt(); }

        int[] route = longestRoute(n, a, b);
        if (route.length == 0) { System.out.println("IMPOSSIBLE"); return; }

        StringBuilder sb = new StringBuilder();
        sb.append(route.length).append('\\n');
        for (int i = 0; i < route.length; i++) sb.append(route[i]).append(i + 1 == route.length ? '\\n' : ' ');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c15 = {
  cpp: `${CPP_HEAD}
/**
 * t[v] is where planet v's teleporter leads. Each query asks where you land
 * after k teleports from planet x. Note k can be 0, and reaches 1e9.
 *
 * @return the destination for each query, in order.
 */
vector<int> destinations(const vector<int>& t,
                         const vector<pair<int, long long>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 1);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> t(n + 1);
    for (int v = 1; v <= n; v++) scanf("%d", &t[v]);
    vector<pair<int, long long>> queries(q);
    for (auto &qr : queries) scanf("%d %lld", &qr.first, &qr.second);

    string out;
    for (int v : destinations(t, queries)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * t[v] is where planet v's teleporter leads (index 0 unused). Query j asks
     * where you land after k[j] teleports from planet x[j]. k can be 0, and
     * reaches 1e9.
     *
     * Returns the destination for each query, in order.
     */
    static int[] destinations(int[] t, int[] x, long[] k) {
        // write your code here

        return new int[x.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] t = new int[n + 1];
        for (int v = 1; v <= n; v++) t[v] = in.nextInt();
        int[] x = new int[q];
        long[] k = new long[q];
        for (int i = 0; i < q; i++) { x[i] = in.nextInt(); k[i] = in.nextLong(); }

        StringBuilder sb = new StringBuilder();
        for (int v : destinations(t, x, k)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c16 = {
  cpp: `${CPP_HEAD}
const long long MOD = 1000000007LL;

// Ways to make the sum n from dice throws of 1..6, where order matters.
long long countWays(int n) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\\n", countWays(n));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static final long MOD = 1000000007L;

    // Ways to make the sum n from dice throws of 1..6, where order matters.
    static long countWays(int n) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(countWays(in.nextInt()));
    }
${FAST_READER_JAVA}}
`,
};

S.c17 = {
  cpp: `${CPP_HEAD}
// Fewest steps to reach 0, subtracting one digit of the current value each step.
int minSteps(int n) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\\n", minSteps(n));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // Fewest steps to reach 0, subtracting one digit of the current value each step.
    static int minSteps(int n) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(minSteps(in.nextInt()));
    }
${FAST_READER_JAVA}}
`,
};

S.c18 = {
  cpp: `${CPP_HEAD}
/**
 * Book i costs price[i] and has pages[i] pages. Budget is x.
 * Each book may be bought at most once.
 *
 * @return the greatest number of pages affordable.
 */
int maxPages(int x, const vector<int>& price, const vector<int>& pages) {
    // write your code here

    return 0;
}

int main() {
    int n, x;
    if (scanf("%d %d", &n, &x) != 2) return 0;
    vector<int> price(n), pages(n);
    for (auto &v : price) scanf("%d", &v);
    for (auto &v : pages) scanf("%d", &v);

    printf("%d\\n", maxPages(x, price, pages));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Book i costs price[i] and has pages[i] pages. Budget is x.
     * Each book may be bought at most once.
     *
     * Returns the greatest number of pages affordable.
     */
    static int maxPages(int x, int[] price, int[] pages) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), x = in.nextInt();
        int[] price = new int[n], pages = new int[n];
        for (int i = 0; i < n; i++) price[i] = in.nextInt();
        for (int i = 0; i < n; i++) pages[i] = in.nextInt();

        System.out.println(maxPages(x, price, pages));
    }
${FAST_READER_JAVA}}
`,
};

S.c19 = {
  cpp: `${CPP_HEAD}
// Minimum insertions, removals and replacements to turn a into b.
int editDistance(const string& a, const string& b) {
    // write your code here

    return 0;
}

int main() {
    static char bufA[5005], bufB[5005];
    if (scanf("%s", bufA) != 1) return 0;
    if (scanf("%s", bufB) != 1) return 0;

    printf("%d\\n", editDistance(string(bufA), string(bufB)));
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // Minimum insertions, removals and replacements to turn a into b.
    static int editDistance(String a, String b) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        System.out.println(editDistance(in.next(), in.next()));
    }
${FAST_READER_JAVA}}
`,
};

// --- range query set: the I/O loop is written for you, fill in the structure

S.c20 = {
  cpp: `${CPP_HEAD}
/**
 * Handle "1 k u" (SET position k to u) and "2 a b" (sum of a..b), 1-indexed.
 * A prefix-sum array is O(n) to repair per update and too slow.
 *
 * @return the answer to each type-2 query, in order.
 */
vector<long long> answerQueries(vector<long long> x, const vector<array<long long, 3>>& ops) {
    // ops[i] = {type, first, second}
    // write your code here

    return {};
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &x[i]);
    vector<array<long long, 3>> ops;
    for (int i = 0; i < q; i++) {
        long long t, a, b;
        scanf("%lld %lld %lld", &t, &a, &b);
        ops.push_back({ t, a, b });
    }

    string out;
    for (long long v : answerQueries(x, ops)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Handle "1 k u" (SET position k to u) and "2 a b" (sum of a..b), 1-indexed.
     * ops[i] = {type, first, second}. x is 1-indexed (x[0] unused).
     *
     * Returns the answer to each type-2 query, in order.
     */
    static long[] answerQueries(long[] x, long[][] ops) {
        // write your code here

        return new long[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        long[] x = new long[n + 1];
        for (int i = 1; i <= n; i++) x[i] = in.nextLong();
        long[][] ops = new long[q][3];
        for (int i = 0; i < q; i++) { ops[i][0] = in.nextLong(); ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong(); }

        StringBuilder sb = new StringBuilder();
        for (long v : answerQueries(x, ops)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c21 = {
  cpp: `${CPP_HEAD}
/**
 * Handle "1 k u" (SET position k to u) and "2 a b" (MINIMUM over a..b),
 * 1-indexed. Note a Fenwick tree cannot answer this - minimum has no inverse.
 *
 * @return the answer to each type-2 query, in order.
 */
vector<int> answerQueries(vector<int> x, const vector<array<int, 3>>& ops) {
    // ops[i] = {type, first, second}
    // write your code here

    return {};
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &x[i]);
    vector<array<int, 3>> ops;
    for (int i = 0; i < q; i++) {
        int t, a, b;
        scanf("%d %d %d", &t, &a, &b);
        ops.push_back({ t, a, b });
    }

    string out;
    for (int v : answerQueries(x, ops)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Handle "1 k u" (SET position k to u) and "2 a b" (MINIMUM over a..b),
     * 1-indexed. A Fenwick tree cannot answer this - minimum has no inverse.
     * ops[i] = {type, first, second}. x is 1-indexed.
     *
     * Returns the answer to each type-2 query, in order.
     */
    static int[] answerQueries(int[] x, int[][] ops) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] x = new int[n + 1];
        for (int i = 1; i <= n; i++) x[i] = in.nextInt();
        int[][] ops = new int[q][3];
        for (int i = 0; i < q; i++) { ops[i][0] = in.nextInt(); ops[i][1] = in.nextInt(); ops[i][2] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : answerQueries(x, ops)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c22 = {
  cpp: `${CPP_HEAD}
/**
 * Handle "1 a b u" (add u to every position in a..b) and "2 k" (read the
 * value at k), 1-indexed. Values can reach about 2e14, so use 64-bit types.
 *
 * ops[i] = {type, a, b, u} for a range add, or {2, k, 0, 0} for a read.
 *
 * @return the answer to each type-2 query, in order.
 */
vector<long long> answerQueries(vector<long long> x, const vector<array<long long, 4>>& ops) {
    // write your code here

    return {};
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<long long> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%lld", &x[i]);

    vector<array<long long, 4>> ops;
    for (int i = 0; i < q; i++) {
        long long t;
        scanf("%lld", &t);
        if (t == 1) {
            long long a, b, u;
            scanf("%lld %lld %lld", &a, &b, &u);
            ops.push_back({ t, a, b, u });
        } else {
            long long k;
            scanf("%lld", &k);
            ops.push_back({ t, k, 0, 0 });
        }
    }

    string out;
    for (long long v : answerQueries(x, ops)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * Handle "1 a b u" (add u to every position in a..b) and "2 k" (read the
     * value at k), 1-indexed. Values reach about 2e14, so use long.
     *
     * ops[i] = {type, a, b, u} for a range add, or {2, k, 0, 0} for a read.
     *
     * Returns the answer to each type-2 query, in order.
     */
    static long[] answerQueries(long[] x, long[][] ops) {
        // write your code here

        return new long[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        long[] x = new long[n + 1];
        for (int i = 1; i <= n; i++) x[i] = in.nextLong();

        long[][] ops = new long[q][4];
        for (int i = 0; i < q; i++) {
            long t = in.nextLong();
            ops[i][0] = t;
            if (t == 1) { ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong(); ops[i][3] = in.nextLong(); }
            else ops[i][1] = in.nextLong();
        }

        StringBuilder sb = new StringBuilder();
        for (long v : answerQueries(x, ops)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c23 = {
  cpp: `${CPP_HEAD}
/**
 * x is 1-indexed and never changes. Each query asks for the xor of x[a..b].
 *
 * @return the answer to each query, in order.
 */
vector<int> rangeXors(const vector<int>& x, const vector<pair<int, int>>& queries) {
    // write your code here

    return vector<int>(queries.size(), 0);
}

int main() {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> x(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &x[i]);
    vector<pair<int, int>> queries(q);
    for (auto &qr : queries) scanf("%d %d", &qr.first, &qr.second);

    string out;
    for (int v : rangeXors(x, queries)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    /**
     * x is 1-indexed (x[0] unused) and never changes. Query j asks for the
     * xor of x[a[j]..b[j]].
     *
     * Returns the answer to each query, in order.
     */
    static int[] rangeXors(int[] x, int[] a, int[] b) {
        // write your code here

        return new int[a.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] x = new int[n + 1];
        for (int i = 1; i <= n; i++) x[i] = in.nextInt();
        int[] a = new int[q], b = new int[q];
        for (int i = 0; i < q; i++) { a[i] = in.nextInt(); b[i] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : rangeXors(x, a, b)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c24 = {
  cpp: `${CPP_HEAD}
// All queries share one small universe (x <= 1e6) - precompute once.
vector<int> divisorCounts(const vector<int>& xs) {
    // write your code here

    return vector<int>(xs.size(), 0);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    vector<int> xs(n);
    for (auto &v : xs) scanf("%d", &v);

    string out;
    for (int v : divisorCounts(xs)) { out += to_string(v); out += '\\n'; }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    // All queries share one small universe (x <= 1e6) - precompute once.
    static int[] divisorCounts(int[] xs) {
        // write your code here

        return new int[xs.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] xs = new int[n];
        for (int i = 0; i < n; i++) xs[i] = in.nextInt();

        StringBuilder sb = new StringBuilder();
        for (int v : divisorCounts(xs)) sb.append(v).append('\\n');
        System.out.print(sb);
    }
${FAST_READER_JAVA}}
`,
};

S.c25 = {
  cpp: `${CPP_HEAD}
const long long MOD = 1000000007LL;

// a^b mod 1e9+7. Note 0^0 is defined as 1, and products reach ~1e18.
long long power(long long a, long long b) {
    // write your code here

    return 0;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    string out;
    for (int i = 0; i < n; i++) {
        long long a, b;
        scanf("%lld %lld", &a, &b);
        out += to_string(power(a, b));
        out += '\\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {

    static final long MOD = 1000000007L;

    // a^b mod 1e9+7. Note 0^0 is defined as 1, and products reach ~1e18.
    static long power(long a, long b) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            long a = in.nextLong(), b = in.nextLong();
            sb.append(power(a, b)).append('\\n');
        }
        System.out.print(sb);
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
