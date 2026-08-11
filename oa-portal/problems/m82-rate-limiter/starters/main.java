import java.io.*;
import java.util.*;

public class Main {

    /* user[i] / time[i], timestamps non-decreasing.
       Return '1' where the request is accepted and '0' where rejected. */
    static char[] decide(long k, long w, int[] user, long[] time) {
        // write your code here

        char[] r = new char[user.length];
        Arrays.fill(r, '0');
        return r;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int q = in.nextInt();
        long k = in.nextLong(), w = in.nextLong();
        int[] user = new int[q];
        long[] time = new long[q];
        for (int i = 0; i < q; i++) { user[i] = in.nextInt(); time[i] = in.nextLong(); }

        System.out.println(new String(decide(k, w, user, time)));
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
