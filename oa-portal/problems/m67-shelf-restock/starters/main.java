import java.io.*;
import java.util.*;

public class Main {

    /* stock[i] / capacity[i]. Return the best achievable smallest fill ratio,
       in millionths (the ratio times 10^6, rounded down). */
    static long bestMinRatioMillionths(long[] stock, long[] capacity, long T) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long T = in.nextLong();
        long[] stock = new long[n], capacity = new long[n];
        for (int i = 0; i < n; i++) { stock[i] = in.nextLong(); capacity[i] = in.nextLong(); }

        System.out.println(bestMinRatioMillionths(stock, capacity, T));
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
