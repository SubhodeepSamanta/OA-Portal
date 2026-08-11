import java.io.*;
import java.util.*;

public class Main {

    /* constraints[j] = {i, j, type}: type 0 means equal, 1 means differ.
       Return the count of satisfying assignments modulo 1e9+7. */
    static long countAssignments(int n, int[][] constraints) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[][] constraints = new int[m][3];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < 3; j++) constraints[i][j] = in.nextInt();

        System.out.println(countAssignments(n, constraints));
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
