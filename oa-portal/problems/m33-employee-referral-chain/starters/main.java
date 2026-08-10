import java.io.*;
import java.util.*;

public class Main {

    /* f[i] is the person employee i referred, for i from 1 to n; f[0] is unused.
       Return chain sizes for employees 1..n, counting the employee themselves. */
    static long[] chainSizes(int n, int[] f) {
        // write your code here

        long[] res = new long[n];
        Arrays.fill(res, 1);
        return res;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] f = new int[n + 1];
        for (int i = 1; i <= n; i++) f[i] = in.nextInt();

        long[] res = chainSizes(n, f);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.length; i++) { if (i > 0) sb.append(' '); sb.append(res[i]); }
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
