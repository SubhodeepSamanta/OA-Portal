import java.io.*;
import java.util.*;

public class Main {

    /* p[i] is ticket i+1's priority. Return the ticket NUMBERS in resolution order. */
    static int[] resolutionOrder(long[] p) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] p = new long[n];
        for (int i = 0; i < n; i++) p[i] = in.nextLong();

        int[] order = resolutionOrder(p);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < order.length; i++) { if (i > 0) sb.append(' '); sb.append(order[i]); }
        sb.append('\n');
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
