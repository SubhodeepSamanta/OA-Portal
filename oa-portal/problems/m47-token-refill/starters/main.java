import java.io.*;
import java.util.*;

public class Main {

    /* time[i] / need[i], times strictly increasing.
       The bucket holds at most C and starts full at time 0. */
    static int servedCount(long C, long[] time, long[] need) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long C = in.nextLong();
        long[] time = new long[n], need = new long[n];
        for (int i = 0; i < n; i++) { time[i] = in.nextLong(); need[i] = in.nextLong(); }

        System.out.println(servedCount(C, time, need));
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
