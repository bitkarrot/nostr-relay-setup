import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Copy, Play } from 'lucide-react';

export default function FlyioSetupGuide() {
  const [expandedSteps, setExpandedSteps] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  
  const [completedSteps, setCompletedSteps] = useState({});
  const [copiedText, setCopiedText] = useState(null);

  const toggleStep = (stepNum) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const toggleComplete = (stepNum) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const steps = [
    {
      num: 0,
      title: 'Overview & Prerequisites',
      duration: '3 min',
      instructions: [
        {
          text: 'Architecture Overview',
          substeps: [
            'We will deploy a Nostr relay that stores events in a Neon PostgreSQL database',
            'Fly.io will host your relay application code (running 24/7 for free)',
            'Neon DB will handle all data storage (free tier includes enough for personal use)',
            'Your relay will be accessible via WebSocket: wss://your-app-name.fly.dev'
          ]
        },
        {
          text: 'System Architecture Diagram',
          substeps: [
            'Below shows how your Nostr relay will be structured',
            'Nostr clients connect to your relay on Fly.io',
            'Your relay stores and retrieves data from Neon PostgreSQL'
          ],
          diagram: (
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-600">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                {/* Nostr Clients */}
                <div className="text-center">
                  <div className="bg-blue-600 rounded-lg p-4 mb-2">
                    <div className="text-white text-sm font-semibold">Nostr Clients</div>
                    <div className="text-blue-100 text-xs">
                      <a href="https://jumble.social" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Jumble.social</a>,{' '}
                      <a href="https://iris.to" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Iris.to</a>,{' '}
                      <span>Amethyst</span>, <span>Primal</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-blue-400 text-2xl hidden md:block">⇄</div>
                <div className="text-blue-400 text-xl md:hidden">⇅</div>

                {/* Fly.io Relay */}
                <div className="text-center">
                  <div className="bg-purple-600 rounded-lg p-4 mb-2">
                    <div className="text-white text-sm font-semibold">
                      <a href="https://fly.io" target="_blank" rel="noopener noreferrer" className="hover:text-purple-100 underline">Fly.io</a>
                    </div>
                    <div className="text-purple-100 text-xs">Nostr Relay Code</div>
                    <div className="text-purple-100 text-xs">wss://your-app.fly.dev</div>
                  </div>
                  <div className="text-purple-400 text-xs">24/7 Hosting • Free Tier</div>
                </div>

                {/* Arrow */}
                <div className="text-purple-400 text-2xl hidden md:block">⇄</div>
                <div className="text-purple-400 text-xl md:hidden">⇅</div>

                {/* Neon Database */}
                <div className="text-center">
                  <div className="bg-green-600 rounded-lg p-4 mb-2">
                    <div className="text-white text-sm font-semibold">
                      <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="hover:text-green-100 underline">Neon</a>
                    </div>
                    <div className="text-green-100 text-xs">PostgreSQL Database</div>
                    <div className="text-green-100 text-xs">Event Storage</div>
                  </div>
                  <div className="text-green-400 text-xs">Free Tier • Backups Included</div>
                </div>
              </div>
            </div>
          )
        },
        {
          text: 'Prerequisites - GitHub Account',
          substeps: [
            'You MUST have a GitHub account (free to create)',
            'GitHub CLI is recommended but not required for this guide',
            'If you don\'t have GitHub CLI installed, see the quickstart guide below',
            'GitHub CLI makes cloning and pushing easier, but you can also use the web interface'
          ],
          copyValue: { label: 'GitHub CLI Quickstart Guide', value: 'https://docs.github.com/en/github-cli/github-cli/quickstart', id: 'github-cli-quickstart' }
        },
        {
          text: 'What You\'ll Accomplish',
          substeps: [
            '✓ Your own private Nostr relay running 24/7',
            '✓ Full control over your data and relay policies',
            '✓ $0/month hosting (within free tier limits)',
            '✓ Ability to connect any Nostr client to your relay',
            '✓ Database backups and data persistence through Neon'
          ]
        }
      ],
      copyValues: [
        { label: 'GitHub CLI Installation Guide', value: 'https://docs.github.com/en/cli/installation', id: 'github-cli-install' },
        { label: 'GitHub CLI Usage Guide', value: 'https://docs.github.com/en/cli', id: 'github-cli-docs' },
        { label: 'GitHub Signup (if needed)', value: 'https://github.com/signup', id: 'github-signup' }
      ]
    },
    {
      num: 1,
      title: 'Create Neon Database',
      duration: '2 min',
      videoSrc: '/neon-setup.mp4',
      instructions: [
        {
          text: 'Go to <a href="https://neon.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">neon.com</a> and sign up (free account, no credit card)',
          substeps: [
            'Navigate to <a href="https://neon.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">neon.com</a>',
            'Click "Sign Up" in the top right',
            'Follow the signup process'
          ]
        },
        {
          text: 'Create a new PostgreSQL project',
          substeps: [
            'Once logged in, click "New Project"',
            'Name it "nostr-relay" (or your preference)',
            'Click "Create Project"',
            'Neon will spin up a free PostgreSQL database for you'
          ]
        },
        {
          text: 'Copy your full connection string',
          substeps: [
            'You\'ll see your connection string: postgresql://user:password@ep-xxx.neon.tech/dbname',
            'Click the copy icon to copy the entire connection string',
            'Paste it into a text editor - you\'ll need this in Step 6'
          ],
          copyValue: { label: 'Example Neon Connection String', value: 'postgresql://user:password@ep-example.neon.tech/dbname', id: 'neon-conn' }
        }
      ]
    },
    {
      num: 2,
      title: 'Fork and Clone the Swarm Repository',
      duration: '5 min',
      instructions: [
        {
          text: 'Navigate to the Swarm repository',
          substeps: [
            'Go to <a href="https://github.com/HiveTalk/swarm" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">github.com/HiveTalk/swarm</a>',
            'You\'ll see the Swarm relay code (a khatru relay fork)'
          ],
          copyValue: { label: 'Swarm Repository URL', value: 'https://github.com/HiveTalk/swarm', id: 'swarm-url' }
        },
        {
          text: 'Fork the repository to your GitHub account',
          substeps: [
            'Click the "Fork" button in the top right corner',
            'GitHub will ask to confirm - click "Create fork"',
            'Wait a few seconds for the fork to complete'
          ]
        },
        {
          text: 'Verify you have your own fork',
          substeps: [
            'You should now see "your-username/swarm" instead of "hiveTalk/swarm"',
            'This is your own copy of the code'
          ]
        },
        {
          text: 'Open your terminal/command prompt',
          substeps: [
            'On Mac: Open "Terminal"',
            'On Windows: Open "Command Prompt" or "PowerShell"',
            'On Linux: Open your preferred terminal'
          ]
        },
        {
          text: 'Clone your forked repository',
          substeps: [
            'Copy the command below and replace YOUR_USERNAME with your actual GitHub username',
            'Paste the command and press Enter',
            'This downloads your fork to your computer'
          ],
          copyValue: { label: 'Clone Command (replace YOUR_USERNAME)', value: 'git clone https://github.com/YOUR_USERNAME/swarm.git', id: 'git-clone' }
        },
        {
          text: 'Navigate into the directory',
          substeps: [
            'Type: cd swarm',
            'Press Enter',
            'You\'re now in the Swarm directory'
          ],
          copyValue: { label: 'Navigate to directory', value: 'cd swarm', id: 'cd-swarm' }
        },
        {
          text: '(Optional) Switch to main branch if needed',
          substeps: [
            'Type: git checkout main',
            'Press Enter'
          ]
        }
      ]
    },
    {
      num: 3,
      title: 'Install Fly.io CLI',
      duration: '3 min',
      videoSrc: '/step3.mp4',
      instructions: [
        {
          text: 'Install flyctl using your preferred method',
          substeps: [
            'Mac: Run `brew install flyctl` (recommended) or visit <a href="https://fly.io/docs/hands-on/install-flyctl/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">fly.io/docs/hands-on/install-flyctl/</a>',
            'Windows: Run `winget install --id SuperFly.FlyCTL` or download from <a href="https://fly.io/docs/hands-on/install-flyctl/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">fly.io/docs/hands-on/install-flyctl/</a>',
            'Linux: Run `curl -L https://fly.io/install.sh | sh` or visit <a href="https://fly.io/docs/hands-on/install-flyctl/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">fly.io/docs/hands-on/install-flyctl/</a>',
            'For all systems: Follow the installation prompts and accept any permissions requested'
          ],
          copyValues: [
            { label: 'Mac install (brew)', value: 'brew install flyctl', id: 'brew-install' },
            { label: 'Windows install (winget)', value: 'winget install --id SuperFly.FlyCTL', id: 'winget-install' },
            { label: 'Linux install (curl)', value: 'curl -L https://fly.io/install.sh | sh', id: 'curl-install' },
            { label: 'Fly.io CLI docs', value: 'https://fly.io/docs/hands-on/install-flyctl/', id: 'flyctl-docs' }
          ]
        },
        {
          text: 'Verify the installation worked',
          substeps: [
            'Open a new terminal window',
            'Type: flyctl version',
            'Press Enter',
            'You should see version output like "v2.25.0" (or similar)',
            'If you see "command not found", restart your terminal or try again'
          ],
          copyValue: { label: 'Check version', value: 'flyctl version', id: 'flyctl-version' }
        },
        {
          text: 'Sign in to your Fly.io account',
          substeps: [
            'Type: flyctl auth login',
            'Press Enter',
            'Your browser will automatically open to the Fly.io login page',
            'Sign in with GitHub, Google, or create a new Fly.io account',
            'Click "Authorize" to allow flyctl access to your account',
            'Return to terminal - you should see "Successfully logged in as your-email@example.com"'
          ],
          copyValue: { label: 'Login to Fly.io', value: 'flyctl auth login', id: 'flyctl-login' }
        },
        {
          text: 'Verify your authentication worked',
          substeps: [
            'Type: flyctl auth whoami',
            'Press Enter',
            'You should see your email/user information displayed',
            'If you see any error, try `flyctl auth login` again'
          ],
          copyValue: { label: 'Verify login', value: 'flyctl auth whoami', id: 'flyctl-whoami' }
        }
      ]
    },
    {
      num: 4,
      title: 'Configure fly.toml and Set Database Secret',
      duration: '5 min',
      videoSrc: '/step4.mp4',
      instructions: [
        {
          text: 'Locate and open the fly.toml configuration file',
          substeps: [
            'Navigate to your swarm directory: `cd swarm` (if you\'re not already there)',
            'Open the fly.toml file in your preferred text editor (see commands below)',
            'This file contains your Fly.io app configuration and environment variables'
          ],
          copyValues: [
            { label: 'Open fly.toml (nano)', value: 'nano fly.toml', id: 'open-toml-nano' }
          ]
        },
        {
          text: 'Configure your app settings in fly.toml',
          substeps: [
            'Find the line `app = "swarm-relay"` and change to a unique app name (use lowercase letters, numbers, and hyphens only)',
            'Example: `app = "my-nostr-relay"` or `app = "johns-relay"`',
            'This name will become part of your URL: your-app-name.fly.dev'
          ]
        },
        {
          text: 'Configure your relay information',
          substeps: [
            'Find the [env] section in the file',
            'Set RELAY_NAME = "Your Display Name" (how your relay appears to users)',
            'Set RELAY_DESCRIPTION = "A brief description of your relay\'s purpose" (e.g., "Personal Nostr relay for friends and family")',
            'Mandatory: Set RELAY_PUBKEY = "your-hex-public-key" (For EXAMPLE: visit <a href="https://nostrdebug.com/keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">nostrdebug.com/keys</a> to generate new keys, copy the public key in hex format. Note: Hex Format is the line that doesn\'t start with "npub")',
            'Create/edit nostr.json file to add hex pubkeys of users you want to give access to your relay (see .env.example file in the <a href="https://github.com/HiveTalk/swarm" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">Swarm GitHub repository</a> for configuration details)',
            'Keep all other settings (PORT, DB_ENGINE, etc.) as they are'
          ]
        },
        {
          text: 'Save and commit your fly.toml changes',
          substeps: [
            'Save the file in your text editor',
            'In terminal (in swarm directory): use the commands below',
            'Commit changes and push to GitHub',
            'This ensures Fly.io will use your custom configuration when deploying'
          ],
          copyValue: {
            label: 'Git add and commit commands',
            value: `git add fly.toml
git commit -m "Configure relay settings"
git push`,
            id: 'git-commit'
          }
        },
        {
          text: 'Create your Fly.io app first',
          substeps: [
            'You MUST create the app on Fly.io before setting secrets',
            'Use the app name you configured in fly.toml (replace with your actual app name)',
            'This creates the app container but doesn\'t deploy yet',
            'Once the app exists, you can set environment variables and secrets'
          ],
          copyValue: {
            label: 'Create Fly.io app',
            value: 'flyctl apps create your-app-name',
            id: 'create-fly-app'
          }
        },
        {
          text: 'Set up your database connection securely',
          substeps: [
            'Get your Neon connection string from Step 1 (should look like postgresql://user:password@host/database)',
            'Add ?sslmode=disable to the end if not present (required for Fly.io)',
            'Use the Fly.io CLI to set the DATABASE_URL secret (see command below)',
            '<strong style="color: #ef4444;">BE SURE TO ENCLOSE THE DATABASE_URL SECRET with QUOTES on both ends ("....")</strong>',
            'Replace the example connection string with YOUR actual Neon connection string',
            'Press Enter - you should see "Secrets are staged for the first deployment"'
          ],
          copyValue: {
            label: 'Set DATABASE_URL secret',
            value: 'flyctl secrets set DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=disable"',
            id: 'flyio-secrets'
          }
        },
        {
          text: 'Verify your configuration is complete',
          substeps: [
            'Check your secrets are set using the command below',
            'You should see DATABASE_URL in the output',
            'Your app should now be ready for deployment with database connection',
            'You\'re now ready for Step 5: Deploy to Fly.io!'
          ],
          copyValue: {
            label: 'Verify secrets',
            value: 'flyctl secrets list',
            id: 'flyio-verify'
          }
        }
      ]
    },
    {
      num: 5,
      title: 'Deploy to Fly.io & Test Your Relay',
      duration: '10 min',
      videoSrc: '/step5.mp4',
      instructions: [
        {
          text: 'Deploy your application to Fly.io',
          substeps: [
            'Ensure you\'re in the swarm directory: `cd swarm`',
            'Start deployment using the command below',
            'Press Enter and follow the prompts:',
            '  - App name: Press Enter to use the name from fly.toml or type a different one',
            '  - Region: Choose a region close to you (or accept default)',
            '  - PostgreSQL: Select NO (you\'re using Neon instead)',
            '  - Redis: Select NO (not needed for this relay)',
            'The deployment will begin - this typically takes 3-5 minutes'
          ],
          copyValue: { label: 'Deploy command', value: 'flyctl launch', id: 'flyctl-launch' }
        },
        {
          text: 'Monitor the deployment process',
          substeps: [
            'Watch the build logs in your terminal',
            'You\'ll see steps like: Building, Creating VM, Deploying',
            'Success message should look like: "Visit your newly deployed app at https://your-app-name.fly.dev"',
            'If deployment fails, note the error message and check logs with the command below'
          ],
          copyValues: [
            { label: 'View logs', value: 'flyctl logs', id: 'flyctl-logs' },
            { label: 'Redeploy (after fixes)', value: 'flyctl deploy', id: 'flyctl-deploy' }
          ]
        },
        {
          text: 'Test your relay is running correctly',
          substeps: [
            'Open a new browser tab and go to the URL below (replace your-app-name with your actual app name)',
            'You should see your relay information displayed on the page',
            'This confirms your relay is running and connected to the Neon database',
            'If you see errors, check logs to diagnose the issue'
          ],
          copyValue: { label: 'Test endpoint (replace your-app)', value: 'https://your-app-name.fly.dev', id: 'test-endpoint' }
        },
        {
          text: 'Connect your relay to Nostr clients',
          substeps: [
            'Use the WebSocket URL below to connect to your relay',
            'Open your preferred Nostr client (<a href="https://jumble.social" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">Jumble.social</a>, <a href="https://iris.to" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">Iris.to</a>, Amethyst, Primal, etc.)',
            'Go to Settings → Relays → Add Relay',
            'Enter the WebSocket URL (replace your-app-name with your actual app name)',
            'Enable the relay and save settings',
            'Test by posting a short note/message'
          ],
          copyValue: { label: 'WebSocket URL (replace your-app)', value: 'wss://your-app-name.fly.dev', id: 'ws-url' }
        },
        {
          text: 'Verify your relay is working end-to-end',
          substeps: [
            'Test your relay using either <a href="https://jumble.social" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">jumble.social</a> or <a href="https://nostrdebug.com/query" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400/70 transition-all duration-200">nostrdebug.com/query</a>',
            'If using jumble.social: Sign in, add your relay in Settings → Relays, and create a test post',
            'If using nostrdebug.com: Query for events from your public key to verify the relay is working',
            'Success! Your Nostr relay is now storing and serving events correctly! 🎉'
          ],
          copyValues: [
            { label: 'Jumble.social URL', value: 'https://jumble.social', id: 'jumble-url' },
            { label: 'Nostr Debug Query Tool', value: 'https://nostrdebug.com/query', id: 'nostr-debug-query' }
          ]
        },
        {
          text: 'Troubleshooting common issues',
          substeps: [
            'If app won\'t start: Run logs command to check for database connection errors',
            'If posts don\'t appear: Verify your relay URL in Nostr client is correct (wss:// not https://)',
            'If database errors: Check that DATABASE_URL secret was set correctly using the secrets list command',
            'To redeploy after fixes: Use the deploy command (faster than initial launch)'
          ],
          copyValue: { label: 'Check secrets', value: 'flyctl secrets list', id: 'secrets-list' }
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Deploy a Team Nostr Relay for free
          </h1>
          <p className="text-xl text-slate-300 mb-2">Setup guide for Fly.io + Neon DB</p>
          <p className="text-slate-400">Total time: ~20-30 minutes | Cost: $0/month forever</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-slate-300">Your Progress</span>
            <span className="text-sm font-semibold text-slate-300">{Object.values(completedSteps).filter(Boolean).length}/{steps.length} complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${(Object.values(completedSteps).filter(Boolean).length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div 
              key={step.num}
              className={`rounded-lg border transition-all ${
                completedSteps[step.num]
                  ? 'bg-slate-800/50 border-green-500/50'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
            >
              {/* Step Header */}
              <div
                className="w-full p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleComplete(step.num)}
                      className="flex-shrink-0 hover:bg-slate-700/50 p-2 rounded-full transition"
                    >
                      {completedSteps[step.num] ? (
                        <CheckCircle2 size={32} className="text-green-500" />
                      ) : (
                        <Circle size={32} className="text-slate-500 hover:text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleStep(step.num)}
                      className="flex-1 text-left hover:bg-slate-700/50 p-2 rounded transition"
                    >
                      <div>
                        <h2 className={`text-xl font-bold ${completedSteps[step.num] ? 'text-green-400 line-through' : 'text-white'}`}>
                          {step.num === 0 ? '' : `Step ${step.num}: `}{step.title}
                        </h2>
                        <p className="text-sm text-slate-400">⏱️ {step.duration}</p>
                      </div>
                    </button>
                  </div>
                  <button
                    onClick={() => toggleStep(step.num)}
                    className="flex-shrink-0 hover:bg-slate-700/50 p-2 rounded-full transition"
                  >
                    {expandedSteps[step.num] ? (
                      <ChevronUp className="text-slate-400" />
                    ) : (
                      <ChevronDown className="text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step Content */}
              {expandedSteps[step.num] && (
                <div className="border-t border-slate-700 px-6 py-6 space-y-8">
                  {/* Video Section - Show for steps with videoSrc or videoId */}
                  {(step.videoSrc || (step.videoId && step.num !== 2 && step.num !== 3 && step.num !== 5)) && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Play size={20} />
                        <span>Video Tutorial</span>
                      </h3>
                      <div className="w-full bg-slate-900 rounded-lg overflow-hidden aspect-video">
                        {step.videoSrc ? (
                          <video
                            src={step.videoSrc}
                            controls
                            className="w-full h-full"
                            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23334155'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23cbd5e1' font-family='sans-serif' font-size='24'%3ELoading video...%3C/text%3E%3C/svg%3E"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <div className="text-center">
                              <Play size={48} className="text-slate-500 mx-auto mb-2" />
                              <p className="text-slate-400">Video embed placeholder</p>
                              <p className="text-xs text-slate-500 mt-1">Replace videoId in code with your YouTube video ID</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        💡 Tip: Watch the video first, then follow the text instructions below
                      </p>
                    </div>
                  )}

                  {/* Instructions */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white">Step-by-Step Instructions</h3>
                    {step.instructions.map((instruction, idx) => (
                      <div key={idx} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <h4 className="font-semibold text-blue-300 mb-3">
                          {idx + 1}. <span dangerouslySetInnerHTML={{ __html: instruction.text }} />
                        </h4>
                        <ul className="space-y-2 ml-4 mb-4">
                          {instruction.substeps.map((substep, subidx) => (
                            <li key={subidx} className="flex items-start space-x-2 text-slate-200 text-sm">
                              <span className="text-slate-500 font-bold mt-0.5">•</span>
                              <span dangerouslySetInnerHTML={{ __html: substep }} />
                            </li>
                          ))}
                        </ul>

                        {/* Inline diagram */}
                        {instruction.diagram && (
                          <div className="mt-4">
                            {instruction.diagram}
                          </div>
                        )}

                        {/* Inline copy values */}
                        {(instruction.copyValue || instruction.copyValues) && (
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-slate-300">
                              {instruction.copyValue ? 'Command' : 'Commands & Values'}
                            </p>
                            {(instruction.copyValue ? [instruction.copyValue] : instruction.copyValues).map((copyVal) => (
                              <div key={copyVal.id} className="bg-slate-800 rounded-lg p-3 border border-slate-600">
                                <div className="flex items-stretch space-x-2">
                                  <code className="flex-1 bg-slate-900 p-2 rounded text-xs text-green-400 overflow-x-auto font-mono break-all whitespace-pre-wrap">
                                    {copyVal.value}
                                  </code>
                                  <button
                                    onClick={() => copyToClipboard(copyVal.value, copyVal.id)}
                                    className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-sm flex items-center space-x-2 transition flex-shrink-0"
                                  >
                                    <Copy size={16} />
                                    <span>{copiedText === copyVal.id ? '✓' : 'Copy'}</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  </div>
              )}
            </div>
          ))}
        </div>

        {/* Custom Domain Optional Section */}
        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Optional: Add a Custom Domain</h3>
          <div className="space-y-3 text-slate-300 text-sm">
            <p>Your relay currently runs at <code className="bg-slate-900 px-2 py-1 rounded text-green-400">wss://swarm-relay-xxx.fly.dev</code></p>
            <p className="font-semibold text-blue-300 mb-2">To use your own domain (e.g., wss://relay.yoursite.com):</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Run: <code className="bg-slate-900 px-2 py-1 rounded text-green-400 text-xs">flyctl certs add relay.yoursite.com</code></li>
              <li>Fly.io gives you a CNAME record to add to your domain registrar</li>
              <li>Add the CNAME to your DNS settings (GoDaddy, Namecheap, etc.)</li>
              <li>Wait 5-15 minutes for DNS to propagate</li>
              <li>Verify with: <code className="bg-slate-900 px-2 py-1 rounded text-green-400 text-xs">flyctl certs list</code></li>
            </ol>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Troubleshooting</h3>
          <div className="space-y-3 text-slate-300 text-sm">
            <div>
              <p className="font-semibold text-blue-300 mb-1">❌ App won't start / connection errors</p>
              <p>Check logs with: <code className="bg-slate-900 px-2 py-1 rounded text-green-400 text-xs">flyctl logs</code></p>
              <p>Most common: Wrong Neon credentials. Verify POSTGRES_HOST, POSTGRES_PASSWORD, and POSTGRES_USER are exactly correct.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-300 mb-1">❌ /stats endpoint shows error</p>
              <p>Database connection failed. Check that all POSTGRES_* variables are set correctly and your Neon database is active (not in sleep mode).</p>
            </div>
            <div>
              <p className="font-semibold text-blue-300 mb-1">❌ Events not saving</p>
              <p>Verify DB_ENGINE is set to "postgres" and POSTGRES_PORT is 5432. Check Neon is awake and your credentials are correct.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-300 mb-1">❌ Want to redeploy immediately?</p>
              <p>Run: <code className="bg-slate-900 px-2 py-1 rounded text-green-400 text-xs">flyctl deploy</code></p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {Object.values(completedSteps).filter(Boolean).length === steps.length && (
          <div className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500 rounded-lg p-6 text-center">
            <p className="text-2xl font-bold text-green-400 mb-2">🎉 Congratulations!</p>
            <p className="text-green-300">Your Nostr relay is live and running 24/7!</p>
            <p className="text-sm text-green-200 mt-2">Cost: $0/month • Uptime: 24/7 (750 hours/month free)</p>
            <p className="text-sm text-green-200 mt-3">Ready to add media storage? Upgrade to a VPS for ~$7-10/month to enable Blossom media server.</p>
          </div>
        )}
      </div>
    </div>
  );
}
