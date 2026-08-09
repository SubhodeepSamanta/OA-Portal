# Server Heartbeat Windows

Every server in a fleet emits a heartbeat once per second carrying a single number: the load on that machine at that instant. A collector stitches the fleet's heartbeats into one chronological stream, so the stream is simply `n` readings, one per second, in time order.

The alerting engine does not react to instantaneous spikes — a single loaded second is normal and paging an engineer for it would be noise. Instead it reasons over a **fixed observation window** of `w` consecutive seconds. The engine slides this window along the stream one second at a time. Starting with seconds `1 … w`, then `2 … w+1`, and so on, until the window's right edge reaches the final reading.

For each position of the window the engine records one value: the **peak load** observed anywhere inside that window. Those peaks are what the dashboard plots, and what downstream rules threshold against.

The collector has handed you a full day of stream data and needs the peak series computed.

## Task

Given the stream of `n` readings and the window width `w`, output the peak reading for every window position, in order from the leftmost window to the rightmost.

There are exactly `n − w + 1` window positions.

## Input

```
Line 1:  n  w
Line 2:  a[1] a[2] ... a[n]
```

- `n` — number of readings in the stream
- `w` — width of the observation window, in seconds
- `a[i]` — the load reported at second `i`

## Output

`n − w + 1` integers separated by single spaces, on one line: the peak of window `1..w`, then window `2..w+1`, and so on.

A trailing newline is fine. Extra or missing whitespace between numbers is not checked strictly, but the count and order of the numbers must be exact.

## Constraints

```
1  ≤  w  ≤  n  ≤  10^6
0  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
8 3
1 3 0 2 5 3 6 7
```

**Output**
```
3 3 5 5 6 7
```

**Explanation**

| Window | Readings | Peak |
|---|---|---|
| seconds 1–3 | `1 3 0` | 3 |
| seconds 2–4 | `3 0 2` | 3 |
| seconds 3–5 | `0 2 5` | 5 |
| seconds 4–6 | `2 5 3` | 5 |
| seconds 5–7 | `5 3 6` | 6 |
| seconds 6–8 | `3 6 7` | 7 |

Six windows, six peaks.

## Sample 2

**Input**
```
5 1
4 2 9 1 7
```

**Output**
```
4 2 9 1 7
```

**Explanation**

With `w = 1` every window holds a single reading, so each peak is just that reading and the output reproduces the stream.

## Notes

- `w` may equal `n`, in which case there is exactly one window covering the whole stream and the output is a single number.
- The stream can be a full day at one-second resolution, so both the input and the output are large. Reading and writing with an unbuffered stream can, on its own, cost more than the time limit allows.
- Recomputing the maximum of each window from scratch performs on the order of `n · w` work. At the upper limits that is far beyond what will finish in time. The intended approach never rescans a window.
