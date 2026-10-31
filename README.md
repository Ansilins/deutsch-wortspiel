# Deutsch Wortspiel

A small game for learning German A1, A2 and B1 vocabulary in bite-sized units, plus a numbers-only track (Zahlen): flashcards, quizzes, listening, matching pairs, a word list, and speaking practice with a pronunciation score.

**Play it:** https://ansilins.github.io/deutsch-wortspiel/

## Put it on an iPhone home screen

1. Open the link above in **Safari**.
2. Tap **Share** (on iOS 26 it sits in the **⋯** menu), then **Add to Home Screen**.
3. Keep **Open as Web App** switched on and tap **Add**.

The game then opens full screen from its own icon. Open it once from the icon while you're online; after that it works offline.

Progress is saved inside the Home Screen app on that device. It is separate from Safari and from other devices, and removing the icon deletes it.

Speaking practice uses a speech checker that runs on the phone. The first time you use it, it downloads about 80 MB (Wi-Fi is best); after that it works offline.

## Building

`index.html`, `sw.js`, `manifest.webmanifest` and `asr-worker.js` are generated. Edit the files in `src/` and run:

```
python3 src/build.py
```

Word lists are based on minddory.com's German A1 and A2 vocabulary lists. The B1 words are the headwords of the Goethe-Zertifikat B1 Wortliste (via github.com/ilkermeliksitki/goethe-institute-wordlist), minus words already in A1 or A2. English meanings, articles and topics were added for this game.
