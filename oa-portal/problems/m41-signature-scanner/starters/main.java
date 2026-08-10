import java.io.*;
import java.util.*;

public class Main {

    /* Return every 1-based start position where p occurs in s, increasing.
       Overlapping occurrences all count. */
    static int[] findOccurrences(String p, String s) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        String p = in.next(), s = in.next();

        int[] hits = findOccurrences(p, s);
        StringBuilder sb = new StringBuilder();
        sb.append(hits.length).append('\n');
        for (int i = 0; i < hits.length; i++) { if (i > 0) sb.append(' '); sb.append(hits[i]); }
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
