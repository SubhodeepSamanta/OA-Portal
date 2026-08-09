import java.io.*;
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
