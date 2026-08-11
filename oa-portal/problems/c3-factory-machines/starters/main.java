import java.io.*;
import java.util.*;

public class Main {

    // k[i] is the seconds machine i needs per product. All machines run at once.
    static long minTime(long[] k, long t) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = (int) in.nextLong();
        long t = in.nextLong();
        long[] k = new long[n];
        for (int i = 0; i < n; i++) k[i] = in.nextLong();

        System.out.println(minTime(k, t));
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
