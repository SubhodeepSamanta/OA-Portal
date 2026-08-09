import java.io.*;
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
        for (int v : nearestCommonManagers(n, parent, queries)) sb.append(v).append('\n');
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
