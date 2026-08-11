# MS Office & computer basics

**Accenture asks 12 questions on this**, and it is pure recall — no reasoning, no calculation. That makes it the single highest marks-per-hour block in this entire shelf.  
An hour here is worth more than an hour of permutations.

Cognizant and a few others include a "computer fundamentals" block that draws on the same material.

---

## Excel — the part that carries the most marks

### Cell references

| Form | Behaviour when copied |
|---|---|
| `A1` | **relative** — both column and row shift |
| `$A$1` | **absolute** — neither shifts |
| `$A1` | column fixed, row shifts |
| `A$1` | row fixed, column shifts |

**`F4` cycles through the four forms** while editing a formula. This is asked directly.

### The functions that appear

| Function | Does |
|---|---|
| `SUM(range)` | adds |
| `AVERAGE(range)` | mean |
| `COUNT(range)` | counts cells containing **numbers** |
| `COUNTA(range)` | counts **non-empty** cells (any type) |
| `COUNTBLANK(range)` | counts empty cells |
| `COUNTIF(range, criteria)` | conditional count |
| `SUMIF(range, criteria, sum_range)` | conditional sum |
| `IF(test, if_true, if_false)` | branch |
| `VLOOKUP(value, table, col_index, FALSE)` | looks **down** the first column |
| `HLOOKUP(...)` | looks **across** the first row |
| `LEN(text)` | character count |
| `TRIM(text)` | removes extra spaces |
| `CONCATENATE(a,b)` / `a & b` | joins text |
| `LEFT` / `RIGHT` / `MID` | extract characters |
| `ROUND(number, digits)` | rounds |
| `MAX` / `MIN` | largest / smallest |
| `TODAY()` | current date · `NOW()` current date **and time** |

> **`COUNT` vs `COUNTA` is the most-asked Excel distinction.** COUNT only counts numbers;
> COUNTA counts anything non-empty, including text.

> **`VLOOKUP`'s last argument:** `FALSE` (or 0) = exact match, `TRUE` (or 1) = approximate
> and requires the data to be sorted. Exam answer is nearly always `FALSE`.

### Excel shortcuts

| Key | Does |
|---|---|
| `F2` | edit the active cell |
| `Alt + Enter` | new line **inside** a cell |
| `Ctrl + ;` | insert today's date |
| `Ctrl + Shift + ;` | insert current time |
| `Ctrl + D` | fill down from the cell above |
| `Ctrl + R` | fill right |
| `Ctrl + Shift + L` | toggle filters |
| `Ctrl + Home` | jump to A1 |
| `Ctrl + End` | jump to the last used cell |
| `Ctrl + Arrow` | jump to the edge of the data block |
| `Ctrl + Page Up/Down` | move between worksheets |

**Other terms:** *Freeze Panes* keeps rows/columns visible while scrolling. A *Pivot Table* summarises large data by grouping. *Conditional Formatting* colours cells by rule.  
`#DIV/0!`, `#VALUE!`, `#REF!`, `#NAME?`, `#N/A` are error values — `#REF!` means a referenced cell was deleted.

---

## Word

| Key | Does |
|---|---|
| `Ctrl + B / I / U` | bold / italic / underline |
| `Ctrl + L / E / R / J` | align left / centre / right / justify |
| `Ctrl + K` | insert hyperlink |
| `Ctrl + Enter` | page break |
| `Shift + F3` | change case (lower → Title → UPPER) |
| `F7` | spelling and grammar check |
| `Ctrl + F / H` | find / find and replace |
| `Ctrl + Shift + > / <` | increase / decrease font size |
| `Ctrl + Z / Y` | undo / redo |

**Terms:** *Mail Merge* generates many personalised documents from one template plus a data source. A *header/footer* repeats on every page. *Track Changes* records edits for review.  
*Orientation* is Portrait or Landscape.

---

## PowerPoint

| Key | Does |
|---|---|
| `F5` | start the slideshow from the beginning |
| `Shift + F5` | start from the **current** slide |
| `Ctrl + M` | new slide |
| `Esc` | end the show |
| `B` / `W` (during a show) | blank the screen black / white |

**Terms:** *Slide Master* controls the layout of all slides at once. *Transition* is the effect between slides; *Animation* is the effect on an element within a slide.

---

## Outlook and email

| Key | Does |
|---|---|
| `Ctrl + N` | new item |
| `Ctrl + Shift + M` | new mail message |
| `Ctrl + R` | reply |
| `Ctrl + Shift + R` | reply **all** |
| `Ctrl + F` | forward |

**CC vs BCC** — recipients can see who is in **CC**; they cannot see who is in **BCC**. This is asked as a privacy question.

**Draft** = unsent. **Outbox** = sent but not yet transmitted. **Sent Items** = transmitted.

---

## File extensions

| Extension | File |
|---|---|
| `.docx` | Word document |
| `.xlsx` | Excel workbook |
| `.pptx` | PowerPoint presentation |
| `.csv` | comma-separated values (plain text, no formatting) |
| `.pdf` | portable document format (fixed layout) |
| `.txt` | plain text |
| `.zip` | compressed archive |

> **CSV holds no formulas, colours or multiple sheets** — only values. Asked as "what is lost
> when you save an Excel file as CSV".

---

## Browser shortcuts

| Key | Does |
|---|---|
| `Ctrl + T` | new tab |
| `Ctrl + W` | close tab |
| `Ctrl + Shift + T` | reopen the last closed tab |
| `Ctrl + D` | bookmark |
| `Ctrl + Shift + N` | incognito / private window |
| `F5` or `Ctrl + R` | refresh |
| `Ctrl + Shift + Delete` | clear browsing data |

**Cache** stores page assets to speed up revisits. **Cookies** store site-specific data such as a login session. Incognito does not save history or cookies locally — it does **not** hide you from the website or your network.

---

## Command prompt

| Command | Does |
|---|---|
| `dir` | list directory contents |
| `cd` | change directory |
| `mkdir` / `md` | make a directory |
| `del` | delete a file |
| `cls` | clear the screen |
| `ipconfig` | show IP configuration |
| `ping` | test reachability of a host |
| `tasklist` | list running processes |
| `systeminfo` | machine details |

---

## General computer fundamentals

**Hardware vs software** — physical components vs the programs that run on them.

**RAM vs ROM** — RAM is volatile working memory, lost on power-off. ROM is non-volatile and holds firmware.

**Primary vs secondary storage** — RAM is primary (fast, volatile); HDD/SSD is secondary (slower, persistent).

**Input vs output devices** — keyboard, mouse, scanner, microphone are input; monitor, printer, speaker are output. A **touchscreen** is both.

**Units:** 1 byte = 8 bits · 1 KB = 1024 bytes · 1 MB = 1024 KB · 1 GB = 1024 MB ·  
1 TB = 1024 GB

**Shortcut keys everywhere:** `Ctrl + C/X/V` copy/cut/paste, `Ctrl + A` select all,  
`Ctrl + S` save, `Ctrl + P` print, `Ctrl + Z` undo, `Alt + Tab` switch windows,  
`Alt + F4` close window, `Windows + L` lock, `Print Screen` capture screen,  
`Windows + D` show desktop.

**Delete vs Shift + Delete** — Delete moves to the Recycle Bin; **Shift + Delete** removes it permanently, bypassing the bin.

---

## Practice set

#### Q1. Which function counts only cells containing numbers?

(a) COUNTA (b) COUNT (c) COUNTBLANK (d) SUM

**(b) COUNT** — COUNTA counts any non-empty cell.

#### Q2. What does `$A$1` mean when a formula is copied?

The reference is **absolute** — neither the column nor the row changes.

#### Q3. Which key cycles a reference through relative, absolute and mixed forms?

**F4**

#### Q4. What does `Alt + Enter` do inside an Excel cell?

Inserts a **line break within the cell**, rather than moving to the cell below.

#### Q5. `VLOOKUP` searches in which direction, and what does its final argument control?

It searches **down the first column** of the table. The final argument sets **exact match (FALSE)** or approximate match (TRUE).

#### Q6. Which error appears when a formula refers to a deleted cell?

**`#REF!`**

#### Q7. What is the difference between CC and BCC?

Everyone can see the **CC** recipients; **BCC** recipients are hidden from all other recipients.

#### Q8. Which shortcut starts a PowerPoint show from the current slide?

**Shift + F5** *(plain F5 starts from the beginning)*

#### Q9. What is lost when an Excel workbook is saved as `.csv`?

Formulas, formatting, colours, charts and all sheets but one — CSV stores **plain values only**.

#### Q10. Which shortcut reopens the last closed browser tab?

**Ctrl + Shift + T**

#### Q11. What does `Shift + F3` do in Word?

Cycles the selected text through **lowercase → Title Case → UPPERCASE**.

#### Q12. Which is volatile: RAM or ROM?

**RAM** — its contents are lost when power is removed.

#### Q13. How many kilobytes in a megabyte?

**1024**

#### Q14. What does Freeze Panes do?

Keeps chosen rows or columns visible while the rest of the sheet scrolls.

#### Q15. Which command shows a machine's IP configuration?

**`ipconfig`**

#### Q16. What is the difference between Delete and Shift + Delete?

Delete sends the file to the **Recycle Bin**; Shift + Delete removes it **permanently**.

---

## Traps

- COUNT vs COUNTA. COUNT is numbers only.
- `$A1` and `A$1` are **mixed**, not absolute. Only `$A$1` locks both.
- F5 vs Shift + F5 in PowerPoint.
- VLOOKUP with `TRUE` requires sorted data — the exam answer is almost always `FALSE`.
- Incognito hides nothing from the website or your college network; it only skips local
  history.
- 1 KB is 1024 bytes, not 1000, in the convention these exams use.

---

## Checkpoints

- [ ] I know the four cell-reference forms and that F4 cycles them
- [ ] I know COUNT vs COUNTA vs COUNTBLANK
- [ ] I know SUMIF, COUNTIF, IF, VLOOKUP and HLOOKUP and their arguments
- [ ] I know the Excel error values, especially `#REF!`
- [ ] I know the Excel shortcuts: F2, Alt+Enter, Ctrl+D, Ctrl+R, Ctrl+;, Ctrl+Shift+L
- [ ] I know the Word shortcuts including Shift+F3 and Ctrl+Enter
- [ ] I know F5 vs Shift+F5 in PowerPoint and what a Slide Master does
- [ ] I know CC vs BCC
- [ ] I know the common file extensions and what CSV loses
- [ ] I know the browser shortcuts and what incognito actually does
- [ ] I know the basic command-prompt commands
- [ ] I know RAM vs ROM, the storage units, and Delete vs Shift+Delete
