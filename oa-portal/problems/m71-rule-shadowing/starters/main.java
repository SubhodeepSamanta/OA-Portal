import java.io.*;
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
