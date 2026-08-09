import java.io.*;
import java.util.*;

public class Main {

    static long[] busiestGate(int m, long[][] grants) {
        // write your code here

        return new long[]{1, 0};
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int m = in.nextInt(), q = in.nextInt();
        long[][] grants = new long[q][3];
        for (int i = 0; i < q; i++) {
            grants[i][0] = in.nextLong();
            grants[i][1] = in.nextLong();
            grants[i][2] = in.nextLong();
        }

        long[] res = busiestGate(m, grants);
        System.out.println(res[0] + " " + res[1]);
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
    }
}
