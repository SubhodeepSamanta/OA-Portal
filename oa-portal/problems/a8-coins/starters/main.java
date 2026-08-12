import java.io.*;
import java.util.*;

public class Main {

    static double probabilityMoreHeads(double[] p) {
        // write your code here

        return 0.0;
    }

    public static void main(String[] args) throws IOException {
        FastReader in = new FastReader();
        int n = in.nextInt();
        double[] p = new double[n];
        for (int i = 0; i < n; i++) p[i] = Double.parseDouble(in.next());

        // an absolute error up to 1e-9 is accepted, so print plenty of digits.
        // Locale.US keeps the decimal point a '.' whatever the machine is set to.
        System.out.println(String.format(Locale.US, "%.10f", probabilityMoreHeads(p)));
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
