# OOPS

Asked in **every single interview**, and in the written tests of Infosys, Accenture and  
Capgemini. "Explain the four pillars" is close to guaranteed — so have a crisp answer rehearsed rather than assembled on the spot.

> **How to answer any of these in an interview:** one-sentence definition → why it exists →
> a concrete example. Three sentences. Then stop and let them ask.

---

## The four pillars

### 1. Encapsulation

**Bundling data and the methods that operate on it into one unit, and restricting direct access to the data.**

- Achieved by making fields `private` and exposing `public` getters/setters.
- Why: the class controls its own state, so it can validate changes and you can alter the
  internals without breaking callers.

```java
class Account {
    private double balance;                 // hidden
    public void deposit(double amt) {
        if (amt > 0) balance += amt;        // validated
    }
    public double getBalance() { return balance; }
}
```

> **Encapsulation vs abstraction** — the classic follow-up. Encapsulation hides **data**
> (an implementation concern); abstraction hides **complexity** and shows only the
> essential interface (a design concern). Encapsulation is *how*, abstraction is *what*.

### 2. Abstraction

**Showing only the essential features and hiding the implementation.**

- Achieved with abstract classes and interfaces.
- Why: callers depend on a contract, not on details. You drive a car without knowing how
  the engine fires.

### 3. Inheritance

**A class acquires the properties and behaviour of another class.**

- `class Dog extends Animal` — Dog is-a Animal.
- Why: code reuse and a natural hierarchy.

**Types:** single, multilevel, hierarchical, multiple, hybrid.

> **Java does not support multiple inheritance with classes** — because of the **diamond
> problem**: if B and C both extend A and override a method, and D extends both, it is
> ambiguous which version D inherits. Java allows multiple inheritance of *interfaces*,
> since (before default methods) they carried no implementation. C++ supports it and
> resolves the ambiguity with virtual inheritance.

### 4. Polymorphism

**One interface, many forms.**

| | Compile-time (static) | Run-time (dynamic) |
|---|---|---|
| **Achieved by** | method **overloading** | method **overriding** |
| **Resolved at** | compile time | run time |
| **Also called** | early binding | late binding |
| **Signature** | must differ | must be identical |

```java
// Overloading - same name, different parameters
int add(int a, int b)
double add(double a, double b)

// Overriding - subclass replaces the parent's version
class Animal { void sound() { print("generic"); } }
class Dog extends Animal { void sound() { print("Bark"); } }

Animal a = new Dog();
a.sound();      // "Bark" - decided at run time by the actual object
```

That last example is the single most-asked polymorphism question. **The reference type decides what you may call; the object type decides which version runs.**

---

## Overloading vs overriding — the table they want

| | Overloading | Overriding |
|---|---|---|
| Same class? | yes | no — parent and child |
| Parameters | **must** differ | **must** be identical |
| Return type | may differ | must be same or covariant |
| Access modifier | any | cannot be more restrictive than the parent's |
| `static` methods | can be overloaded | **cannot** be overridden (they are hidden) |
| Binding | compile time | run time |

---

## Class vs object

- A **class** is a blueprint — no memory allocated for instance data.
- An **object** is an instance of a class — it occupies memory.

One class, many objects.

---

## Abstract class vs interface

| | Abstract class | Interface |
|---|---|---|
| Methods | abstract **and** concrete | abstract; `default`/`static` allowed since Java 8 |
| Variables | any kind | `public static final` only |
| Constructor | yes | no |
| Multiple inheritance | no | **yes** |
| Access modifiers | any | methods implicitly public |
| Use when | classes share code and are closely related | unrelated classes share a capability |
| Keyword | `extends` | `implements` |

**When to use which:** an abstract class models an "is-a" relationship with shared implementation; an interface models a "can-do" capability. `Bird` is an abstract class;  
`Flyable` is an interface.

---

## Constructors

- Same name as the class, **no return type**, called automatically on object creation.
- **Default constructor:** supplied by the compiler if you write none. Writing any
  constructor removes it.
- **Parameterised constructor:** takes arguments.
- **Copy constructor:** creates an object from another of the same class (explicit in C++;
  Java uses clone or manual copying).
- **Constructors can be overloaded, never overridden**, and are not inherited.

**Destructor** (C++): `~ClassName()`, called when the object is destroyed. Java has no destructor — the **garbage collector** reclaims memory, and `finalize()` is deprecated.

---

## Access modifiers (Java)

| Modifier | Same class | Same package | Subclass (other package) | Anywhere |
|---|---|---|---|---|
| `private` | ✓ | ✗ | ✗ | ✗ |
| default (none) | ✓ | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ | ✓ |

---

## `static`, `final`, `this`, `super`

- **`static`** — belongs to the class, not to an instance. One copy shared by all objects.
  Static methods cannot use `this` or access instance members directly.
- **`final`** — on a **variable**: constant; on a **method**: cannot be overridden; on a
  **class**: cannot be extended (e.g. `String`).
- **`this`** — reference to the current object; also used to call another constructor of the
  same class.
- **`super`** — reference to the parent; calls the parent's constructor or method.

> **Why is `String` immutable in Java?** Security (it is used for filenames, URLs, database
> connection strings), thread safety, hashcode caching (which makes it a reliable HashMap
> key), and the string pool, which lets identical literals share one object.

---

## Association, aggregation, composition

| Relationship | Meaning | Lifetime | Example |
|---|---|---|---|
| **Association** | two classes are related | independent | Teacher ↔ Student |
| **Aggregation** | "has-a", weak | parts survive the whole | Department has Teachers |
| **Composition** | "part-of", strong | parts die with the whole | House has Rooms |

The distinguishing test is lifetime: destroy the House and the Rooms cease to exist;  
dissolve the Department and the Teachers still exist.

---

## Rapid-fire answers

**Can a constructor be private?** Yes — used in the Singleton pattern and for static factory methods.

**Can you override a static method?** No. Redeclaring it in a subclass **hides** it; the call is resolved by reference type, not object type.

**Can an abstract class have a constructor?** Yes — it runs when a concrete subclass is instantiated.

**Can an interface extend another interface?** Yes, and it may extend several.

**What is method hiding?** A static method redeclared in a subclass — resolved at compile time, unlike overriding.

**What is a virtual function (C++)?** A function declared `virtual` in the base class so calls through a base pointer dispatch to the derived override — C++'s mechanism for run-time polymorphism. A **pure virtual function** (`= 0`) makes the class abstract.

**Difference between C++ and Java OOP?** Java has no multiple class inheritance, no pointers, no operator overloading, no destructors, and automatic garbage collection.

**What is the diamond problem?** See inheritance above.

**Is Java purely object-oriented?** No — it has primitive types (`int`, `char`, `boolean`) that are not objects.

---

## Full question bank

Everything below has been asked at TCS, Infosys, Wipro, Cognizant, Capgemini or Accenture.

### Concepts

**What is OOP and why use it?**  
A paradigm organising software around objects that bundle data and behaviour. Benefits:  
reusability (inheritance), maintainability (encapsulation), flexibility (polymorphism), and a model that maps onto real-world entities.

**Procedural vs object-oriented programming?**  
Procedural is a sequence of functions operating on shared data (top-down, C). OOP groups data with the functions that act on it (bottom-up, C++/Java). OOP gives better data security and reuse; procedural is simpler for small programs.

**What is a message in OOP?**  
An object invoking a method on another object — the way objects communicate.

**What is coupling and cohesion?**  
**Coupling** = the degree of interdependence between modules — you want it **low**.  
**Cohesion** = how focused a single module is on one task — you want it **high**.

**What is the difference between an object and an instance?**  
None practically — an object *is* an instance of a class. "Instance" emphasises the relationship to the class.

**Can a class exist without an object?**  
Yes. A class is just a definition; it can hold static members used without instantiation.

**What is a nested / inner class?**  
A class defined inside another. It can access the outer class's private members and is used to logically group classes used in only one place.

**What is an anonymous class?**  
A class declared and instantiated in a single expression, with no name — commonly used for one-off implementations of an interface.

### Constructors and destructors

**Why has a constructor no return type?**  
Its job is to initialise the object and it is called implicitly by `new`. A return value would have nowhere to go.

**What is constructor chaining?**  
One constructor calling another — `this(...)` for the same class, `super(...)` for the parent. `super()` is inserted implicitly if you write neither.

**Can a constructor be final, static or abstract?**  
No to all three. It is not inherited (so `final` is meaningless), it acts on an instance (so not `static`), and it must have a body (so not `abstract`).

**What is a copy constructor? Does Java have one?**  
It creates an object by copying another of the same class. **C++ provides one by default.**  
Java has no built-in copy constructor — you write one manually or use `clone()`.

**Shallow copy vs deep copy?**  
A **shallow** copy copies field values, so reference fields still point to the same objects.  
A **deep** copy recursively copies referenced objects too, so the two are fully independent.

**What is a destructor and does Java have one?**  
C++: `~ClassName()`, called when an object goes out of scope, used to free resources. Java has no destructor — the garbage collector reclaims memory non-deterministically.  
`finalize()` existed but is deprecated; use try-with-resources instead.

### Inheritance and polymorphism

**Types of inheritance?**  
Single, multilevel, hierarchical, multiple, hybrid. Java supports all **except multiple and hybrid with classes**.

**Why is multiple inheritance not supported in Java?**  
The diamond problem — ambiguity about which parent's implementation is inherited. Interfaces avoid it because (traditionally) they carried no implementation.

**How does Java 8 handle the diamond problem with default methods?**  
If two interfaces provide the same default method, the class **must** override it and can choose explicitly with `InterfaceName.super.method()`.

**Can you inherit a constructor?**  
No. Constructors are not members and are not inherited, though a subclass constructor calls the parent's.

**What is method hiding?**  
A `static` method redeclared with the same signature in a subclass. It is resolved at compile time by the **reference** type — unlike overriding, which uses the object type.

**Can you override a private method?**  
No. Private methods are not visible to the subclass, so a same-named method is simply a new method.

**Can you override a final method?** No — `final` exists to prevent exactly that.

**Can a subclass reduce the visibility of an overridden method?**  
No. It may keep it the same or widen it, never narrow it.

**What is covariant return type?**  
An overriding method may return a **subtype** of the parent method's return type. Legal since  
Java 5.

**What is upcasting and downcasting?**  
**Upcasting** — a subclass reference assigned to a superclass variable (`Animal a = new  
Dog()`). Implicit and always safe.  
**Downcasting** — a superclass reference cast back to a subclass (`Dog d = (Dog) a`).  
Explicit, and throws `ClassCastException` if the object is not really that type.

**What is dynamic method dispatch?**  
The run-time mechanism that selects the overriding method based on the actual object rather than the reference type. This *is* run-time polymorphism.

**What is operator overloading? Does Java support it?**  
Giving an operator extra meaning for user-defined types. **C++ supports it; Java does not**, except for the built-in `+` on Strings.

### Abstraction

**Can an abstract class have no abstract methods?** Yes — it simply cannot be instantiated.

**Can an abstract class be final?** No — the two are contradictory.

**Can an interface have a constructor?** No — it cannot be instantiated.

**What is a marker/tagging interface?**  
An interface with no methods, used purely to flag a capability to the JVM or a framework —  
`Serializable`, `Cloneable`, `RandomAccess`.

**What is a functional interface?**  
An interface with exactly one abstract method, so it can be the target of a lambda.  
`Runnable`, `Comparator`, `Callable`. Marked `@FunctionalInterface`.

**When would you choose an abstract class over an interface?**  
When the subclasses share common code and state, and form a genuine "is-a" hierarchy. Choose an interface when unrelated classes need to share a capability, or when a class must take on several roles.

### Java specifics that get asked

**`==` vs `.equals()`?**  
`==` compares **references** (identity) for objects and values for primitives. `.equals()` compares **content**, if the class overrides it. `String` overrides it; a custom class does not unless you write it.

**The `equals()` and `hashCode()` contract?**  
Equal objects must have equal hash codes. If you override `equals()` you must override  
`hashCode()`, otherwise the object misbehaves as a HashMap key.

**Method overloading and the `main` method — can `main` be overloaded?**  
Yes, but the JVM only calls `public static void main(String[] args)`.

**What is `super()` vs `this()`?**  
`super()` calls the parent constructor; `this()` calls another constructor in the same class. Either must be the **first** statement, so you cannot use both.

**What is an inner class accessing an outer variable — any restriction?**  
A local inner class or lambda can only capture variables that are **final or effectively final**.

**Static block vs instance block?**  
A static block runs **once** when the class is loaded; an instance block runs before each constructor, on every instantiation.

**What is garbage collection and can you force it?**  
Automatic reclamation of unreachable objects. `System.gc()` only *requests* it — the JVM may ignore the request. Nothing forces collection.

**Why is `String` immutable?** Security, thread safety, hashcode caching, and the string pool. *(Full reasoning above.)*

**String vs StringBuilder vs StringBuffer?**  
`String` is immutable. `StringBuilder` is mutable and **not** thread-safe (faster).  
`StringBuffer` is mutable and **synchronised** (thread-safe, slower).

**What is the `final` keyword on a reference variable?**  
The **reference** cannot be reassigned, but the object's internal state can still change.  
`final List<String> l = new ArrayList<>(); l.add("x");` is legal.

### The SOLID principles

Increasingly asked at product companies and by better interviewers.

| | Principle | Meaning |
|---|---|---|
| **S** | Single Responsibility | a class should have one reason to change |
| **O** | Open/Closed | open for extension, closed for modification |
| **L** | Liskov Substitution | a subclass must be usable anywhere its parent is |
| **I** | Interface Segregation | many small interfaces beat one large one |
| **D** | Dependency Inversion | depend on abstractions, not concrete classes |

### Design patterns worth naming

- **Singleton** — one instance only; private constructor plus a static accessor. Used for
  logging, configuration, connection pools.
- **Factory** — a method creates objects without exposing the instantiation logic.
- **Observer** — objects subscribe to and are notified of another object's state changes.
- **MVC** — separates Model (data), View (display) and Controller (input handling).

**How do you make a Singleton thread-safe?**  
Double-checked locking with a `volatile` instance field, or — simpler and preferred — an  
`enum` singleton or a static holder class.

---

## Traps

- Saying "overloading is run-time polymorphism". It is compile-time.
- Confusing encapsulation with abstraction. Have the one-line distinction ready.
- Claiming Java supports multiple inheritance — it does for interfaces, not classes. Say so
  precisely.
- Saying constructors are inherited. They are not.
- Forgetting that overriding cannot **reduce** visibility.

---

## Checkpoints

- [ ] I can define all four pillars in one sentence each with an example
- [ ] I can state the encapsulation vs abstraction distinction cleanly
- [ ] I know the overloading vs overriding table including the static and access-modifier rows
- [ ] I can explain why `Animal a = new Dog(); a.sound();` calls Dog's version
- [ ] I know the diamond problem and why Java bars multiple class inheritance
- [ ] I know the abstract class vs interface table and when to choose each
- [ ] I know the constructor rules: overloaded not overridden, not inherited, can be private
- [ ] I know the four access modifiers and their visibility scopes
- [ ] I can explain static, final, this and super
- [ ] I can explain why String is immutable in Java
- [ ] I can distinguish association, aggregation and composition by lifetime
- [ ] I can answer the rapid-fire list without hesitating
