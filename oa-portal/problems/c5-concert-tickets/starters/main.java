import java.io.*;
import java.util.*;

public class Main {

    static int[] ticketPrices(int[] h, int[] t) {
        // write your code here

        int[] paid = new int[t.length];
        Arrays.fill(paid, -1);
        return paid;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] h = new int[n], t = new int[m];
        for (int i = 0; i < n; i++) h[i] = in.nextInt();
        for (int i = 0; i < m; i++) t[i] = in.nextInt();

        StringBuilder sb = new StringBuilder();
        for (int v : ticketPrices(h, t)) sb.append(v).append('\n');
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
