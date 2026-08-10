import java.io.*;
import java.util.*;

public class Main {

    /* Each post is one whole line and may contain spaces. */
    static int distinctPosts(String[] posts) {
        // write your code here

        return 0;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine().trim());
        String[] posts = new String[n];
        for (int i = 0; i < n; i++) {
            String line = br.readLine();
            posts[i] = line == null ? "" : line;
        }

        System.out.println(distinctPosts(posts));
    }
}
