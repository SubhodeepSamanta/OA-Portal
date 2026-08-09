import java.io.*;
import java.util.*;

public class Main {

    /* offers[i] = {u, v, p, q}: 1 unit of u becomes p/q units of v, one way only.
       Return true if you can end up holding more than 1 unit of currency 1. */
    static boolean canProfit(int n, long[][] offers) {
        // write your code here

        return false;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[][] offers = new long[m][4];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 4; j++) offers[i][j] = in.nextLong();

        System.out.println(canProfit(n, offers) ? "YES" : "NO");
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
