import java.io.*;
import java.util.*;

public class Main {

    static final long MOD = 1000000007L;

    // p(t) = a * p(t-1) + b * p(t-2), returned modulo 1e9+7.
    static long populationAt(long p0, long p1, long a, long b, long T) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        long p0 = in.nextLong();
        long p1 = in.nextLong();
        long a = in.nextLong();
        long b = in.nextLong();
        long T = in.nextLong();

        System.out.println(populationAt(p0, p1, a, b, T));
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
