import java.io.*;
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
        sb.append(groups.length).append('\n');
        for (long[] g : groups) sb.append(g[0]).append(' ').append(g[1]).append(' ').append(g[2]).append('\n');
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
