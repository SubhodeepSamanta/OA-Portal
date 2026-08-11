import java.io.*;
import java.util.*;

public class Main {

    /* ops[i] is one command line. Return one character per PRINT, in order. */
    static char[] runEditor(String[] ops) {
        // write your code here

        return new char[0];
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int q = Integer.parseInt(br.readLine().trim());
        String[] ops = new String[q];
        for (int i = 0; i < q; i++) ops[i] = br.readLine().trim();

        StringBuilder sb = new StringBuilder();
        for (char c : runEditor(ops)) sb.append(c).append('\n');
        System.out.print(sb);
    }
}
