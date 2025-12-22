# Deploy a Team Nostr Relay for Free

**An interactive step-by-step guide for deploying a fully functional team Nostr relay for $0/month forever.**

---

## What is This?

This is an interactive, self-hosted guide for deploying a **Swarm relay** (a Nostr relay built on Khatru) using **Fly.io** and **Neon DB** - completely free.

By the end of this guide, you'll have:
- ✅ A fully functional team Nostr relay running 24/7
- ✅ PostgreSQL database for event storage via Neon
- ✅ WebSocket support for Nostr clients
- ✅ Support for text notes, reactions, long-form content, and zaps
- ✅ User access control via nostr.json
- ✅ Zero monthly costs ($0/month forever)
- ✅ No credit card required

## Quick Start

1. **Visit the live guide:**
2. **Follow the 6 steps** (takes ~20-30 minutes total)
3. **Test with Jumble.social** or nostrdebug.com/query
4. **Share your relay URL with your team!**

## Features

### 📚 Interactive Checklist
- Step-by-step instructions with video tutorials
- Copy-paste commands and configuration snippets
- Progress tracking as you complete each step
- Expandable/collapsible sections

### 🎯 What You'll Set Up
- **Step 0:** Overview & Prerequisites
- **Step 1:** Create a free PostgreSQL database (Neon)
- **Step 2:** Fork and clone the Swarm repository
- **Step 3:** Install Fly.io CLI
- **Step 4:** Configure fly.toml and set database secrets
- **Step 5:** Deploy and test your relay

### 💰 Zero Cost
- Neon DB: $0/month (free tier: 3GB storage)
- Fly.io: $0/month (free tier: 750 compute hours/month)
- GitHub: $0/month (free hosting + storage)
- **Total: $0/month**

### 🚀 Supported Event Types
- **Kind 1:** Text notes (tweets)
- **Kind 25:** Reactions (likes, emoji)
- **Kind 30023:** Long-form content (articles, blog posts)
- **Kind 57:** Zaps (Lightning tips)

---

## Technology Stack

- **Frontend:** React 18 + Tailwind CSS + Lucide Icons
- **Build Tool:** Vite
- **Hosting:** GitHub Pages (free)
- **Relay Software:** Swarm (Khatru framework)
- **Database:** Neon (PostgreSQL)
- **Compute:** Fly.io (free tier)
- **Video Player:** HTML5 video with custom controls

---

## How to Use This Repository

### For Users (Quick Start)
Just visit the live deployment and follow the interactive guide:
- **Live Guide:** https://bitkarrot.github.io/nostr-relay-setup/
- No installation required - works in your browser
- Complete the 6 steps to deploy your team relay

### For Developers
If you want to contribute or modify the guide locally:

```bash
# Clone this repository
git clone https://github.com/bitkarrot/nostr-relay-setup.git
cd nostr-relay-setup

# Install dependencies
npm install

# Run locally for development
npm run dev

# Edit the guide
# - Update src/App.jsx with improvements
# - Add videos to public/ folder
# - Modify index.html if needed
# - Update this README.md

# Commit and push
git add .
git commit -m "Update guide with improvements"
git push origin main
```

### File Structure
```
nostr-relay-setup/
├── index.html              # Main HTML entry point
├── src/
│   └── App.jsx             # React component (interactive guide)
├── public/
│   ├── neon-setup.mp4      # Step 1 video
│   ├── step3.mp4           # Step 3 video
│   └── step4.mp4           # Step 4 video
│   └── step5.mp4           # Step 5 video
├── .nojekyll               # Tells GitHub Pages to skip Jekyll
├── .gitignore
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

### Key Features
- **Interactive Steps:** Progress tracking with expand/collapse
- **Video Tutorials:** Embedded videos for complex steps
- **Copy Commands:** One-click copying of all commands
- **Responsive Design:** Works on desktop and mobile
- **Real-time Updates:** Live deployment with GitHub Pages

---

## What is a Nostr Relay?

A Nostr relay is a server that:
- **Stores** events (posts, reactions, etc.) from Nostr users
- **Serves** events to Nostr clients (apps) when requested
- **Routes** events between users in a decentralized network
- **Enables** censorship-resistant social media

This guide helps you run your own relay - giving you full control over what events you store and serve.

---

## Frequently Asked Questions

### Do I need technical experience?
No! The guide is designed for beginners. Just follow the step-by-step instructions.

### Do I need a credit card?
No. All services (Neon, Fly.io, GitHub) offer free tiers without requiring a credit card.

### How much storage do I get?
3GB on Neon's free tier. At 100-1000 events/day with ~2KB per event, that's plenty.

### Can I add media uploads?
Yes, but you'll need external storage (Cloudflare R2, AWS S3, etc., ~$0.50-5/month). See the guide's optional section for details.

### Can I use my own domain?
Yes! The guide includes optional steps for adding a custom domain.

### What happens if I exceed the free tier?
Your relay will continue to work. You can then upgrade to a cheap VPS (~$7-10/month) if needed.

### Can I make money from running a relay?
Yes, some relay operators accept donations or charge small fees. However, this guide focuses on a free, community-run relay.

---

## Related Resources

- **Swarm Relay:** [github.com/HiveTalk/swarm](https://github.com/HiveTalk/swarm)
- **Khatru Framework:** [github.com/fiatjaf/khatru](https://github.com/fiatjaf/khatru)
- **Nostr Protocol:** [nostr.com](https://nostr.com)
- **Neon DB:** [neon.com](https://neon.com)
- **Fly.io:** [fly.io](https://fly.io)
- **Nostr Debug Tools:** [nostrdebug.com](https://nostrdebug.com)
- **Test Clients:** [jumble.social](https://jumble.social) | [iris.to](https://iris.to)
- **GitHub CLI:** [docs.github.com/cli](https://docs.github.com/en/cli)

---

## Troubleshooting

### The guide won't load
- Check your internet connection
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Try a different browser
- Open the browser console (F12) for error messages

### My relay won't start
See the troubleshooting section in the interactive guide:
- Wrong DATABASE_URL credentials
- Neon database in sleep mode
- Port conflicts

### I need help
1. Check the troubleshooting section in the guide
2. Review the Fly.io and Neon logs
3. Open an issue on this repository
4. Ask in Nostr communities (Nostr.community, etc.)

---

## Contributing

Found a bug or want to improve the guide?

1. **Fork this repository**
2. **Create a branch:** `git checkout -b improve-guide`
3. **Make your changes**
4. **Commit:** `git commit -m "Describe your changes"`
5. **Push:** `git push origin improve-guide`
6. **Open a Pull Request**

Contributions are welcome! This could include:
- Clearer instructions
- Better videos
- Additional troubleshooting
- Support for other relay software
- Translations
- UI/UX improvements

---

## License

This guide is released under the **MIT License** - feel free to use, modify, and share it!

---

## Support the Project

If this guide helped you:
- ⭐ Star this repository
- 🔗 Share it with others
- 💬 Give feedback or suggestions
- 🤝 Contribute improvements

---

## Roadmap

Future additions to this guide:
- [ ] Video tutorials for each step
- [ ] Alternative deployment guides (Render, Oracle Always Free, etc.)
- [ ] Custom domain setup guide
- [ ] Blossom media server integration
- [ ] Auto-deployment with GitHub Actions
- [ ] Community relay monitoring dashboard
- [ ] Multi-language support

---

## Built with ❤️ for the Nostr Community

**Let's decentralize communications, one relay at a time.**

---

**Questions?** Open an issue or ask in the Nostr community!

