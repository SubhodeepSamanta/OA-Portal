import java.io.*;
import java.util.*;

public class Main {

    /* layers[i] = {x1, y1, x2, y2}, half-open. The last one is on top.
       Count the pixels covered by the top layer and by no other. */
    static long exclusiveTopArea(long[][] layers) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        long[][] layers = new long[n][4];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < 4; j++) layers[i][j] = in.nextLong();

        System.out.println(exclusiveTopArea(layers));
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
