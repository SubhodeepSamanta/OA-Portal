# DBMS & SQL

**TCS leans on this harder than on anything else** — SQL queries and normalization come up in almost every interview. Infosys and Cognizant ask it too. Learn to *write* a query, not just to describe one.

---

## Keys

| Key | Meaning |
|---|---|
| **Super key** | any set of attributes that uniquely identifies a row |
| **Candidate key** | a minimal super key (no redundant attribute) |
| **Primary key** | the chosen candidate key. Unique, **NOT NULL**, one per table |
| **Alternate key** | the candidate keys not chosen as primary |
| **Foreign key** | an attribute referencing another table's primary key |
| **Composite key** | a primary key made of two or more columns |
| **Unique key** | unique values, but **allows one NULL** |

> **Primary key vs unique key** — the standard follow-up. Both enforce uniqueness; the
> primary key rejects NULLs and there is only one per table, while a table may have many
> unique keys and each permits a NULL.

---

## Normalization

**Definition:** organising data to reduce redundancy and eliminate insertion, update and deletion anomalies.

| Form | Requirement |
|---|---|
| **1NF** | all attributes atomic — no repeating groups or multi-valued fields |
| **2NF** | 1NF **and** no partial dependency (no non-key attribute depends on *part* of a composite key) |
| **3NF** | 2NF **and** no transitive dependency (no non-key attribute depends on another non-key attribute) |
| **BCNF** | for every functional dependency X → Y, X is a super key |

### Worked example

`Student(RollNo, Name, CourseID, CourseName, DeptHead)`

- **Not 2NF:** if the key is (RollNo, CourseID), then `Name` depends only on RollNo and
  `CourseName` only on CourseID — both partial dependencies.  
  → split into `Student(RollNo, Name)`, `Course(CourseID, CourseName)`,  
  `Enrollment(RollNo, CourseID)`.
- **Not 3NF:** in `Student(RollNo, Name, DeptID, DeptHead)`, DeptHead depends on DeptID which
  depends on RollNo — a transitive dependency.  
  → split into `Student(RollNo, Name, DeptID)` and `Dept(DeptID, DeptHead)`.

**Denormalization** — deliberately reintroducing redundancy to reduce joins and speed up reads. A trade-off, used in reporting and warehouse systems.

---

## ACID

The four guarantees of a transaction:

- **Atomicity** — all operations complete, or none do
- **Consistency** — the database moves from one valid state to another
- **Isolation** — concurrent transactions do not interfere
- **Durability** — once committed, changes survive a crash

**Transaction** — a single logical unit of work. `COMMIT` makes it permanent; `ROLLBACK` undoes it.

**Isolation levels** (weakest to strongest): Read Uncommitted, Read Committed, Repeatable  
Read, Serializable. Weaker levels permit **dirty reads**, **non-repeatable reads** and  
**phantom reads** respectively.

---

## DDL, DML, DCL, TCL

| Category | Commands | Purpose |
|---|---|---|
| **DDL** | CREATE, ALTER, DROP, TRUNCATE | define structure |
| **DML** | SELECT, INSERT, UPDATE, DELETE | manipulate data |
| **DCL** | GRANT, REVOKE | permissions |
| **TCL** | COMMIT, ROLLBACK, SAVEPOINT | transaction control |

### DELETE vs TRUNCATE vs DROP — near-guaranteed

| | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Type | DML | DDL | DDL |
| Removes | selected rows | **all** rows | the whole table |
| `WHERE` clause | yes | no | no |
| Rollback | **yes** | no (auto-commits) | no |
| Structure kept | yes | yes | **no** |
| Speed | slow (row by row, logged) | fast | fast |
| Triggers fired | yes | no | no |

---

## Joins

| Join | Returns |
|---|---|
| **INNER** | only rows matching in both tables |
| **LEFT (OUTER)** | all rows from the left, matched rows from the right, NULLs otherwise |
| **RIGHT (OUTER)** | all from the right, matched from the left |
| **FULL (OUTER)** | all rows from both, NULLs where unmatched |
| **CROSS** | Cartesian product — every combination |
| **SELF** | a table joined to itself (e.g. employee → manager) |

```sql
SELECT e.name, d.dept_name
FROM   employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
```

---

## SQL you must be able to write

### Second-highest salary — the single most-asked SQL question

```sql
-- Method 1: subquery
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: LIMIT / OFFSET (MySQL)
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Method 3: window function - generalises to Nth
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) t WHERE rnk = 2;
```

Method 3 is the one to show if they ask for the **Nth** highest — change 2 to N.

### Find duplicates

```sql
SELECT email, COUNT(*)
FROM   users
GROUP  BY email
HAVING COUNT(*) > 1;
```

### Delete duplicates, keeping the lowest id

```sql
DELETE FROM users
WHERE  id NOT IN (SELECT MIN(id) FROM users GROUP BY email);
```

### Employees earning more than their manager

```sql
SELECT e.name
FROM   employees e
JOIN   employees m ON e.manager_id = m.id
WHERE  e.salary > m.salary;
```

### Department-wise count, only departments with more than 5

```sql
SELECT   dept_id, COUNT(*) AS headcount
FROM     employees
GROUP BY dept_id
HAVING   COUNT(*) > 5
ORDER BY headcount DESC;
```

> **WHERE vs HAVING** — `WHERE` filters **rows before** grouping; `HAVING` filters **groups
> after** aggregation. You cannot use an aggregate function in `WHERE`.

### Order of execution

Written order is not execution order. Know this:

```
FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

This explains why you cannot reference a `SELECT` alias in `WHERE`, but can in `ORDER BY`.

---

## Aggregate functions

`COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`

> **`COUNT(*)` counts all rows including NULLs; `COUNT(column)` skips NULLs.** Asked
> directly, and it is also why `COUNT(*)` and `COUNT(col)` can differ.

---

## UNION vs UNION ALL

- **UNION** — combines results and **removes duplicates** (so it sorts, which costs time)
- **UNION ALL** — combines and **keeps duplicates** (faster)

Both require the same number of columns with compatible types.

---

## Indexing

An **index** is a data structure (usually a B-tree) that speeds up lookups on a column.

- **Clustered index** — determines the **physical order** of rows. **One per table.** The
  primary key gets one by default.
- **Non-clustered index** — a separate structure holding pointers to rows. Many per table.

**Cost:** indexes speed up `SELECT` but slow down `INSERT`, `UPDATE` and `DELETE`, because the index must be maintained too. They also consume storage. Always state the trade-off.

---

## Other concepts

**View** — a virtual table defined by a query. It stores no data itself; it simplifies complex queries and can restrict column access. A **materialized view** does store results.

**Stored procedure** — precompiled SQL stored in the database, called by name. Reduces network traffic and can be granted permissions independently.

**Trigger** — code that runs automatically in response to INSERT/UPDATE/DELETE.

**ER model** — Entity–Relationship model. **Entity** = a real-world object (Student);  
**attribute** = a property (Name); **relationship** = an association (Student *enrolls in*  
Course). Cardinalities: 1:1, 1:N, M:N.

**Data abstraction levels:** **physical** (how data is stored), **logical** (what data and relationships exist), **view** (what a particular user sees).

**DBMS vs RDBMS** — an RDBMS stores data in **tables with relationships** and enforces keys and constraints; a plain DBMS may store data as files with no relational structure. All  
RDBMSs are DBMSs, not vice versa.

**Horizontal vs vertical scaling** — horizontal adds more machines (scale out); vertical adds more power to one machine (scale up).

**SQL vs NoSQL** — SQL is relational with a fixed schema and strong ACID guarantees; NoSQL is schema-flexible, scales horizontally, and often trades consistency for availability.

**Locks:** a **shared** lock permits concurrent reads; an **exclusive** lock permits neither reads nor writes by others.

---

## Full question bank

### Fundamentals

**What is a DBMS and what advantages does it have over a file system?**  
Software to define, store, retrieve and manage data. Over flat files it gives: controlled redundancy, data consistency, integrity constraints, concurrent access control, security, backup and recovery, and data independence.

**What is data independence?**  
**Logical** — changing the logical schema without altering applications.  
**Physical** — changing how data is stored without altering the logical schema.

**What is a schema vs an instance?**  
The **schema** is the structure (the design); the **instance** is the data in the database at a moment in time.

**What are the three levels of abstraction?**  
Physical (how it is stored), logical (what data and relationships exist), view (what a particular user sees).

**What is a relation, tuple, attribute, degree and cardinality?**  
Relation = table. Tuple = row. Attribute = column. **Degree** = number of attributes.  
**Cardinality** = number of tuples.

**What is a NULL? Is it the same as zero or a blank?**  
No. NULL means **unknown or not applicable**. It is not equal to anything, not even another  
NULL — which is why you must use `IS NULL`, never `= NULL`.

### Keys and constraints

**What are the integrity constraints?**
- **Domain** — values must be of the correct type/range
- **Entity** — the primary key cannot be NULL
- **Referential** — a foreign key must match an existing primary key or be NULL
- **Key** — declared keys must remain unique

**What happens on deleting a row referenced by a foreign key?**  
Depends on the declared action: `CASCADE` (delete the children too), `SET NULL`, `SET  
DEFAULT`, or `RESTRICT`/`NO ACTION` (reject the delete).

**Can a foreign key be NULL? Can it reference the same table?**  
Yes to both — a NULL foreign key means "no relationship yet", and a self-referencing foreign key models hierarchies like employee → manager.

### Normalization — the full ladder

**Why normalise?** To eliminate redundancy and the three anomalies:
- **Insertion anomaly** — cannot add a fact without inventing unrelated data
- **Update anomaly** — the same fact stored twice can disagree
- **Deletion anomaly** — deleting one fact accidentally destroys another

**What is a functional dependency?**  
X → Y means the value of X determines the value of Y. **Partial** dependency: Y depends on part of a composite key. **Transitive** dependency: X → Y and Y → Z, so X → Z.

| Form | Rule |
|---|---|
| 1NF | atomic values, no repeating groups |
| 2NF | 1NF + no partial dependency on a composite key |
| 3NF | 2NF + no transitive dependency |
| BCNF | for every FD X → Y, X is a super key |
| 4NF | BCNF + no multi-valued dependency |
| 5NF | 4NF + no join dependency |

**When is 3NF not BCNF?**  
When a table has overlapping candidate keys and a non-key attribute determines part of a key.  
BCNF is stricter; achieving it can sometimes lose dependency preservation, which is why 3NF is often the practical stopping point.

**Why would you denormalise?**  
To cut expensive joins in read-heavy or reporting workloads, accepting redundancy and the cost of keeping copies in sync.

### Transactions and concurrency

**What are the transaction states?**  
Active → Partially Committed → Committed, or Active → Failed → Aborted.

**Explain the concurrency problems.**
- **Dirty read** — reading data another transaction wrote but has not committed
- **Non-repeatable read** — reading the same row twice and getting different values
- **Phantom read** — a query returns different *rows* on re-execution because another
  transaction inserted some
- **Lost update** — two transactions overwrite each other's changes

**Which isolation level prevents which?**

| Level | Dirty | Non-repeatable | Phantom |
|---|---|---|---|
| Read Uncommitted | ✗ | ✗ | ✗ |
| Read Committed | ✓ | ✗ | ✗ |
| Repeatable Read | ✓ | ✓ | ✗ |
| Serializable | ✓ | ✓ | ✓ |

(✓ = prevented)

**What is two-phase locking (2PL)?**  
A protocol with a **growing** phase (acquire locks only) and a **shrinking** phase (release locks only). It guarantees serialisability. **Strict 2PL** holds all exclusive locks until commit, preventing cascading rollbacks.

**What is a deadlock in a database and how is it handled?**  
Two transactions each holding a lock the other needs. Handled by timeout, by wait-die/ wound-wait schemes, or by detecting a cycle in the wait-for graph and aborting a victim.

**What is a checkpoint?**  
A point at which the DBMS writes all committed changes to disk and records it in the log, so recovery need not replay the entire log.

### SQL — more queries you must be able to write

**Nth highest salary**
```sql
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC LIMIT 1 OFFSET N-1;
```

**Top 3 salaries per department**
```sql
SELECT * FROM (
  SELECT name, dept_id, salary,
         DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
  FROM employees
) t WHERE rnk <= 3;
```

**Employees with no manager**
```sql
SELECT name FROM employees WHERE manager_id IS NULL;
```

**Departments with no employees**
```sql
SELECT d.dept_name FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.dept_id IS NULL;
```

**Second highest salary per department**
```sql
SELECT dept_id, MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees e2 WHERE e2.dept_id = employees.dept_id)
GROUP BY dept_id;
```

**Employees who earn more than the department average**
```sql
SELECT e.name FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);
```

**Count employees by department, including empty departments**
```sql
SELECT d.dept_name, COUNT(e.id) AS headcount
FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name;
```
*Use `COUNT(e.id)`, not `COUNT(*)` — `COUNT(*)` would count the NULL row as 1.*

**Swap two column values without a temp table**
```sql
UPDATE payroll SET salary = bonus, bonus = salary;
```

**Find the nth row**
```sql
SELECT * FROM employees ORDER BY id LIMIT 1 OFFSET n-1;
```

### More SQL concepts

**Correlated vs non-correlated subquery?**  
A **non-correlated** subquery runs once, independently. A **correlated** subquery references the outer query and runs once **per outer row** — slower, but necessary for per-group comparisons.

**`IN` vs `EXISTS`?**  
`IN` compares against a materialised list — better for small, static lists. `EXISTS` stops at the first match — better for large subqueries and correlated cases. With NULLs in the subquery, `NOT IN` behaves unexpectedly; `NOT EXISTS` is safer.

**`UNION` vs `JOIN`?**  
`UNION` stacks rows **vertically** from two result sets. `JOIN` combines columns  
**horizontally** from two tables.

**`HAVING` without `GROUP BY`?**  
Legal — it then treats the whole table as one group.

**`CHAR` vs `VARCHAR`?**  
`CHAR(n)` is fixed length and pads with spaces; `VARCHAR(n)` is variable length and stores only what is needed plus a length. `CHAR` is marginally faster for genuinely fixed-width data.

**`DROP` vs `TRUNCATE` vs `DELETE`** — *(full table above)*

**What is a cursor?**  
A pointer that lets you process a result set row by row. Implicit or explicit. Generally avoided — set-based SQL is far faster.

**What is a trigger and when is it a bad idea?**  
Code that fires automatically on INSERT/UPDATE/DELETE. Bad when it hides business logic from developers or creates cascading chains that are hard to debug.

**Clustered vs non-clustered index — how many of each?**  
**One** clustered index per table (it defines the physical row order); **many** non-clustered indexes.

**When does an index NOT help?**  
On low-cardinality columns (e.g. a gender flag), on very small tables, when the query returns most of the rows, or when the column is wrapped in a function (`WHERE UPPER(name) = 'X'` usually defeats the index).

**What is a composite index and does column order matter?**  
An index on several columns. **Order matters** — an index on (a, b) helps queries filtering on `a` or on `a AND b`, but not on `b` alone. This is the leftmost-prefix rule.

**What is a view? Can you update through one?**  
A stored query presented as a virtual table. It is updatable only if it maps unambiguously to one base table — no aggregates, no DISTINCT, no GROUP BY, usually no joins.

**What is a stored procedure vs a function?**  
A **procedure** may return zero or many values and can perform DML; a **function** must return a value and is usable inside a SQL expression. Functions typically cannot modify the database.

**ER model: what is an entity, weak entity, and a composite/derived attribute?**  
An **entity** has independent existence. A **weak entity** cannot be identified without a parent (a dependent needs an employee). A **composite** attribute divides further (Name →  
First, Last). A **derived** attribute is computed (Age from DOB).

**What is generalisation, specialisation and aggregation in ER modelling?**  
**Generalisation** — bottom-up, combining similar entities into a superclass. **Specialisation**  
— top-down, splitting an entity into subclasses. **Aggregation** — treating a relationship as a higher-level entity so it can participate in another relationship.

**What is a candidate key vs a super key — with an example?**  
In `Student(RollNo, Email, Name)`, both {RollNo} and {Email} are candidate keys.  
{RollNo, Name} is a super key but not a candidate key, because Name is redundant.

**ACID vs BASE?**  
ACID (relational) guarantees strict consistency. **BASE** (many NoSQL systems) is Basically  
Available, Soft state, Eventually consistent — trading immediate consistency for availability and partition tolerance.

**What is the CAP theorem?**  
A distributed system can guarantee at most two of **Consistency**, **Availability** and  
**Partition tolerance**. Since partitions are unavoidable in practice, the real choice is between C and A.

---

## Traps

- Saying TRUNCATE can be rolled back. It cannot — it auto-commits.
- Using an aggregate in `WHERE`. Use `HAVING`.
- Saying an index makes everything faster. It slows writes.
- Confusing candidate key with primary key — the primary key is one *chosen* candidate key.
- Saying a unique key allows no NULLs. It allows one.
- `COUNT(*)` vs `COUNT(column)` with NULLs.
- Forgetting that 2NF is about **partial** dependency and 3NF about **transitive**
  dependency. Do not swap them.

---

## Checkpoints

- [ ] I know every key type and can state primary vs unique key precisely
- [ ] I can define 1NF, 2NF, 3NF and BCNF and normalise a given table
- [ ] I know partial dependency belongs to 2NF and transitive to 3NF
- [ ] I can state ACID and give an example of each property
- [ ] I know the DDL/DML/DCL/TCL grouping
- [ ] I can give the full DELETE vs TRUNCATE vs DROP table
- [ ] I know all six join types and can write an INNER JOIN unaided
- [ ] I can write the second-highest-salary query three ways
- [ ] I can write queries to find and delete duplicates
- [ ] I know WHERE vs HAVING and the SQL order of execution
- [ ] I know COUNT(*) vs COUNT(column) with NULLs
- [ ] I know UNION vs UNION ALL
- [ ] I can explain clustered vs non-clustered indexes **and the write cost**
- [ ] I can explain views, stored procedures, triggers and the ER model
- [ ] I know the three levels of data abstraction
