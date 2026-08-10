import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] = {type, player, score}: type 1 is UPDATE (score is meaningful),
       type 0 is RANK (score is 0 and unused).
       Return one answer per RANK operation, in order. */
    static long[] answerRanks(int n, long[][] ops) {
        // write your code here

        return new long[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        long[][] ops = new long[q][3];
        for (int i = 0; i < q; i++) {
            String w = in.next();
            if (w.charAt(0) == 'U') { ops[i][0] = 1; ops[i][1] = in.nextLong(); ops[i][2] = in.nextLong(); }
            else { ops[i][0] = 0; ops[i][1] = in.nextLong(); }
        }

        StringBuilder sb = new StringBuilder();
        for (long v : answerRanks(n, ops)) sb.append(v).append('\n');
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
