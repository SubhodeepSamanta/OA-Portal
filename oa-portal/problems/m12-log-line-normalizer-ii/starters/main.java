import java.io.*;
import java.util.*;

public class Main {

    static long minCost(String s, long p, long q, long r) {
        // write your code here
        // return -1 if the log can never be made well-formed

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        String s = in.next();
        long p = in.nextLong(), q = in.nextLong(), r = in.nextLong();

        System.out.println(minCost(s, p, q, r));
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
