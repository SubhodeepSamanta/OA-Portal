import java.io.*;
import java.util.*;

public class Main {

    static int[] lowestCommonBosses(int[] boss, int[] qa, int[] qb) {
        // write your code here

        int[] ans = new int[qa.length];
        Arrays.fill(ans, 1);
        return ans;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), q = in.nextInt();
        int[] boss = new int[n + 1];
        for (int i = 2; i <= n; i++) boss[i] = in.nextInt();
        int[] qa = new int[q], qb = new int[q];
        for (int i = 0; i < q; i++) { qa[i] = in.nextInt(); qb[i] = in.nextInt(); }

        StringBuilder sb = new StringBuilder();
        for (int v : lowestCommonBosses(boss, qa, qb)) sb.append(v).append('\n');
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
