import java.io.*;
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
        for (boolean ok : runOperations(n, parent, ops)) sb.append(ok ? "true" : "false").append('\n');
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
