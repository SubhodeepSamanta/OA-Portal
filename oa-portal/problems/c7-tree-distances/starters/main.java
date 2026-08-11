import java.io.*;
import java.util.*;

public class Main {

    static int[] farthestDistances(List<List<Integer>> adj) {
        int n = adj.size() - 1;
        // write your code here

        return new int[n + 1];
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < n - 1; i++) {
            int a = in.nextInt(), b = in.nextInt();
            adj.get(a).add(b);
            adj.get(b).add(a);
        }

        int[] ans = farthestDistances(adj);
        StringBuilder sb = new StringBuilder();
        for (int v = 1; v <= n; v++) sb.append(ans[v]).append(v == n ? '\n' : ' ');
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
