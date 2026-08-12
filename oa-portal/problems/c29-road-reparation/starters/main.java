import java.io.*;
import java.util.*;

public class Main {

    static long minRepairCost(int n, int[][] roads) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[][] roads = new int[m][3];
        for (int i = 0; i < m; i++) { roads[i][0] = in.nextInt(); roads[i][1] = in.nextInt(); roads[i][2] = in.nextInt(); }

        long ans = minRepairCost(n, roads);
        System.out.println(ans < 0 ? "IMPOSSIBLE" : String.valueOf(ans));
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
