# Git and GitHub Fundamentals 🚀

> Day 9 of 45 Days DevOps Course - Understanding Version Control, Git, and GitHub

## 📋 Table of Contents
- [Introduction](#introduction)
- [What is Version Control System?](#what-is-version-control-system)
- [Problems Solved by VCS](#problems-solved-by-vcs)
- [Centralized vs Distributed VCS](#centralized-vs-distributed-vcs)
- [Git vs GitHub](#git-vs-github)
- [Git Lifecycle](#git-lifecycle)
- [Essential Git Commands](#essential-git-commands)
- [Practical Walkthrough](#practical-walkthrough)
- [Understanding Git Internals](#understanding-git-internals)
- [Creating a GitHub Repository](#creating-a-github-repository)
- [Interview Questions](#interview-questions)
- [Key Takeaways](#key-takeaways)

## Introduction

Git and GitHub have become fundamental tools in modern software development. Before diving into Git commands, it's crucial to understand **why** version control systems exist and the problems they solve. This guide will take you from basic concepts to practical implementation.

## What is Version Control System?

A **Version Control System (VCS)** is a tool that helps track changes to files over time, enabling multiple developers to collaborate efficiently.

### Core Concept

Version Control System addresses **two fundamental problems**:

1. **Sharing of Code** - How developers share their work with each other
2. **Versioning** - How to maintain different versions of code and revert to previous states

## Problems Solved by VCS

### Problem 1: Sharing Code

#### The Scenario

```
Organization: Calculator App Development

Developer 1                    Developer 2
    |                               |
    |                               |
Writing Addition              Writing Subtraction
Functionality                 Functionality
    |                               |
    └───────────┬───────────────────┘
                |
         Need to combine code
         into one application
```

**Challenge:**
- Dev 1 writes addition functionality
- Dev 2 writes subtraction functionality
- Both need to merge their code into one calculator application

**Why Simple Sharing (Email/Slack) Doesn't Work:**
- Real projects have **hundreds of files** and **thousands of lines**
- Dev 1 might change 25 files
- Dev 2 might change 32 files
- Complex dependencies (JAR files, libraries)
- **Practically impossible to track manually**

### Problem 2: Versioning

#### The Scenario

```
Timeline of Development:

Day 1: Addition of 2 numbers (Version 1)
  ↓
Day 3: Addition of 3 numbers (Version 2)
  ↓
Day 5: Addition of 4 numbers (Version 3)
  ↓
Day 10: Customer says: "Nobody uses 3 or 4 numbers. 
        Go back to addition of 2 numbers!"
```

**Challenge:**
- How to revert to code from 10 days ago?
- Day 1: Modified 100 files
- Day 2: Modified 5 files
- Day 3: Modified 50 files
- **Need to track every change and version**

**Without VCS:**
- Manual file naming: `calculator_v1.sh`, `calculator_v2.sh`, `calculator_final.sh`, `calculator_final_final.sh` 😅
- No way to see what changed between versions
- Impossible to manage at scale

## Centralized vs Distributed VCS

### Centralized Version Control System (CVS, SVN)

```
          ┌─────────────────┐
          │  Central Server │
          │   (SVN/CVS)     │
          └────────┬────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
    ┌────▼────┐         ┌────▼────┐
    │  Dev 1  │         │  Dev 2  │
    └─────────┘         └─────────┘
```

**Characteristics:**
- **Single central server** holds all the code
- Developers commit to and pull from central server
- **All communication** goes through central server

**Problems:**
- ❌ **Single Point of Failure** - If server goes down, no one can work
- ❌ **No offline work** - Need server connection to commit
- ❌ **Bottleneck** - All operations depend on server availability

**Real-World Example:**
```
Scenario: SVN server is down for maintenance

Developer A ──╳──> SVN Server (Down) <──╳── Developer B
                        ↓
              Cannot share code!
              Cannot commit changes!
              Work is blocked!
```

### Distributed Version Control System (Git)

```
    ┌─────────────────────┐
    │   Remote Repository │
    │      (GitHub)       │
    └──────────┬──────────┘
               │
      ┌────────┴────────┐
      │                 │
┌─────▼──────┐    ┌─────▼──────┐
│   Dev 1    │    │   Dev 2    │
│ (Full Copy)│    │ (Full Copy)│
└────────────┘    └────────────┘
      │                 │
      │  Can create     │
      │  their own      │
      │  copies (Forks) │
      │                 │
┌─────▼──────┐    ┌─────▼──────┐
│ Fork by A  │    │ Fork by B  │
└────────────┘    └────────────┘
```

**Characteristics:**
- ✅ **Every developer has complete repository** (full history)
- ✅ **Multiple copies** can exist simultaneously
- ✅ **Work offline** - commit locally, push when ready
- ✅ **No single point of failure**

**Advantages:**
1. **Resilience**: If GitHub goes down, every developer has full backup
2. **Speed**: Most operations are local (no network needed)
3. **Flexibility**: Can create forks and work independently
4. **Collaboration**: Multiple workflows possible

### Interview Question: Centralized vs Distributed

**Q: What is the difference between Centralized and Distributed Version Control Systems?**

**Answer:**

| Aspect | Centralized (SVN, CVS) | Distributed (Git) |
|--------|------------------------|-------------------|
| **Architecture** | Single central server | Multiple complete copies |
| **Offline Work** | ❌ Not possible | ✅ Fully possible |
| **Speed** | Slow (network dependent) | Fast (local operations) |
| **Failure Tolerance** | Single point of failure | Highly resilient |
| **Branching** | Difficult, server-side | Easy, local |
| **Example** | SVN, CVS, Perforce | Git, Mercurial |

## What is a Fork?

**Definition:** A fork is a **complete copy** of an entire repository, including all code and history.

```
Original Repository (company.com)
         |
         | Fork (Create complete copy)
         |
         ↓
Your Fork (abhishek.company.com)
```

**Use Cases:**
- **Open Source Contribution**: Fork → Modify → Submit Pull Request
- **Experimentation**: Test features without affecting main repo
- **Backup**: Multiple copies ensure no data loss
- **Independent Development**: Work on your version independently

**Example:**
```bash
# Original repo at: github.com/company/calculator
# You fork it to: github.com/yourname/calculator
# Both have complete code history
# You can work independently on your fork
```

## Git vs GitHub

### What is Git?

**Git** is an **open-source distributed version control system** created by Linus Torvalds.

**Key Points:**
- ✅ Free and open source
- ✅ Command-line tool
- ✅ Can be self-hosted
- ✅ Works offline
- ✅ Tracks changes to files

**Self-Hosted Git Example:**
```
1. Create EC2 instance
2. Install Git: sudo apt install git
3. Configure Git server
4. Developers connect to this server
   ↓
Dev 1 → Git Server (EC2) ← Dev 2
Dev 3 →                  ← Dev 4
```

### What is GitHub?

**GitHub** is a **cloud-based hosting service** for Git repositories with additional features.

**Git + GitHub:**
```
Git (Core Technology)
         +
Enhanced Features (UI, Collaboration, CI/CD)
         =
GitHub / GitLab / Bitbucket
```

**GitHub Additional Features:**
- 🌐 **Web Interface** - Visual, user-friendly
- 👥 **Collaboration Tools** - Issues, pull requests, code review
- 🔒 **Access Control** - Fine-grained permissions
- 🤖 **GitHub Actions** - CI/CD automation
- 📊 **Project Management** - Boards, milestones
- 🔐 **Security Features** - Vulnerability scanning, secret detection
- 📝 **Documentation** - Wiki, README rendering
- 🌟 **Social Features** - Stars, followers, activity feed

### Comparison Table

| Feature | Git (Self-Hosted) | GitHub | GitLab | Bitbucket |
|---------|-------------------|--------|---------|-----------|
| **Core Git** | ✅ | ✅ | ✅ | ✅ |
| **Web UI** | Basic | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Code Review** | Manual | Built-in | Built-in | Built-in |
| **CI/CD** | ❌ | GitHub Actions | GitLab CI | Pipelines |
| **Issues Tracking** | ❌ | ✅ | ✅ | ✅ |
| **Maintenance** | You manage | GitHub manages | GitLab manages | Atlassian manages |
| **Cost** | Server cost | Free (public) | Free tier | Free tier |

### Interview Question: Git vs GitHub

**Q: What is the difference between Git and GitHub?**

**Answer:**
- **Git** is a distributed version control **system** (the technology/tool)
- **GitHub** is a **platform/service** that hosts Git repositories with additional collaboration features

**Analogy:**
- Git = Email protocol (SMTP)
- GitHub = Gmail (email service with UI and features)

**Other Alternatives:**
- GitHub (most popular)
- GitLab (DevOps focused)
- Bitbucket (Atlassian ecosystem)
- Self-hosted Git (full control)

## Git Lifecycle

### The Three Essential Commands

```
Working Directory → Staging Area → Local Repository → Remote Repository
       |                |               |                    |
       |   git add      |  git commit   |    git push        |
       └────────────────┴───────────────┴────────────────────┘
                    Git Lifecycle
```

### Detailed Flow

```
1. Working Directory (Untracked Files)
   - Files you create/modify
   - Git doesn't know about them yet
   
2. Staging Area (Tracked, not committed)
   - Files marked for next commit
   - git add <file>
   
3. Local Repository (Committed)
   - Changes saved with message
   - git commit -m "message"
   
4. Remote Repository (Shared)
   - Changes pushed to GitHub
   - git push
```

## Essential Git Commands

### Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install git -y
```

**macOS:**
```bash
brew install git
```

**Windows:**
```bash
choco install git
```

**Verify Installation:**
```bash
git --version
# Output: git version 2.x.x
```

### Basic Commands Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `git init` | Initialize repository | `git init` |
| `git status` | Check file status | `git status` |
| `git add` | Stage files | `git add calculator.sh` |
| `git add .` | Stage all files | `git add .` |
| `git commit` | Save version | `git commit -m "Added feature"` |
| `git log` | View commit history | `git log` |
| `git diff` | See changes | `git diff` |
| `git push` | Upload to remote | `git push origin main` |
| `git pull` | Download from remote | `git pull origin main` |
| `git clone` | Copy repository | `git clone <url>` |
| `git reset` | Undo changes | `git reset --hard <commit-id>` |

## Practical Walkthrough

### Step-by-Step: Version Control in Action

#### Step 1: Create Project Directory

```bash
# Create project folder
mkdir example.com
cd example.com
```

#### Step 2: Initialize Git Repository

```bash
# Initialize Git
git init

# Output: Initialized empty Git repository in /home/user/example.com/.git/
```

**What happened?**
- Created `.git` folder (hidden)
- This folder tracks everything

```bash
# View hidden folders
ls -la

# Output:
# drwxr-xr-x  .
# drwxr-xr-x  ..
# drwxr-xr-x  .git  ← Git tracking folder
```

#### Step 3: Create a File

```bash
# Create calculator script
vim calculator.sh
```

**calculator.sh (Version 1):**
```bash
#!/bin/bash
# Addition of two numbers
x = a + b
```

**Save and exit** (`:wq` in vim)

#### Step 4: Check Git Status

```bash
git status
```

**Output:**
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        calculator.sh

nothing added to commit but untracked files present (use "git add" to track)
```

**Translation:** Git sees `calculator.sh` but doesn't know if you want it tracked.

#### Step 5: Track the File

```bash
# Add file to staging area
git add calculator.sh

# Check status
git status
```

**Output:**
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   calculator.sh
```

#### Step 6: Commit (Create Version 1)

```bash
git commit -m "This is my first version of addition"
```

**Output:**
```
[main (root-commit) a1b2c3d] This is my first version of addition
 1 file changed, 2 insertions(+)
 create mode 100644 calculator.sh
```

**Check status:**
```bash
git status

# Output:
# On branch main
# nothing to commit, working tree clean
```

✅ **Version 1 created!**

#### Step 7: Make Changes (Version 2)

```bash
# Edit file
vim calculator.sh
```

**calculator.sh (Version 2):**
```bash
#!/bin/bash
# Addition of two numbers
x = a + b

# Subtraction functionality
y = a - b
```

**Save and check status:**
```bash
git status
```

**Output:**
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   calculator.sh

no changes added to commit (use "git add" and/or "git commit -a")
```

#### Step 8: See Exact Changes

```bash
git diff
```

**Output:**
```diff
diff --git a/calculator.sh b/calculator.sh
index a1b2c3d..e4f5g6h 100644
--- a/calculator.sh
+++ b/calculator.sh
@@ -1,2 +1,5 @@
 #!/bin/bash
 # Addition of two numbers
 x = a + b
+
+# Subtraction functionality
+y = a - b
```

**Explanation:**
- Lines with `+` are **added**
- Lines with `-` would be **removed**

#### Step 9: Commit Version 2

```bash
# Stage changes
git add calculator.sh

# Commit with message
git commit -m "This is my second version - added subtraction"
```

#### Step 10: View Commit History

```bash
git log
```

**Output:**
```
commit e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9 (HEAD -> main)
Author: Abhishek <abhishek@example.com>
Date:   Mon Jan 6 10:30:00 2025 +0000

    This is my second version - added subtraction

commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
Author: Abhishek <abhishek@example.com>
Date:   Mon Jan 6 10:00:00 2025 +0000

    This is my first version of addition
```

#### Step 11: Revert to Previous Version

**Scenario:** Manager says "Remove subtraction, go back to just addition"

```bash
# Copy commit ID of Version 1
# From git log output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

git reset --hard a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Output:**
```
HEAD is now at a1b2c3d This is my first version of addition
```

**Verify:**
```bash
cat calculator.sh
```

**Output:**
```bash
#!/bin/bash
# Addition of two numbers
x = a + b
```

✅ **Successfully reverted to Version 1!**

## Understanding Git Internals

### The .git Folder

```bash
ls -la .git/
```

**Output:**
```
drwxr-xr-x  config       # Configuration settings
drwxr-xr-x  HEAD         # Points to current branch
drwxr-xr-x  hooks/       # Pre/post commit scripts
drwxr-xr-x  objects/     # All file content (compressed)
drwxr-xr-x  refs/        # Branch and tag references
```

### Key Components

#### 1. **objects/** - The Database
- Stores all file content
- Everything is an **object** in Git
- Compressed and hashed
- Every file, every version is here

#### 2. **refs/** - References
- Stores branch pointers
- Tags
- Remote tracking branches

#### 3. **hooks/** - Automation Scripts
```bash
# Example: Prevent committing passwords
# .git/hooks/pre-commit

#!/bin/bash
if grep -r "password=" .; then
    echo "Error: Password found in code!"
    exit 1
fi
```

#### 4. **config** - Repository Configuration
```bash
cat .git/config
```

**Example:**
```ini
[core]
    repositoryformatversion = 0
    filemode = true
[remote "origin"]
    url = https://github.com/username/repo.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
    remote = origin
    merge = refs/heads/main
```

#### 5. **HEAD** - Current Position
```bash
cat .git/HEAD
```

**Output:**
```
ref: refs/heads/main
```

**Meaning:** You're currently on the `main` branch

### How Git Tracks Changes

```
File (calculator.sh)
       ↓
Git creates hash (SHA-1)
       ↓
Stores in objects/ folder
       ↓
Tracks in staging area
       ↓
Commits to repository
```

**Every commit gets unique ID:**
```
a1b2c3d4e5f6... → Version 1
e4f5g6h7i8j9... → Version 2
```

## Creating a GitHub Repository

### Step 1: Create GitHub Account

1. Go to [github.com](https://github.com)
2. Click **Sign Up**
3. Enter email, create password
4. Verify email
5. Complete profile

### Step 2: Create New Repository

**Method 1: From GitHub Homepage**

1. Click **"+"** icon (top-right)
2. Select **"New repository"**

**Method 2: From Repositories Tab**

1. Go to **Repositories** tab
2. Click green **"New"** button

### Step 3: Repository Settings

```
Repository Name: abhishek-shell-example-project

Description: My first shell scripting calculator program

Visibility:
  ● Public  - Anyone can see (open source)
  ○ Private - Only you and invited collaborators

Initialize:
  ☑ Add a README file
  ☐ Add .gitignore
  ☐ Choose a license
```

### Step 4: Click "Create Repository"

### Step 5: Repository Created!

You'll see:
```
https://github.com/username/abhishek-shell-example-project

Code    Issues    Pull requests    Actions    Projects    Wiki    Settings
```

### Understanding Repository Options

#### Public vs Private

| Public | Private |
|--------|---------|
| ✅ Anyone can view | ❌ Only invited users |
| ✅ Good for open source | ✅ Good for proprietary code |
| ✅ Free unlimited | ✅ Free (with limits) |
| ✅ Community contributions | ✅ Team collaboration only |

#### README File

**Purpose:** Documentation for your project

**Example README.md:**
```markdown
# Calculator Shell Script

## Description
A simple calculator that performs basic arithmetic operations.

## Features
- Addition
- Subtraction
- Multiplication
- Division

## Usage
```bash
./calculator.sh
```

## Author
Abhishek
```

### Connecting Local Repo to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/username/repo-name.git

# Verify remote
git remote -v

# Output:
# origin  https://github.com/username/repo-name.git (fetch)
# origin  https://github.com/username/repo-name.git (push)

# Push local commits to GitHub
git push -u origin main
```

**What happened:**
- Your local commits are now on GitHub
- Anyone with access can see your code
- Collaboration can begin!

### GitHub Features Overview

#### 1. **Fork** 🍴
Create personal copy of someone's repository

#### 2. **Issues** 🐛
Track bugs, feature requests, tasks

#### 3. **Pull Requests** 🔀
Propose changes, code review

#### 4. **Actions** ⚙️
CI/CD automation

#### 5. **Projects** 📊
Kanban boards for project management

#### 6. **Wiki** 📚
Documentation pages

#### 7. **Security** 🔒
Vulnerability scanning, secret detection

## Interview Questions

### Q1: What are the two main problems that Version Control Systems solve?

**Answer:**
1. **Code Sharing** - Enables multiple developers to collaborate on the same codebase efficiently
2. **Versioning** - Maintains history of changes, allowing reverting to previous versions

### Q2: What is the difference between Centralized and Distributed Version Control Systems?

**Answer:**

**Centralized (SVN, CVS):**
- Single central server
- All operations require server connection
- Single point of failure
- Examples: SVN, CVS, Perforce

**Distributed (Git):**
- Every developer has full repository copy
- Work offline, commit locally
- No single point of failure
- Multiple copies ensure resilience
- Examples: Git, Mercurial

### Q3: What is a Fork in Git?

**Answer:**
A **fork** is a complete copy of an entire repository, including all code, history, and branches.

**Use Cases:**
- Contributing to open source projects
- Experimenting without affecting original
- Creating personal variations
- Backup and redundancy

**Example:**
```
Original: github.com/company/calculator
Your Fork: github.com/yourname/calculator
(Both have complete history)
```

### Q4: What is the difference between Git and GitHub?

**Answer:**
- **Git**: Open-source distributed version control **system** (the tool)
- **GitHub**: Cloud-based **hosting service** for Git repositories with collaboration features

**Analogy:** Git is like email protocol; GitHub is like Gmail

**Alternatives to GitHub:**
- GitLab (DevOps-focused)
- Bitbucket (Atlassian)
- Self-hosted Git

### Q5: Explain the Git lifecycle (git add, git commit, git push)

**Answer:**

```
1. git add → Moves files to staging area (marks for commit)
2. git commit → Saves staged changes as a version with message
3. git push → Uploads local commits to remote repository

Working Dir → Staging → Local Repo → Remote Repo
```

**Example:**
```bash
# 1. Stage changes
git add calculator.sh

# 2. Commit locally
git commit -m "Added subtraction feature"

# 3. Push to GitHub
git push origin main
```

### Q6: How do you revert to a previous version in Git?

**Answer:**

**Method 1: Hard Reset (destructive)**
```bash
# View commit history
git log

# Copy commit ID
# Reset to that commit
git reset --hard <commit-id>
```

**Method 2: Revert (creates new commit)**
```bash
git revert <commit-id>
```

**Method 3: Checkout specific file**
```bash
git checkout <commit-id> -- filename.txt
```

### Q7: What is the purpose of the .git folder?

**Answer:**
The `.git` folder is Git's **internal database** that tracks everything:

**Contains:**
- **objects/** - All file content (compressed, hashed)
- **refs/** - Branch and tag pointers
- **config** - Repository configuration
- **HEAD** - Current branch pointer
- **hooks/** - Automation scripts

**Important:** Deleting `.git` removes all Git tracking!

### Q8: What is git diff used for?

**Answer:**
`git diff` shows **exact changes** made to files.

**Usage:**
```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Compare two commits
git diff commit1 commit2

# Compare two branches
git diff branch1 branch2
```

**Output Example:**
```diff
+ Added line
- Removed line
  Unchanged line
```

### Q9: What is git status and why is it important?

**Answer:**
`git status` shows the **current state** of your repository.

**Shows:**
- Untracked files (new files Git doesn't know about)
- Modified files (tracked files with changes)
- Staged files (ready to commit)
- Current branch
- Commits ahead/behind remote

**Best Practice:** Run `git status` frequently to understand repository state!

### Q10: What is the difference between git add . and git add <filename>?

**Answer:**

| Command | Action |
|---------|--------|
| `git add <filename>` | Stage specific file |
| `git add .` | Stage all changes in current directory |
| `git add -A` | Stage all changes in entire repository |

**Example:**
```bash
# Stage single file
git add calculator.sh

# Stage all files
git add .

# Stage everything (including deletions)
git add -A
```

### Q11: How do you undo a git add (unstage files)?

**Answer:**
```bash
# Unstage specific file
git restore --staged calculator.sh

# Unstage all files
git restore --staged .

# Alternative (older method)
git reset HEAD calculator.sh
```

### Q12: What are the three states of files in Git?

**Answer:**

1. **Modified** - Changed but not staged
2. **Staged** - Marked for commit (after `git add`)
3. **Committed** - Saved in repository (after `git commit`)

```
Modified → git add → Staged → git commit → Committed
```

## Key Takeaways

### ✅ Core Concepts Mastered

1. **Version Control Purpose**
   - Sharing code efficiently
   - Maintaining version history

2. **VCS Evolution**
   - Centralized (SVN) → Single point of failure
   - Distributed (Git) → Resilient, offline work

3. **Git vs GitHub**
   - Git = Technology/Tool
   - GitHub = Hosting Service with features

4. **Git Lifecycle**
   - `git add` → Stage
   - `git commit` → Save version
   - `git push` → Share

5. **Essential Commands**
   - `git init`, `git status`, `git diff`
   - `git add`, `git commit`, `git log`
   - `git reset`, `git push`, `git pull`

### 🎯 Practical Skills Acquired

- ✅ Initialize Git repository
- ✅ Track files and changes
- ✅ Create versions (commits)
- ✅ View history and differences
- ✅ Revert to previous versions
- ✅ Create GitHub repository
- ✅ Understand `.git` internals

### 📚 What's Next?

**Day 10 Topics:**
- Deep dive into GitHub features
- Issues and Pull Requests
- GitHub Actions (CI/CD)
- Code review process
- Branch management
- Collaboration workflows
- GitHub security features
- Project management tools

### 💡 Best Practices

1. **Commit Often** - Small, frequent commits are better than large ones
2. **Write Clear Messages** - Describe what and why, not how
3. **Check Status** - Use `git status` frequently
4. **Review Changes** - Use `git diff` before committing
5. **Keep History Clean** - Make logical, atomic commits

### 🔗 Helpful Resources

**Official Documentation:**
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

**Practice Platforms:**
- [Learn Git Branching](https://learngitbranching.js.org/)
- [GitHub Learning Lab](https://lab.github.com/)

---

## 🤝 Contributing

Questions or improvements? 
- Open an issue
- Submit a pull request
- Share your feedback in comments

---

## 📊 Git Command Cheat Sheet

### Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Basic Workflow
```bash
git init                          # Initialize repository
git add <file>                    # Stage file
git add .                         # Stage all files
git commit -m "message"           # Commit changes
git status                        # Check status
git diff                          # See changes
git log                           # View history
git log --oneline                 # Compact history
```

### Undoing Changes
```bash
git restore <file>                # Discard local changes
git restore --staged <file>       # Unstage file
git reset --hard <commit-id>      # Reset to commit
git revert <commit-id>            # Revert commit (safe)
```

### Remote Operations
```bash
git remote add origin <url>       # Add remote
git push -u origin main           # Push to remote
git pull origin main              # Pull from remote
git clone <url>                   # Clone repository
```

---

**Remember:** Git is a powerful tool that becomes intuitive with practice. Start with the basics, and gradually explore advanced features. The most important thing is understanding **why** version control exists and the problems it solves! 🚀
