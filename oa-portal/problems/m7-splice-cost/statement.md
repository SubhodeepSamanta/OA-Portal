# Splice Cost

A telemetry pipeline records a signal as a sequence of `n` integer samples, in order. Positive samples represent gain, negative samples represent loss.

Before the signal is published, quality control performs a **splice**: exactly one sample is cut out of the recording and the two remaining halves are joined back together. This is mandatory — the hardware is known to corrupt precisely one sample per capture, so one sample always has to go, even when every sample looks healthy. Which sample is cut is your choice.

After the splice the recording has `n − 1` samples. An analyst then selects the **strongest segment** of the spliced recording: a contiguous, non-empty run of samples with the largest possible sum. Note that once the splice has happened, the two halves are genuinely joined — a segment may run straight across the cut point, using samples from before and after the removed sample as though they had always been adjacent.

You choose the splice; the analyst then gets the best segment that choice allows. Choose the splice that makes the analyst's number as large as possible.

## Task

Delete **exactly one** sample from the sequence, then report the **maximum sum of any contiguous non-empty segment** of what remains, maximised over every possible choice of deleted sample.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

- `n` — the number of samples
- `a[i]` — the `i`-th sample

## Output

A single integer: the largest achievable segment sum after deleting exactly one sample.

## Constraints

```
2  ≤  n  ≤  2 · 10^5
-10^4  ≤  a[i]  ≤  10^4
```

## Sample 1

**Input**
```
5
1 -2 0 3 -1
```

**Output**
```
4
```

**Explanation**

Cut the sample `-2` at position 2. The recording becomes `1, 0, 3, -1`, and the strongest segment is `1, 0, 3` with sum **4** — a segment that runs straight across the cut.

No other choice does better. Cutting `-1` leaves `1, -2, 0, 3` whose best segment is `0, 3 = 3`. Cutting `1` leaves `-2, 0, 3, -1` whose best segment is `0, 3 = 3`.

## Sample 2

**Input**
```
2
-5 -3
```

**Output**
```
-3
```

**Explanation**

The splice is mandatory even though both samples are negative. Cutting `-5` leaves the single sample `-3`; cutting `-3` leaves the single sample `-5`.

The segment must be non-empty, so the analyst has no choice in either case. Cutting `-5` gives the better result, `-3`.

## Sample 3

**Input**
```
6
-1 -2 -3 -4 -5 -6
```

**Output**
```
-1
```

**Explanation**

Every sample is negative, so the strongest segment is always a single sample and we want the largest one, `-1`, to survive the splice. Cutting any other sample leaves `-1` in place, and the answer is `-1`.

## Notes

- The deleted sample does **not** have to lie inside the segment the analyst eventually picks. If the best segment naturally avoids one end of the recording, you can simply splice out a sample from the other end and leave that segment untouched.
- Because the splice is mandatory, the answer is **not** always just the best segment of the original recording. Sample 2 shows the case where the whole recording is the best segment and you are still forced to break it.
- The segment must be non-empty. With `n = 2` exactly one sample survives and that sample is the answer.
- Sums across the whole recording can reach two billion in magnitude, which is at the edge of a 32-bit signed integer. Choose your type deliberately.
