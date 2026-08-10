import java.io.*;
import java.util.*;

public class Main {

    /* flights[i] = {u, v, cost}, one way only. Return -1 if n is unreachable. */
    static long cheapestFare(int n, long[][] flights) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long[][] flights = new long[m][3];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 3; j++) flights[i][j] = in.nextLong();

        System.out.println(cheapestFare(n, flights));
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
