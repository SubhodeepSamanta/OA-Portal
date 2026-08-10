import java.io.*;
import java.util.*;

public class Main {

    /* Return the fewest sites to open, or -1 if some customer cannot be served. */
    static int minWarehouses(long[][] sites, long[][] customers, long d) {
        // write your code here

        return -1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        long d = in.nextLong();
        long[][] sites = new long[n][2], customers = new long[m][2];
        for (int i = 0; i < n; i++) { sites[i][0] = in.nextLong(); sites[i][1] = in.nextLong(); }
        for (int i = 0; i < m; i++) { customers[i][0] = in.nextLong(); customers[i][1] = in.nextLong(); }

        System.out.println(minWarehouses(sites, customers, d));
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
