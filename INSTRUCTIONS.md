# 🚀 SoleerDevs 3-Day Solana Boot Camp: Your Journey to Web3 Development! 🚀

Welcome, aspiring Solana developers! This repository is your central hub for the SoleerDevs 3-Day Solana Boot Camp. Here, you'll find all the starter code, resources, and instructions you need to build your first decentralized applications (dApps) on the Solana blockchain.

Our goal is to make learning Web3 accessible and fun. By the end of this bootcamp, you'll have hands-on experience with Solana fundamentals, wallet integration, transactions, and even interacting with smart contracts (programs)!

---

## 📅 Boot Camp Overview & Schedule

This boot camp is structured to guide you step-by-step through core Solana development concepts. Each day builds upon the last.

### Pre-Workshop (Distributed 1 Week Before)
To ensure a smooth start, please complete the following setup before Day 1:
* **Setup Guide:** Follow the detailed instructions for installing Node.js, Git, and VS Code.
* **Phantom Wallet Installation:** Install and set up your Phantom Wallet. Remember to connect it to the **Devnet** for the bootcamp.
* **Optional Pre-reading:** Review the provided beginner-friendly links to get a head start.
* **GitHub Repository Access:** You're already here!

### Day 1: Solana Basics & Wallet Connection (1h 30m)
**Goal:** Understand Solana fundamentals and connect your first wallet.
* **Welcome & Introduction:** Overview, quick intros, environment setup verification.
* **Solana Fundamentals:** Simple explanation of Solana, its differences from traditional web apps, exploring Solana Explorer, and key terms (SOL, wallet, transaction).
* **Connect Your First Wallet (Hands-on):** Walk through starter code (pre-configured React app), add wallet connection button, display connection status and wallet address.
* **Build a Simple Dashboard (Hands-on):** Display SOL balance, add basic styling, bonus disconnect button.
* **Day 1 Project Outcome:** A functioning wallet dashboard that connects to Phantom and displays your SOL balance.

### Day 2: Sending Transactions & Working with Tokens (1h 30m)
**Goal:** Learn about Solana transactions and work with SPL tokens.
* **Quick Recap & Setup:** Review Day 1, import Day 2 starter code, environment check.
* **Understanding Solana Transactions:** Simple explanation, viewing transactions in Solana Explorer, transaction fees. Hands-on: Create an airdrop button (on Devnet).
* **Token Basics:** What are SPL tokens? Viewing tokens. Hands-on: Display token balances in your dashboard.
* **Send Your First Transaction (Hands-on):** Create a simple send SOL form, implement the send function, add notifications.
* **Day 2 Project Outcome:** A wallet app that displays your balance and allows you to send SOL to another address.

### Day 3: Data & Bringing It All Together (1h 30m)
**Goal:** Fetch blockchain data and integrate with an Anchor program.
* **Quick Recap & Setup:** Review Days 1 & 2, import Day 3 starter code, environment check.
* **Fetching Blockchain Data (Hands-on):** Understand account data, use Solana's connection methods. Hands-on: Fetch and display recent transactions.
* **Introduction to Anchor:** What is Anchor and why is it used? Simple explanation of programs vs. clients.
* **Integrating with Anchor (Hands-on):** Connect to a sample Anchor program, create a simple message board, post and display messages.
* **Day 3 Project Outcome:** A complete application that connects to wallets, sends transactions, and interacts with an Anchor program.

---

## 🛠️ Technical Requirements (Simplified)

To participate effectively, please ensure you have the following set up:
* **Basic JavaScript knowledge:** Familiarity with JavaScript fundamentals is helpful. React experience is a bonus but not required.
* **Node.js:** Installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).
* **Git:** Installed on your computer. Download from [git-scm.com](https://git-scm.com/).
* **VS Code (Recommended):** A popular code editor. Download from [code.visualstudio.com](https://code.visualstudio.com/).
* **Phantom Wallet:** Browser extension installed. Get it from [phantom.app](https://phantom.app/).
* **Willingness to learn and experiment!**

---

## 💻 Getting Started: Cloning the Repository

Before the boot camp begins, you need to get a copy of this repository onto your computer. This process is called "cloning."

**Step 1: Install Git (If you haven't already)**
Git is a version control system essential for cloning repositories.
* Go to [git-scm.com](https://git-scm.com/downloads) and download/install Git for your operating system.
* **Verify Installation:** Open your terminal (macOS/Linux) or Command Prompt/Git Bash (Windows) and type:
    ```bash
    git --version
    ```
    You should see a version number (e.g., `git version 2.39.2`).

**Step 2: Clone the Repository to Your Local Machine**
This command makes a copy of the entire repository on your computer.
1.  **Open your Terminal or Command Prompt:** This is where you'll type commands.
2.  **Navigate to your desired folder:** Use the `cd` command to go to the directory where you want to save your bootcamp files. For example:
    ```bash
    cd Documents/
    # or
    cd Desktop/
    ```
3.  **Clone the repository:** Copy the HTTPS URL of this GitHub repository (you can find it by clicking the green "Code" button on the GitHub page). Then, in your terminal, type:
    ```bash
    git clone https://github.com/SoleerLabs/Solana-Bootcamp-Intro
    ```
4.  **Navigate into the cloned folder:**
    ```bash
    cd solana-bootcamp-intro 
    ```

**Step 3: Install Node.js Dependencies for Each Day's Starter Code**
Each day's practical session will have a `starter-code` folder. You'll need to install its dependencies.
1.  **For Day 1:**
    ```bash
    cd day-1/starter-code
    npm install # or yarn install
    ```
2.  **To run the app for Day 1:**
    ```bash
    npm run dev # or yarn dev
    ```
    This will usually open your browser to `http://localhost:3000`.

*You will repeat similar `cd` and `npm install` steps for `day-2/starter-code` and `day-3/starter-code` at the start of those respective days.*

---

## 📝 Submitting Your Work: Creating and Sending a Pull Request

To submit your completed tasks for review, you will use a process called a "Pull Request" (PR) on GitHub. This is a standard way developers contribute to projects and get their code reviewed. Don't worry, we'll walk you through it!

**Important: Work on a New Branch for Your Submissions!**

To avoid conflicts and keep your work organized, you should always create a new "branch" for your changes. Think of a branch as a separate copy of the code where you can work without affecting the main project until your changes are ready.

**Before you start working on any day's tasks:**

**Step 1: Create a New Branch for Your Work**
1.  **Make sure you are in the correct `starter-code` directory for the day you are working on.** For example, `cd day-1/starter-code`.
2.  **Create a new branch and switch to it:**
    ```bash
    git checkout -b your-github-username-day1-submission
    ```
    *Replace `your-github-username` with your actual GitHub username.*
    *Example:* `git checkout -b aliphatic-submission`

**After you have completed your tasks for the day:**

**Step 2: Add Your Changes to Git**
This command tells Git to start tracking the changes you've made.
1.  Ensure you are in the `day-X/starter-code` directory for the day you've completed.
2.  Add all modified files:
    ```bash
    git add .
    ```
    *(The `.` means "all changes in the current directory and its subdirectories").*

**Step 3: Commit Your Changes**
This command saves your changes with a descriptive message.
1.  Create a commit:
    ```bash
    git commit -m "Complete Day 1 Solana Bootcamp tasks"
    ```
    *Your commit message should briefly describe what you've done.*

**Step 4: Push Your Branch to GitHub**
This sends your new branch with your committed changes to the GitHub repository.
1.  Push your branch:
    ```bash
    git push origin your-github-username-day1-submission
    ```
    *(If this is your first time pushing this branch, Git might give you a command like `git push --set-upstream origin your-github-username-day1-submission`. Just copy and paste that command and run it.)*

**Step 5: Create a Pull Request (PR) on GitHub**
1.  **Go to the GitHub repository in your web browser.**
2.  **You should see a prominent banner** that says "your-github-username-day1-submission had recent pushes. Compare & pull request." Click on this button.
3.  **Review the Pull Request page:**
    * **Base:** Ensure it's set to `main` or `master` (the default branch).
    * **Compare:** This should be your new branch (`your-github-username-day1-submission`).
    * **Title:** Give your PR a clear title (e.g., "ALIPHATIC - Day 1 Solana Bootcamp Submission").
    * **Description:** In the description box, briefly explain what you've completed, any challenges you faced, or any questions you have.
4.  **Click "Create pull request."**

**Step 6: Wait for Review!**
Once your PR is open, our instructors will review your code. They might leave comments or suggest changes. You can respond to comments and push new commits to your branch, which will automatically update your PR.

---

## 🤝 Resources & Support

We're here to help you succeed!
* **GitHub Repository:** You're already here! All code samples will be available in the `day-X/starter-code` folders.
* **Beginner-Friendly Cheat Sheet:** Check the `resources/cheat-sheet.md` for common commands and Solana concepts.
* **Troubleshooting Guide:** The `resources/troubleshooting.md` file contains solutions to common errors.
* **Telegram Community:** Join our Telegram for real-time questions, discussions, and community support: [https://t.me/+MVrJNLIGo7s1ZmRk]
* **Office Hours:** We'll be holding two 1-hour office hours sessions in the week following the workshop for any lingering questions. Details will be shared in the Telegram channel.

We're excited to build the future of Web3 with you! Let's get started! 🔥🚀