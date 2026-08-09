import java.io.*;
import java.util.*;

public class Main {

    /* start[i] / end[i] describe exam i+1, in input order.
       Return the hall count in result.halls and the hall-1 exam numbers,
       ascending, in result.hall1. */
    static Allocation allocateHalls(long[] start, long[] end) {
        // write your code here

        Allocation r = new Allocation();
        r.halls = 1;
        r.hall1 = new int[] { 1 };
        return r;
    }

    static class Allocation {
        int halls;
        int[] hall1;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[] start = new long[n], end = new long[n];
        for (int i = 0; i < n; i++) { start[i] = in.nextLong(); end[i] = in.nextLong(); }

        Allocation r = allocateHalls(start, end);
        StringBuilder sb = new StringBuilder();
        sb.append(r.halls).append('\n').append(r.hall1.length);
        for (int v : r.hall1) sb.append(' ').append(v);
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
