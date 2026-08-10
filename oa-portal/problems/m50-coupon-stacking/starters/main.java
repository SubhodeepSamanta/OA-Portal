import java.io.*;
import java.util.*;

public class Main {

    /* Return the minimum total spend in PAISE (1 rupee = 100 paise). */
    static long minSpendPaise(long[] prices, long[] discounts) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[] prices = new long[n], discounts = new long[m];
        for (int i = 0; i < n; i++) prices[i] = in.nextLong();
        for (int i = 0; i < m; i++) discounts[i] = in.nextLong();

        System.out.println(minSpendPaise(prices, discounts));
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
