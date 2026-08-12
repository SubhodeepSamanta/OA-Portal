import java.io.*;
import java.util.*;

public class Main {

    static int[] rangeXors(int[] x, int[] a, int[] b) {
        // write your code here

        return new int[a.length];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] x = new int[n + 1];
        for (int i = 1; i <= n; i++) x[i] = in.nextInt();
        int[] a = new int[q], b = new int[q];
        for (int i = 0; i < q; i++) { a[i] = in.nextInt(); b[i] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : rangeXors(x, a, b)) sb.append(v).append('\n');
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
