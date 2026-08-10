import java.io.*;
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
        for (int v : clustersAfterEachRemoval(n, cables, events)) sb.append(v).append('\n');
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
