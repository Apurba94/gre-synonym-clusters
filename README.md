# Synonym Clusters

Learn GRE words in meaning groups, then sort mixed words into their groups against the clock.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Synonym Clusters.exe` from the [latest release](https://github.com/Apurba94/gre-synonym-clusters/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-synonym-clusters/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Words are easier to remember in families. This app groups over 200 GRE words into 36 meaning clusters, each paired with its opposite cluster, such as praise and criticize, or stingy and generous. Sentence Equivalence rewards exactly this kind of knowledge: you must spot two words that mean the same.

Sections: Clusters, Sort, Odd one out, Progress, About.

## How to use it

1. Study a cluster and its opposite in **Clusters**.
2. Test yourself in **Sort**: put each word into its group.
3. Play **Odd one out** to tell near-synonyms from their opposites.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (24 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
