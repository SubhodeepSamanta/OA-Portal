import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] = {type, v, x}: type 1 is EDIT (x is the character code), type 0
       is QUERY (x is k). Return one character per QUERY, in order. */
    static char[] answerQueries(int[][] ops) {
        // write your code here

        return new char[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int q = in.nextInt();
        int[][] ops = new int[q][3];
        for (int i = 0; i < q; i++) {
            String w = in.next();
            if (w.charAt(0) == 'E') { ops[i][0] = 1; ops[i][1] = in.nextInt(); ops[i][2] = in.next().charAt(0); }
            else { ops[i][0] = 0; ops[i][1] = in.nextInt(); ops[i][2] = in.nextInt(); }
        }

        StringBuilder sb = new StringBuilder();
        for (char c : answerQueries(ops)) sb.append(c).append('\n');
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
