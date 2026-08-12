import java.io.*;
import java.util.*;

public class Main {

    // Largest gcd over all pairs at distinct positions. Values repeat, and a
    // pair of two EQUAL values is a valid pair.
    static int maxPairGcd(int[] x) {
        // write your code here

        return 1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] x = new int[n];
        for (int i = 0; i < n; i++) x[i] = in.nextInt();

        System.out.println(maxPairGcd(x));
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
