import java.io.*;
import java.util.*;

public class Main {

    static int[] findNegativeCycle(int n, int[] ea, int[] eb, long[] ec) {
        // write your code here

        return new int[0];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt(), m = in.nextInt();
        int[] ea = new int[m], eb = new int[m];
        long[] ec = new long[m];
        for (int i = 0; i < m; i++) { ea[i] = in.nextInt(); eb[i] = in.nextInt(); ec[i] = in.nextLong(); }

        int[] cycle = findNegativeCycle(n, ea, eb, ec);
        if (cycle.length == 0) { System.out.println("NO"); return; }

        StringBuilder sb = new StringBuilder("YES\n");
        for (int i = 0; i < cycle.length; i++) sb.append(cycle[i]).append(i + 1 == cycle.length ? '\n' : ' ');
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
