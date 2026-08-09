# Bandwidth Throttle

A build server has to push `n` artefact files out to a mirror. The files sit in an upload **queue** and the dispatcher hands them out in queue order — file `1` first, then file `2`, and so on. File `i` is `s[i]` megabytes.

There are `k` identical outbound links. The dispatcher works like this: it walks the queue from front to back and gives each link a **consecutive run** of files. Link `1` takes files `1 … i₁`, link `2` takes files `i₁+1 … i₂`, and so on until the queue is empty. A link may be given no files at all, but no link ever receives a file from the middle of another link's run — the queue is only ever cut, never interleaved.

Every link then works through its own run **one file at a time**, at exactly 1 MB per second. All links start at time 0 and run in parallel.

You control where the cuts go.

## Task

Choose the cut points so that the moment **all** files have finished uploading is as early as possible, and report that moment in seconds.

## Input

```
Line 1:  n  k
Line 2:  s[1] s[2] ... s[n]
```

## Output

A single integer: the earliest possible time, in seconds, at which every file has finished.

## Constraints

```
1  ≤  k  ≤  n  ≤  2 · 10^5
1  ≤  s[i]  ≤  10^9
```

## Sample 1

**Input**
```
6 3
3 1 4 1 5 9
```

**Output**
```
9
```

**Explanation**

Cut the queue as `3 1 4 1 | 5 | 9`. The three links carry 9 MB, 5 MB and 9 MB, so they finish at seconds 9, 5 and 9. Everything is done at second **9**.

No arrangement beats this: file 6 alone is 9 MB, and whichever link carries it needs 9 seconds no matter what else it does.

## Sample 2

**Input**
```
5 1
2 2 2 2 2
```

**Output**
```
10
```

**Explanation**

One link, so there is nothing to choose — it carries all 10 MB.

## Sample 3

**Input**
```
4 4
7 3 9 1
```

**Output**
```
9
```

**Explanation**

With as many links as files, every file gets its own link and they all run at once. The slowest is the 9 MB file.

## Notes

- Two quantities bracket the answer immediately, and you should write them down before you write any code: the answer can never be below the largest single file, and it can never be above the sum of all of them.
- Testing one candidate finishing time is much easier than searching for the best one directly. Ask "with a deadline of `T` seconds, what is the *fewest* links this queue can be served by?" — that question has a one-pass answer, and its answer moves in one direction only as `T` grows.
- `n` and `s[i]` are both large. The total is up to `2 · 10^14`, which does not fit in a 32-bit integer.
