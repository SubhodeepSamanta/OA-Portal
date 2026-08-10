import java.io.*;
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
