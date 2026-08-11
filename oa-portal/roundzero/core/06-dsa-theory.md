# DSA theory MCQs

This is **not** the coding track — the Question Bank handles that. This sheet is the  
*theory* that appears as MCQs in written tests and as quick-fire interview questions:  
complexities, properties, and "which data structure would you use".

---

## The complexity table — learn it cold

### Sorting

| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | ✓ |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | ✗ |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | ✓ |
| **Merge** | O(n log n) | O(n log n) | **O(n log n)** | **O(n)** | ✓ |
| **Quick** | O(n log n) | O(n log n) | **O(n²)** | O(log n) | ✗ |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | ✗ |
| Counting | O(n+k) | O(n+k) | O(n+k) | O(k) | ✓ |

**The three facts most asked:**

- **Quick sort's worst case is O(n²)** — when the pivot is always the smallest or largest
  element (e.g. an already-sorted array with a first-element pivot). Randomised pivots avoid it in practice.
- **Merge sort is O(n log n) in all cases** but needs O(n) extra space. It is the stable
  choice and the one used for linked lists.
- **A "stable" sort preserves the relative order of equal elements.** Merge, insertion and
  bubble are stable; quick, selection and heap are not.

> Quick sort is usually *faster in practice* than merge sort despite the worse bound —
> better cache locality and no extra allocation. Say this if asked which you would use.

### Searching

| Algorithm | Time | Requires |
|---|---|---|
| Linear search | O(n) | nothing |
| **Binary search** | **O(log n)** | a **sorted** array |

### Data structure operations

| Structure | Access | Search | Insert | Delete |
|---|---|---|---|---|
| Array | **O(1)** | O(n) | O(n) | O(n) |
| Linked list | O(n) | O(n) | **O(1)**\* | **O(1)**\* |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| **Hash table** | — | **O(1)** avg, O(n) worst | O(1) avg | O(1) avg |
| BST (balanced) | O(log n) | O(log n) | O(log n) | O(log n) |
| BST (skewed) | O(n) | O(n) | O(n) | O(n) |
| Heap | O(1) for min/max | O(n) | O(log n) | O(log n) |

\* once you already hold a pointer to the position.

---

## Array vs linked list

| | Array | Linked list |
|---|---|---|
| Memory | contiguous | scattered, connected by pointers |
| Size | fixed at allocation | dynamic |
| Access | O(1) random access by index | O(n) sequential only |
| Insert/delete in the middle | O(n) — must shift | O(1) with a pointer |
| Extra memory | none | a pointer per node |
| Cache performance | **good** (locality) | poor |

---

## Stack and queue

**Stack — LIFO.** Push, pop, peek, isEmpty. Uses: function call stack, undo, expression evaluation, backtracking, DFS, balanced-parenthesis checking.

**Queue — FIFO.** Enqueue, dequeue, front, rear. Uses: scheduling, BFS, printer queues, buffers.

**Variants:** circular queue (reuses freed space), deque (insert/remove at both ends), priority queue (served by priority, usually a heap).

> **Classic question: implement a queue using two stacks.** Push onto stack1. To dequeue, if
> stack2 is empty, pop everything from stack1 into stack2 (reversing the order), then pop
> from stack2. Amortised O(1).

---

## Trees

- **Binary tree** — each node has at most 2 children.
- **BST** — left subtree < node < right subtree. **In-order traversal of a BST gives sorted
  order** — the single most-asked tree fact.
- **AVL tree** — self-balancing BST; the height difference between subtrees is at most 1.
- **Complete binary tree** — every level filled except possibly the last, which fills left to
  right. This is what makes array-backed heaps work.
- **Full binary tree** — every node has 0 or 2 children.

**Traversals:**

| Traversal | Order | Use |
|---|---|---|
| **In-order** | Left → **Root** → Right | sorted output from a BST |
| **Pre-order** | **Root** → Left → Right | copying a tree, prefix expressions |
| **Post-order** | Left → Right → **Root** | deleting a tree, postfix expressions |
| **Level-order** | breadth-first, by level | uses a **queue** |

**Formulas for a binary tree of height h** (root at height 0):
- Maximum nodes = 2^(h+1) − 1
- Maximum nodes at level l = 2^l
- Minimum height with n nodes = ⌊log₂ n⌋

---

## Heap

A **complete binary tree** with the heap property:

- **Min-heap:** parent ≤ children → the minimum is at the root
- **Max-heap:** parent ≥ children → the maximum is at the root

Stored in an array: for index `i`, children are at `2i+1` and `2i+2`, parent at `(i−1)/2`.

**Insert / delete: O(log n). Find min or max: O(1). Building a heap from n elements: O(n)** — that last one surprises people, and it is asked.

Used for: priority queues, heap sort, finding the k largest elements.

---

## Hashing

**Hash function** maps a key to an index. **Collision** = two keys mapping to the same index.

**Resolution methods:**

| Method | How |
|---|---|
| **Chaining** | each bucket holds a linked list of entries |
| **Open addressing — linear probing** | try the next slot; suffers *clustering* |
| **Open addressing — quadratic probing** | try i² slots away |
| **Double hashing** | use a second hash function for the step size |

**Load factor** = entries ÷ buckets. Above ~0.75 most implementations resize and rehash.

**Worst case is O(n)** when every key collides — which is why hash functions and resizing matter.

---

## Graphs

**Representations:**

| | Adjacency matrix | Adjacency list |
|---|---|---|
| Space | O(V²) | O(V + E) |
| Edge lookup | O(1) | O(degree) |
| Best for | dense graphs | **sparse graphs** (the usual case) |

**Traversals:**

- **BFS** — uses a **queue**, explores level by level. Finds the **shortest path in an
  unweighted graph**. O(V + E).
- **DFS** — uses a **stack** (or recursion), goes deep first. Used for cycle detection,
  topological sort, connected components. O(V + E).

**Shortest path algorithms:**

| Algorithm | Handles | Complexity |
|---|---|---|
| **Dijkstra** | non-negative weights | O((V+E) log V) with a heap |
| **Bellman–Ford** | **negative** weights, detects negative cycles | O(VE) |
| **Floyd–Warshall** | all pairs | O(V³) |

**Minimum spanning tree:** **Kruskal** (sort edges, union–find) and **Prim** (grow from a start vertex). Both O(E log V).

> **Dijkstra fails with negative edge weights** — use Bellman–Ford. Asked directly.

---

## "Which data structure would you use?"

| Problem | Answer |
|---|---|
| Undo functionality | stack |
| Browser back button | stack |
| BFS / job scheduling | queue |
| Autocomplete, prefix search | **trie** |
| Fast key lookup | hash table |
| k largest elements | heap |
| Sorted data with fast insert | balanced BST |
| Shortest path, unweighted | BFS |
| Shortest path, weighted | Dijkstra |
| LRU cache | **hash map + doubly linked list** |
| Detect a cycle in a linked list | **Floyd's slow/fast pointers** |

That LRU cache answer is asked often enough to be worth memorising as a pair.

---

## Big-O basics

- **O(1)** < **O(log n)** < **O(n)** < **O(n log n)** < **O(n²)** < **O(2ⁿ)** < **O(n!)**
- Drop constants and lower-order terms: O(3n² + 5n + 2) = **O(n²)**
- **Big-O** = upper bound, **Big-Ω** = lower bound, **Big-Θ** = tight bound

---

## Full question bank

### Complexity

**What is amortised complexity?**  
The average cost per operation over a worst-case *sequence*. A dynamic array's `push` is O(n) when it resizes but **O(1) amortised**, because doubling means resizes are rare.

**Best, average and worst case of quick sort — and when does the worst occur?**  
O(n log n), O(n log n), O(n²). The worst case occurs when the pivot is consistently the smallest or largest element — e.g. an already-sorted array with a first-element pivot.

**Which sorting algorithm would you use for a linked list, and why?**  
**Merge sort.** It needs no random access and can be done with O(1) extra space on a list by relinking nodes. Quick sort's partitioning depends on random access.

**Which sort is best for a nearly sorted array?**  
**Insertion sort** — O(n) in the best case, and it is adaptive.

**What is an in-place algorithm?**  
One using O(1) extra space. Quick sort, heap sort, bubble, selection and insertion are in-place; merge sort is not.

**What is a stable sort and why does it matter?**  
It preserves the relative order of equal elements. It matters when sorting by a second key after a first — sorting by name then by department keeps names ordered within a department only if the second sort is stable.

**Space complexity of recursion?**  
O(depth) for the call stack. Recursive Fibonacci is O(n) space and O(2ⁿ) time; recursive binary search is O(log n) space.

**What is the master theorem used for?**  
Solving divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n). Merge sort is  
T(n) = 2T(n/2) + O(n) → **O(n log n)**.

### Arrays and strings

**How does a dynamic array grow?**  
When full it allocates a larger array (usually double) and copies. Copying is O(n) but amortises to O(1) per insertion.

**How do you reverse an array in place?**  
Two pointers from both ends, swapping and moving inward until they meet. O(n) time, O(1) space.

**How do you find a duplicate in an array of n+1 integers in the range 1..n?**  
**Floyd's cycle detection** treating values as pointers — O(n) time, O(1) space. Or sum/XOR tricks for restricted variants.

**How do you find the missing number in 1..n?**  
Expected sum n(n+1)/2 minus the actual sum. Or XOR everything, which avoids overflow.

**Kadane's algorithm — what does it solve?**  
Maximum subarray sum in O(n): keep a running sum, reset it to 0 (or restart at the element) whenever it goes negative, tracking the best seen.

### Linked lists

**How do you detect a cycle in a linked list?**  
**Floyd's tortoise and hare** — a slow pointer moving one step and a fast one moving two. If they meet, there is a cycle. O(n) time, O(1) space.

**How do you find the middle of a linked list in one pass?**  
Same two-pointer trick — when the fast pointer reaches the end, the slow one is at the middle.

**How do you reverse a linked list?**  
Iteratively with three pointers (prev, curr, next), relinking each node backwards. O(n) time,  
O(1) space.

**Singly vs doubly vs circular linked list?**  
Singly has one forward pointer. Doubly has forward and backward pointers (easier deletion, more memory). Circular has the last node pointing back to the first.

**Why does deletion in a singly linked list need the previous node?**  
Because you must update the previous node's `next` pointer, and you cannot walk backwards.

### Stacks, queues, trees

**How do you implement a stack using two queues, or a queue using two stacks?**  
*(Queue from two stacks is described above.)* For a **stack from two queues**: on push, enqueue to q1; then move everything from q2 to q1... the simpler form is to make **push costly** — enqueue into the empty queue, then dequeue everything from the other into it, so the newest element sits at the front.

**What is a balanced parenthesis check?**  
Push opening brackets; on a closing bracket, pop and verify it matches. Valid if the stack is empty at the end. Classic stack use.

**Infix, prefix and postfix?**  
Infix `a + b`, prefix `+ a b`, postfix `a b +`. Postfix is evaluated with a stack and needs no parentheses or precedence rules — which is why compilers use it.

**What is a priority queue and how is it implemented?**  
A queue where the highest-priority element is dequeued first. Implemented with a **binary heap** — O(log n) insert and extract.

**How do you find the height of a binary tree?**  
1 + max(height of left, height of right), recursively; base case is a null node returning 0 or  
−1 depending on the convention.

**How do you check if a binary tree is a BST?**  
In-order traversal must be strictly increasing. Or recurse passing down a valid (min, max) range for each node — simply comparing each node to its two children is **not** sufficient.

**What is a balanced tree and why does it matter?**  
One where subtree heights differ by at most a constant. It matters because an unbalanced BST degenerates to a linked list, taking operations from O(log n) to O(n).

**AVL vs Red-Black tree?**  
AVL is more strictly balanced → faster lookups, more rotations on insert. Red-Black is loosely balanced → faster inserts/deletes, slightly slower lookups. Most standard libraries (`TreeMap`, `std::map`) use Red-Black.

**What is a trie and when is it better than a hash table?**  
A prefix tree storing strings character by character. Better than a hash table for **prefix** queries (autocomplete), ordered traversal, and when many strings share prefixes.

**What is a B-tree and where is it used?**  
A self-balancing tree where nodes hold many keys and have many children, keeping height very low. Used in **database indexes and file systems**, because each node maps to a disk block and the aim is to minimise disk reads.

**How do you find the lowest common ancestor in a BST?**  
Walk from the root: if both values are smaller go left, if both larger go right; the first node where they diverge (or that equals one of them) is the LCA.

### Graphs

**How do you detect a cycle in a graph?**  
**Undirected** — DFS, and a visited neighbour that is not the parent means a cycle (or use union–find). **Directed** — DFS tracking the recursion stack; an edge to a node currently on the stack is a back edge, hence a cycle.

**What is topological sort and when does it exist?**  
A linear ordering of a **directed acyclic graph** where every edge points forward. It exists only if the graph has no cycle. Computed by DFS (reverse finish order) or Kahn's algorithm (repeatedly removing in-degree-0 nodes).

**When would you use BFS over DFS?**  
BFS for shortest path in an unweighted graph, level-order processing, or when the answer is likely near the source. DFS for cycle detection, topological sort, connected components, and when memory is tight on a wide graph.

**What is union–find and what is it for?**  
A disjoint-set structure with `find` and `union`, optimised by path compression and union by rank to near O(1). Used in Kruskal's MST and for connectivity queries.

**Prim vs Kruskal — when do you prefer each?**  
**Prim** grows one tree from a vertex — better for **dense** graphs. **Kruskal** sorts all edges and uses union–find — better for **sparse** graphs.

**Why does Dijkstra fail with negative weights?**  
It finalises a node's distance the moment it is dequeued, assuming no later path can be shorter. A negative edge can invalidate that. Use **Bellman–Ford**.

### Hashing and misc

**What makes a good hash function?**  
Deterministic, fast, uniformly distributing keys across buckets, and avalanche-like (a small input change alters the hash a lot).

**Chaining vs open addressing — trade-offs?**  
Chaining handles high load factors gracefully and deletes easily, but uses extra memory for pointers and has poorer cache locality. Open addressing is cache-friendly and compact but degrades sharply near a full table and makes deletion awkward (needs tombstones).

**What is rehashing?**  
When the load factor exceeds a threshold, allocate a larger table and reinsert every element —  
O(n), but amortised away over many insertions.

**Recursion vs iteration?**  
Recursion is often clearer for tree and divide-and-conquer problems but costs stack space and call overhead. Iteration is more memory-efficient. Any recursion can be converted to iteration with an explicit stack.

**What is tail recursion?**  
A recursive call that is the last operation in the function, allowing a compiler to reuse the stack frame. **Java does not perform tail-call optimisation**; C/C++ compilers often do.

**Dynamic programming vs greedy vs divide and conquer?**
- **Divide and conquer** — split into independent subproblems (merge sort)
- **DP** — overlapping subproblems with optimal substructure; store results (memoisation or
  tabulation)
- **Greedy** — take the locally best choice each step; only correct when the problem has the
  greedy-choice property (Dijkstra, Huffman, activity selection)

**Memoisation vs tabulation?**  
Memoisation is top-down recursion caching results. Tabulation is bottom-up iteration filling a table. Tabulation avoids stack overflow; memoisation only computes states it actually needs.

---

## Traps

- Saying merge sort is O(n log n) "in the average case only". It is **all** cases.
- Forgetting quick sort's O(n²) worst case.
- Saying binary search works on any array. It requires **sorted** input.
- Saying hash tables are always O(1). Average, not worst.
- Confusing which traversal gives sorted output — it is **in-order**, on a **BST**.
- Saying BFS uses a stack. BFS = queue, DFS = stack.
- Using Dijkstra with negative weights.

---

## Checkpoints

- [ ] I know the full sorting complexity table including space and stability
- [ ] I know quick sort's worst case is O(n²) and when it occurs
- [ ] I know merge sort is O(n log n) in all cases and needs O(n) space
- [ ] I can define a stable sort and name which sorts are stable
- [ ] I know the operation complexities for array, linked list, hash table, BST and heap
- [ ] I can give the array vs linked list comparison including cache behaviour
- [ ] I can implement a queue using two stacks
- [ ] I know all four tree traversals and that in-order on a BST yields sorted output
- [ ] I know heap properties, array indexing, and that building a heap is O(n)
- [ ] I know the collision resolution methods and what a load factor is
- [ ] I know BFS uses a queue, DFS uses a stack, both O(V+E)
- [ ] I know Dijkstra vs Bellman–Ford vs Floyd–Warshall and the negative-weight rule
- [ ] I can answer the "which data structure" table, including LRU cache
- [ ] I know the Big-O ordering and the difference between O, Ω and Θ
