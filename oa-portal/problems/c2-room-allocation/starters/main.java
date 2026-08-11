import java.io.*;
import java.util.*;

public class Main {

    static int[] assignRooms(int[] a, int[] b) {
        // write your code here

        int[] room = new int[a.length];
        Arrays.fill(room, 1);
        return room;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        int[] a = new int[n], b = new int[n];
        for (int i = 0; i < n; i++) { a[i] = in.nextInt(); b[i] = in.nextInt(); }

        int[] room = assignRooms(a, b);
        int k = 0;
        for (int r : room) k = Math.max(k, r);

        StringBuilder sb = new StringBuilder();
        sb.append(k).append('\n');
        for (int i = 0; i < n; i++) sb.append(room[i]).append(i + 1 == n ? '\n' : ' ');
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
