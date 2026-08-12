import java.io.*;
import java.util.*;

public class Main {

    static int[] borderLengths(String s) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int[] borders = borderLengths(in.next());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < borders.length; i++) {
            sb.append(borders[i]);
            if (i + 1 < borders.length) sb.append(' ');
        }
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
