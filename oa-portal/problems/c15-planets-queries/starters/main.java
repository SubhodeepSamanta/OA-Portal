import java.io.*;
import java.util.*;

public class Main {

    static int[] destinations(int[] t, int[] x, long[] k) {
        // write your code here

        return new int[x.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] t = new int[n + 1];
        for (int v = 1; v <= n; v++) t[v] = in.nextInt();
        int[] x = new int[q];
        long[] k = new long[q];
        for (int i = 0; i < q; i++) { x[i] = in.nextInt(); k[i] = in.nextLong(); }

        StringBuilder sb = new StringBuilder();
        for (int v : destinations(t, x, k)) sb.append(v).append('\n');
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
