import java.io.*;
import java.util.*;

public class Main {

    /* One answer per address: the length of the longest rule that is a prefix
       of it, or -1 when none is. */
    static int[] longestMatches(String[] rules, String[] addresses) {
        // write your code here

        int[] res = new int[addresses.length];
        Arrays.fill(res, -1);
        return res;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        String[] rules = new String[n], addresses = new String[q];
        for (int i = 0; i < n; i++) rules[i] = in.next();
        for (int i = 0; i < q; i++) addresses[i] = in.next();

        StringBuilder sb = new StringBuilder();
        for (int v : longestMatches(rules, addresses)) sb.append(v).append('\n');
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
