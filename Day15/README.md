# Ansible Zero to Hero - Hands-On Guide 🚀

> Day 15 of 45 Days DevOps Course - From Installation to Advanced Ansible Roles

## 📋 Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Part 1: Installation](#part-1-installation)
- [Part 2: Passwordless Authentication](#part-2-passwordless-authentication)
- [Part 3: Ansible Ad-Hoc Commands](#part-3-ansible-ad-hoc-commands)
- [Part 4: Writing Ansible Playbooks](#part-4-writing-ansible-playbooks)
- [Part 5: Ansible Roles](#part-5-ansible-roles)
- [Inventory File Management](#inventory-file-management)
- [Interview Questions](#interview-questions)
- [Practical Examples](#practical-examples)
- [Key Takeaways](#key-takeaways)

## Introduction

This comprehensive guide takes you from **Ansible installation to writing production-ready playbooks and roles**. By the end, you'll be able to:
- Install and configure Ansible
- Manage multiple servers effortlessly
- Write both ad-hoc commands and playbooks
- Create structured, maintainable Ansible roles
- Ace Ansible interview questions

## Prerequisites

### Recommended Setup
- **Primary**: Linux machine (Ubuntu/CentOS)
- **Alternative**: Mac or Windows (with some adjustments)
- **AWS**: 2 EC2 instances (1 Ansible control node + 1 target server)
- **Minimum Knowledge**: Basic Linux commands, SSH understanding

### Why Linux First?
Starting with Linux makes the learning process smoother. Once comfortable, you can adapt to Mac or Windows.

## Part 1: Installation

### Installing Ansible on Ubuntu

**Step 1: Update Package Manager**
```bash
sudo apt update
```

**Step 2: Install Ansible**
```bash
sudo apt install ansible -y
```

**Step 3: Verify Installation**
```bash
ansible --version
```

**Expected Output:**
```
ansible [core 2.x.x]
  config file = /etc/ansible/ansible.cfg
  configured module search path = ...
  python version = 3.x.x
```

### Installing on Other Systems

#### macOS
```bash
brew install ansible
```

#### Windows
```bash
choco install ansible
```

#### Using Python pip (Universal)
```bash
# Install Python 3
# Install pip
pip3 install ansible
```

> **Note:** Using package managers (apt, brew, choco) is recommended as they automatically add Ansible to your PATH.

## Part 2: Passwordless Authentication

### The Requirement
Ansible requires **passwordless SSH authentication** to manage remote servers. This is a **mandatory prerequisite**.

### Setup Process

#### On Ansible Control Node (Your laptop/server)

**Step 1: Generate SSH Key Pair**
```bash
ssh-keygen
```

**Prompts:**
- **File location**: Press Enter (default: `/home/ubuntu/.ssh/id_rsa`)
- **Passphrase**: Press Enter twice (no passphrase)

**Step 2: View Your Public Key**
```bash
cat ~/.ssh/id_rsa.pub
```

**Step 3: Copy the Public Key**
Copy the entire output (starts with `ssh-rsa...`)

#### On Target Server

**Step 1: Generate SSH Keys (if not exists)**
```bash
ssh-keygen
```

**Step 2: Add Public Key to Authorized Keys**
```bash
# Open the authorized_keys file
nano ~/.ssh/authorized_keys

# Paste the public key from control node
# Save and exit (Ctrl+X, then Y, then Enter)
```

**Step 3: Set Correct Permissions (if needed)**
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

#### Verify Passwordless Authentication

```bash
# From Ansible control node
ssh ubuntu@<TARGET_SERVER_PRIVATE_IP>
```

**Expected Result:** You should connect **without entering a password**! 🎉

### Architecture Diagram

```
┌─────────────────────────┐
│  Ansible Control Node   │
│  (Your Laptop/Server)   │
│                         │
│  Public Key: id_rsa.pub │ ──┐
│  Private Key: id_rsa    │   │
└─────────────────────────┘   │
                              │ Copy public key
                              │
                              ▼
           ┌──────────────────────────────┐
           │     Target Server            │
           │                              │
           │  ~/.ssh/authorized_keys      │
           │  [Contains public key]       │
           └──────────────────────────────┘
```

### For Multiple Servers

**Repeat for each additional server:**
```bash
# Copy same public key to Server 2
ssh ubuntu@<SERVER_2_IP>
nano ~/.ssh/authorized_keys
# Paste public key, save, exit

# Copy same public key to Server 3
ssh ubuntu@<SERVER_3_IP>
nano ~/.ssh/authorized_keys
# Paste public key, save, exit
```

## Part 3: Ansible Ad-Hoc Commands

### What Are Ad-Hoc Commands?

Ad-hoc commands are **one-liners for quick tasks**—no playbook needed!

**Use Cases:**
- Creating files
- Checking disk space
- Installing a single package
- Running quick commands on multiple servers

### Creating an Inventory File

```bash
# Create inventory file
nano inventory

# Add server IPs
172.31.62.28
```

### Basic Syntax

```bash
ansible -i <inventory_file> <host_pattern> -m <module> -a "<arguments>"
```

**Components:**
- `-i`: Inventory file location
- `<host_pattern>`: Which servers (IP, group name, or `all`)
- `-m`: Module to use
- `-a`: Arguments for the module

### Practical Examples

#### Example 1: Create a File

```bash
ansible -i inventory all -m shell -a "touch devops-class"
```

**Explanation:**
- `-i inventory`: Use our inventory file
- `all`: Run on all servers in inventory
- `-m shell`: Use shell module
- `-a "touch devops-class"`: Create a file named "devops-class"

**Output:**
```
172.31.62.28 | CHANGED | rc=0 >>
```

**Verify on target server:**
```bash
ls -ltr
# You'll see the devops-class file!
```

#### Example 2: Check CPU Count

```bash
ansible -i inventory all -m shell -a "nproc"
```

**Output:**
```
172.31.62.28 | CHANGED | rc=0 >>
1
```

#### Example 3: Check Disk Usage

```bash
ansible -i inventory all -m shell -a "df -h"
```

**Output:**
```
172.31.62.28 | CHANGED | rc=0 >>
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1       8.0G  2.1G  5.9G  27% /
...
```

#### Example 4: Copy Files

```bash
ansible -i inventory all -m copy -a "src=/path/to/source dest=/path/to/destination owner=ubuntu"
```

### Finding Available Modules

**Browse all Ansible modules:**
1. Visit: [https://docs.ansible.com/ansible/latest/collections/](https://docs.ansible.com/ansible/latest/collections/)
2. Search for specific functionality (e.g., "copy", "user", "service")
3. Read examples and parameters

**Common Modules:**
- `shell` - Execute shell commands
- `copy` - Copy files
- `file` - Manage files and directories
- `yum/apt` - Package management
- `service` - Manage services
- `user` - Manage users

### Ad-Hoc vs Playbooks

| Ad-Hoc Commands | Playbooks |
|----------------|-----------|
| Quick, one-off tasks | Multiple tasks |
| 1-2 commands | 10+ tasks |
| No file needed | YAML file |
| Direct execution | Reusable |
| **Example**: Create a file | **Example**: Install & configure Nginx |

## Part 4: Writing Ansible Playbooks

### What is a Playbook?

An Ansible **Playbook** is a YAML file containing multiple tasks—like a script for Ansible.

**Naming Convention:** Use `.yaml` or `.yml` extension

### Scenario: Install and Start Nginx

**Goal:** Install Nginx web server and start the service on target servers.

### Creating Your First Playbook

```bash
# Create playbook file
nano first-playbook.yaml
```

### Playbook Structure

```yaml
---
- name: Install and start nginx
  hosts: all
  become: true
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
    
    - name: Start nginx
      service:
        name: nginx
        state: started
```

### Understanding the Structure

#### 1. **YAML Start Marker**
```yaml
---
```
Indicates this is a YAML file

#### 2. **Playbook Definition**
```yaml
- name: Install and start nginx
```
- The `-` indicates a list item (you can have multiple playbooks)
- `name`: Descriptive name of what this playbook does

#### 3. **Hosts**
```yaml
hosts: all
```
- Which servers to run on
- `all`: All servers in inventory
- Can be specific IPs or groups

#### 4. **Become Root**
```yaml
become: true
```
- Execute tasks with root privileges (like using `sudo`)
- Required for package installation
- Alternative: `become_user: root`

#### 5. **Tasks Section**
```yaml
tasks:
```
List of actions to perform

#### 6. **Individual Tasks**

**Task 1: Install Nginx**
```yaml
- name: Install nginx
  apt:
    name: nginx
    state: present
```

**Alternative (using shell):**
```yaml
- name: Install nginx
  shell: apt install nginx -y
```

**Task 2: Start Nginx**
```yaml
- name: Start nginx
  service:
    name: nginx
    state: started
```

**Alternative (using shell):**
```yaml
- name: Start nginx
  shell: systemctl start nginx
```

### Why Use Modules Over Shell?

| Approach | Pros | Cons |
|----------|------|------|
| **Module** (`apt`, `service`) | Generic, portable, idempotent | Module-specific syntax |
| **Shell** (`shell: apt install`) | Direct, familiar | OS-specific, less safe |

**Recommendation:** Use modules whenever possible!

### Executing the Playbook

```bash
ansible-playbook -i inventory first-playbook.yaml
```

**Output:**
```
PLAY [Install and start nginx] *****************************************

TASK [Gathering Facts] *************************************************
ok: [172.31.62.28]

TASK [Install nginx] ***************************************************
changed: [172.31.62.28]

TASK [Start nginx] *****************************************************
changed: [172.31.62.28]

PLAY RECAP *************************************************************
172.31.62.28               : ok=3    changed=2    unreachable=0    failed=0
```

**Verify on Target Server:**
```bash
sudo systemctl status nginx
```

**Expected:** Nginx should be **active (running)** ✅

### Understanding Execution Flow

1. **Gathering Facts** - Ansible collects system information
2. **Install nginx** - Installs the package
3. **Start nginx** - Starts the service

### Debugging with Verbose Mode

Want to see what Ansible is doing internally?

```bash
# Basic verbosity
ansible-playbook -i inventory first-playbook.yaml -v

# More verbosity
ansible-playbook -i inventory first-playbook.yaml -vv

# Maximum verbosity (debug mode)
ansible-playbook -i inventory first-playbook.yaml -vvv
```

**What you'll see:**
- SSH connection details
- Python dependencies check
- Module execution details
- JSON output of each task
- Return codes and status

## Inventory File Management

### Basic Inventory

```ini
# Simple list of IPs
172.31.62.28
172.31.62.29
172.31.62.30
```

### Grouping Servers

```ini
[webservers]
172.31.62.100
172.31.62.101

[dbservers]
172.31.62.200
172.31.62.201
```

### Using Groups in Playbooks

```yaml
---
- name: Configure web servers
  hosts: webservers  # Only web servers
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

- name: Configure database servers
  hosts: dbservers  # Only DB servers
  tasks:
    - name: Install MySQL
      apt:
        name: mysql-server
        state: present
```

### Running on Specific Groups

```bash
# Run on all web servers
ansible -i inventory webservers -m shell -a "uptime"

# Run on all DB servers
ansible -i inventory dbservers -m shell -a "free -m"

# Run on all servers
ansible -i inventory all -m ping
```

### Advanced Inventory

```ini
[webservers]
web1 ansible_host=172.31.62.100 ansible_user=ubuntu
web2 ansible_host=172.31.62.101 ansible_user=ubuntu

[dbservers]
db1 ansible_host=172.31.62.200 ansible_user=ubuntu ansible_port=2222

[production:children]
webservers
dbservers
```

## Part 5: Ansible Roles

### What Are Ansible Roles?

**Roles** are a way to **organize complex playbooks** into a structured, reusable format.

### When to Use Roles?

**Simple Task (2-5 tasks):** ✅ Use regular playbook
```yaml
# Just install and start nginx - simple!
```

**Complex Task (50+ tasks):** ✅ Use Ansible Role
```yaml
# Configure entire Kubernetes cluster
# - Install dependencies
# - Configure master node
# - Join worker nodes
# - Set up networking
# - Configure storage
# - Apply security policies
# ... 50+ more tasks
```

### Problem Without Roles

```yaml
---
# kubernetes-setup.yaml - 500 lines!
- name: Setup Kubernetes
  hosts: all
  tasks:
    - name: Task 1
      ...
    - name: Task 2
      ...
    # ... 50 more tasks
    - name: Variables
      ...
    - name: Handlers
      ...
    # Unmanageable! 😱
```

### Solution: Ansible Roles

Organize into structured folders:

```
kubernetes/
├── tasks/           # All tasks
├── handlers/        # Error handling
├── templates/       # Jinja2 templates
├── files/           # Static files
├── vars/            # Variables
├── defaults/        # Default variables
├── meta/            # Metadata
└── README.md        # Documentation
```

### Creating a Role

```bash
# Create role structure
ansible-galaxy role init kubernetes
```

**Output:**
```
Role kubernetes was created successfully
```

**Generated Structure:**
```bash
ls -ltr kubernetes/
total 0
drwxr-xr-x 2 ubuntu ubuntu  6 Jan  5 10:00 tests
drwxr-xr-x 2 ubuntu ubuntu  6 Jan  5 10:00 templates
drwxr-xr-x 2 ubuntu ubuntu 23 Jan  5 10:00 tasks
drwxr-xr-x 2 ubuntu ubuntu 22 Jan  5 10:00 meta
drwxr-xr-x 2 ubuntu ubuntu  6 Jan  5 10:00 handlers
drwxr-xr-x 2 ubuntu ubuntu  6 Jan  5 10:00 files
drwxr-xr-x 2 ubuntu ubuntu 22 Jan  5 10:00 defaults
drwxr-xr-x 2 ubuntu ubuntu 22 Jan  5 10:00 vars
-rw-r--r-- 1 ubuntu ubuntu  1328 Jan  5 10:00 README.md
```

### Role Directory Breakdown

| Directory | Purpose | Example |
|-----------|---------|---------|
| **tasks/** | Main tasks | Install packages, configure services |
| **handlers/** | Event handlers | Restart service if config changes |
| **templates/** | Jinja2 templates | Configuration file templates |
| **files/** | Static files | Certificates, index.html |
| **vars/** | Variables | Application-specific variables |
| **defaults/** | Default variables | Fallback values |
| **meta/** | Metadata | Author info, dependencies, license |
| **tests/** | Test playbooks | Unit tests for the role |

### Using Roles in Playbooks

**Main Playbook (site.yaml):**
```yaml
---
- name: Configure Kubernetes Cluster
  hosts: all
  roles:
    - kubernetes
```

**That's it!** All complexity is hidden in the `kubernetes/` role directory.

### Role Structure Example

```bash
kubernetes/
├── tasks/
│   └── main.yaml          # Install k8s, configure master, join workers
├── handlers/
│   └── main.yaml          # Restart kubelet if needed
├── templates/
│   └── kubeadm-config.j2  # Kubernetes config template
├── files/
│   └── ca.crt             # Certificate files
├── vars/
│   └── main.yaml          # K8s version, pod network CIDR
├── defaults/
│   └── main.yaml          # Default values
└── meta/
    └── main.yaml          # Role metadata
```

**tasks/main.yaml:**
```yaml
---
- name: Install Docker
  apt:
    name: docker.io
    state: present

- name: Install kubeadm
  apt:
    name: kubeadm
    state: present

- name: Initialize Kubernetes master
  shell: kubeadm init
  when: inventory_hostname in groups['masters']

# ... 40 more tasks
```

### Practical Role Example - JBoss

Visit the [GitHub repository](https://github.com/nischalstha08/ansible-examples) for complete working examples:

```bash
git clone https://github.com/nischalstha08/ansible-examples
cd ansible-examples/jboss-standalone
```

**Structure:**
```
jboss-standalone/
├── site.yaml              # Main playbook
└── roles/
    └── jboss-standalone/
        ├── tasks/
        ├── templates/
        ├── files/
        └── ...
```

**site.yaml:**
```yaml
---
- name: Install JBoss
  hosts: all
  roles:
    - jboss-standalone
```

**Execute:**
```bash
ansible-playbook -i inventory site.yaml
```

### Benefits of Roles

✅ **Organization** - Clear folder structure  
✅ **Reusability** - Use across projects  
✅ **Maintainability** - Easy to update  
✅ **Collaboration** - Team-friendly  
✅ **Sharing** - Publish to Ansible Galaxy  

## Interview Questions

### Q1: What is the difference between Ansible ad-hoc commands and Ansible playbooks?

**Answer:**
- **Ad-hoc commands**: For quick, one-off tasks (1-2 commands)
  ```bash
  ansible all -m shell -a "uptime"
  ```
- **Playbooks**: For multiple tasks, structured automation
  ```yaml
  # Complex multi-step process
  ```

**When to use what:**
- Creating a single file? → Ad-hoc
- Installing + configuring + starting service? → Playbook

### Q2: How do you group servers in Ansible?

**Answer:** Using the **inventory file** with group names in square brackets:

```ini
[webservers]
172.31.62.100
172.31.62.101

[dbservers]
172.31.62.200
```

**Usage:**
```bash
# Run only on web servers
ansible-playbook -i inventory site.yaml --limit webservers
```

### Q3: What is the purpose of `become: true` in Ansible?

**Answer:** `become: true` executes tasks with **root privileges** (equivalent to `sudo`).

**Required for:**
- Installing packages (`apt`, `yum`)
- Starting services
- Modifying system files

```yaml
- name: Install nginx
  become: true  # Needed for apt
  apt:
    name: nginx
    state: present
```

### Q4: What is passwordless authentication in Ansible and why is it needed?

**Answer:**
- Ansible uses **SSH** to connect to servers
- Passwordless authentication uses **SSH key pairs** (public + private key)
- Enables automation without manual password entry

**Setup:**
1. Generate key pair: `ssh-keygen`
2. Copy public key to target: Add to `~/.ssh/authorized_keys`
3. Connect without password: `ssh user@server`

### Q5: What is the difference between variables in `vars/`, `defaults/`, and `group_vars/`?

**Answer:**

| Location | Purpose | Priority |
|----------|---------|----------|
| **defaults/** | Default values (lowest priority) | Overridden by everything |
| **vars/** | Role-specific variables | Medium priority |
| **group_vars/** | Group-specific variables | High priority |

**Example:**
```yaml
# defaults/main.yaml
nginx_port: 80  # Default

# group_vars/webservers.yaml
nginx_port: 8080  # Overrides default for webservers
```

### Q6: What are Ansible handlers and when are they used?

**Answer:** Handlers are **tasks triggered by events** (e.g., config file change).

**Example:**
```yaml
tasks:
  - name: Update nginx config
    template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
    notify: Restart nginx  # Trigger handler

handlers:
  - name: Restart nginx
    service:
      name: nginx
      state: restarted
```

**Key Point:** Handlers only run **if a change occurs**.

### Q7: Why use Ansible roles instead of a single playbook?

**Answer:**
- **Organization**: Structure complex playbooks
- **Reusability**: Share across projects
- **Maintainability**: Easier to update
- **Collaboration**: Multiple people can work on different roles

**Example:** Kubernetes setup has 50+ tasks → Better as a role!

### Q8: What is the purpose of the `-vvv` flag?

**Answer:** Enables **maximum verbosity** (debug mode).

```bash
ansible-playbook site.yaml -vvv
```

**Shows:**
- SSH connection details
- Python dependencies
- Module execution internals
- JSON output
- Useful for troubleshooting

### Q9: Can Ansible work with both Windows and Linux?

**Answer:** Yes!
- **Linux**: Uses **SSH** protocol
- **Windows**: Uses **WinRM** (Windows Remote Management) protocol

```yaml
# Linux
- hosts: linux_servers
  tasks:
    - shell: ls -la

# Windows
- hosts: windows_servers
  tasks:
    - win_shell: dir
```

### Q10: What is `ansible-galaxy` used for?

**Answer:** `ansible-galaxy` is for:
1. **Creating role structure**: `ansible-galaxy role init <role_name>`
2. **Downloading community roles**: `ansible-galaxy install geerlingguy.nginx`
3. **Sharing your roles**: Publish to Ansible Galaxy

## Practical Examples

### Example 1: Create Multiple Files

```bash
ansible -i inventory all -m shell -a "touch file1 file2 file3"
```

### Example 2: Install Multiple Packages

```yaml
---
- name: Install development tools
  hosts: all
  become: true
  tasks:
    - name: Install packages
      apt:
        name:
          - git
          - vim
          - htop
          - curl
        state: present
```

### Example 3: Copy and Execute Script

```yaml
---
- name: Deploy and run script
  hosts: all
  tasks:
    - name: Copy script
      copy:
        src: /local/path/script.sh
        dest: /tmp/script.sh
        mode: '0755'
    
    - name: Execute script
      shell: /tmp/script.sh
```

### Example 4: Conditional Execution

```yaml
---
- name: Install packages based on OS
  hosts: all
  become: true
  tasks:
    - name: Install nginx on Ubuntu
      apt:
        name: nginx
        state: present
      when: ansible_distribution == "Ubuntu"
    
    - name: Install nginx on CentOS
      yum:
        name: nginx
        state: present
      when: ansible_distribution == "CentOS"
```

## Key Takeaways

### ✅ Essential Skills Learned

1. **Installation** - Set up Ansible on Ubuntu/Mac/Windows
2. **Passwordless Auth** - Configure SSH key-based authentication
3. **Ad-Hoc Commands** - Quick tasks without playbooks
4. **Playbooks** - Structured multi-task automation
5. **Inventory** - Organize and group servers
6. **Roles** - Structure complex playbooks efficiently

### 🎯 Ansible Workflow

```
1. Install Ansible
   ↓
2. Set up passwordless SSH
   ↓
3. Create inventory file
   ↓
4. Test with ad-hoc commands
   ↓
5. Write playbook for complex tasks
   ↓
6. Create roles for very complex scenarios
```

### 📚 Learning Path

**Beginner:**
- ✅ Install Ansible
- ✅ Configure passwordless authentication
- ✅ Run ad-hoc commands
- ✅ Write simple playbooks (2-5 tasks)

**Intermediate:**
- ✅ Organize inventory with groups
- ✅ Use variables and templates
- ✅ Create Ansible roles
- ✅ Handle errors with handlers

**Advanced:**
- ✅ Dynamic inventory
- ✅ Custom modules
- ✅ Ansible Tower/AWX
- ✅ Ansible Galaxy contributions

### 🔗 Additional Resources

**GitHub Repository:**
[https://github.com/nischalstha08/ansible-examples](https://github.com/nischalstha08/ansible-examples)

**Official Documentation:**
- [Ansible Docs](https://docs.ansible.com/)
- [Ansible Modules](https://docs.ansible.com/ansible/latest/collections/)
- [Ansible Galaxy](https://galaxy.ansible.com/)

**Video Resources:**
- Day 14: Configuration Management Theory
- 18 Ansible Interview Questions (link in video description)

### 🚀 Next Steps

1. **Practice** - Create 2 EC2 instances and replicate examples
2. **Experiment** - Try different modules from Ansible docs
3. **Build** - Create your own role for a real use case
4. **Share** - Contribute to ansible-examples repository

### 💡 Pro Tips

1. **Start Simple** - Master ad-hoc before playbooks, playbooks before roles
2. **Use Modules** - Prefer `apt` over `shell: apt install`
3. **Test Locally** - Use `-vvv` for debugging
4. **Version Control** - Store playbooks in Git
5. **Documentation** - Always add comments in playbooks

---

## 🤝 Contributing

Found issues or have improvements?
- Open an issue on GitHub
- Submit a pull request
- Share your playbooks with the community

---

**Real-World Use Case:**
```
Terraform creates 3 EC2 instances
         ↓
Ansible configures:
  - 1 Kubernetes Master
  - 2 Kubernetes Workers
```

This is how DevOps engineers work in production! 🎉

---

**Remember:** Ansible is powerful but simple. Focus on understanding the basics thoroughly, and complex scenarios will become manageable! 🚀