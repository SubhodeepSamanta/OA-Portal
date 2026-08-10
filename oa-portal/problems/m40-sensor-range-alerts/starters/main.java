import java.io.*;
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
        for (long v : answerMaxQueries(a, ops)) sb.append(v).append('\n');
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
        String next() throws IOException {
            int b = in.read();
            while (b <= ' ') b = in.read();
            StringBuilder sb = new StringBuilder();
            while (b > ' ') { sb.append((char) b); b = in.read(); }
            return sb.toString();
        }
    }
}
