import java.io.*;
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
        sb.append('\n');
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
