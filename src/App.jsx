import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Copy, Play } from 'lucide-react';

export default function FlyioSetupGuide() {
  const [expandedSteps, setExpandedSteps] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
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
      num: 1,
      title: 'Create Neon Database',
      duration: '2 min',
      videoId: 'neon-setup-video',
      videoPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: [
        {
          text: 'Go to neon.com and sign up (free account, no credit card)',
          substeps: [
            'Navigate to neon.com',
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
          ]
        }
      ],
      copyValues: [
        { label: 'Example Neon Connection String', value: 'postgresql://user:password@ep-example.neon.tech/dbname', id: 'neon-conn' }
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
            'Go to github.com/HiveTalk/swarm',
            'You\'ll see the Swarm relay code (a khatru relay fork)'
          ]
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
            'Copy the command from the copy section below',
            'Replace YOUR_USERNAME with your actual GitHub username',
            'Paste the command and press Enter',
            'This downloads your fork to your computer'
          ]
        },
        {
          text: 'Navigate into the directory',
          substeps: [
            'Type: cd swarm',
            'Press Enter',
            'You\'re now in the Swarm directory'
          ]
        },
        {
          text: '(Optional) Switch to main branch if needed',
          substeps: [
            'Type: git checkout main',
            'Press Enter'
          ]
        }
      ],
      copyValues: [
        { label: 'Swarm Repository URL', value: 'https://github.com/HiveTalk/swarm', id: 'swarm-url' },
        { label: 'Clone Command (replace YOUR_USERNAME)', value: 'git clone https://github.com/YOUR_USERNAME/swarm.git', id: 'git-clone' },
        { label: 'Navigate to directory', value: 'cd swarm', id: 'cd-swarm' }
      ]
    },
    {
      num: 3,
      title: 'Install Fly.io CLI',
      duration: '3 min',
      videoId: 'flyctl-install-video',
      videoPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: [
        {
          text: 'Install flyctl (Fly.io command-line tool)',
          substeps: [
            'Go to fly.io/docs/hands-on/install-flyctl/',
            'Follow the installation instructions for your OS (Mac, Linux, or Windows)',
            'The installation is quick and straightforward'
          ]
        },
        {
          text: 'Verify installation',
          substeps: [
            'Open your terminal',
            'Type: flyctl version',
            'Press Enter',
            'You should see a version number (e.g., "0.0.x")'
          ]
        },
        {
          text: 'Log in to Fly.io',
          substeps: [
            'Type: flyctl auth login',
            'Press Enter',
            'Your browser will open to create/verify your Fly.io account',
            'Create a free account if you don\'t have one',
            'Once authorized, you\'re ready to deploy!'
          ]
        }
      ],
      copyValues: [
        { label: 'Check version', value: 'flyctl version', id: 'flyctl-version' },
        { label: 'Login to Fly.io', value: 'flyctl auth login', id: 'flyctl-login' },
        { label: 'Fly.io CLI docs', value: 'https://fly.io/docs/hands-on/install-flyctl/', id: 'flyctl-docs' }
      ]
    },
    {
      num: 4,
      title: 'Customize fly.toml Configuration File',
      duration: '2 min',
      videoId: 'flytoml-customize-video',
      videoPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: [
        {
          text: 'Open the fly.toml file that\'s already in your cloned repo',
          substeps: [
            'In your swarm folder (from Step 2), you\'ll find a file called fly.toml',
            'Open it with any text editor (VS Code, nano, TextEdit, etc.)',
            'The file is already configured with defaults - you just need to customize it'
          ]
        },
        {
          text: 'Customize these values for your relay',
          substeps: [
            'Change: app = "swarm-relay" to a unique app name (e.g., "swarm-relay-john" or "my-nostr-relay")',
            'Change: RELAY_NAME = "My Swarm Relay" to your relay\'s display name',
            'Change: RELAY_DESCRIPTION to describe your relay (what is it for?)',
            'Optional: Change RELAY_PUBKEY if you want a different pubkey (or keep the default)',
            'Leave all other values as they are'
          ]
        },
        {
          text: 'Save and commit your changes',
          substeps: [
            'Save the file in your editor',
            'In your terminal, type: git add fly.toml',
            'Type: git commit -m "Customize relay settings"',
            'Type: git push',
            'This uploads your customized configuration to GitHub'
          ]
        }
      ],
      copyValues: [
        { label: 'Git add and commit commands', value: `git add fly.toml
git commit -m "Customize relay settings"
git push`, id: 'git-commit' }
      ]
    },
    {
      num: 5,
      title: 'Set Database URL Secret on Fly.io',
      duration: '1 min',
      videoId: 'flyio-secrets-video',
      videoPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: [
        {
          text: 'Use the Neon connection string you copied in Step 1',
          substeps: [
            'You already have your full connection string from Step 1',
            'Example: postgresql://user:password@ep-example.neon.tech/dbname'
          ]
        },
        {
          text: 'Set the DATABASE_URL secret in Fly.io',
          substeps: [
            'In your terminal (in the swarm directory), use the command from the copy section',
            'Replace postgresql://... with YOUR actual Neon connection string from Step 1',
            'Press Enter to execute',
            'Important: Never commit this to GitHub - Fly.io keeps it encrypted'
          ]
        },
        {
          text: 'Verify the secret was set',
          substeps: [
            'Type: flyctl secrets list',
            'Press Enter',
            'You should see DATABASE_URL listed'
          ]
        }
      ],
      copyValues: [
        { label: 'Set DATABASE_URL secret (replace with your Neon connection string)', value: `flyctl secrets set DATABASE_URL=postgresql://user:password@ep-example.neon.tech/dbname`, id: 'flyio-secrets' },
        { label: 'Verify secrets', value: 'flyctl secrets list', id: 'flyio-verify' }
      ]
    },
    {
      num: 6,
      title: 'Deploy to Fly.io & Test Your Relay',
      duration: '10 min',
      videoId: 'deploy-test-video',
      videoPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: [
        {
          text: 'Deploy to Fly.io',
          substeps: [
            'Make sure you\'re in the swarm directory',
            'Type: flyctl launch',
            'Press Enter',
            'Fly.io will ask to confirm app name (use the one from fly.toml)',
            'When asked about Postgres database, select NO (you\'re using Neon)',
            'Watch the build logs - this takes 3-5 minutes'
          ]
        },
        {
          text: 'Wait for successful deployment',
          substeps: [
            'Look for the message "Deployed successfully" in the logs',
            'Your relay URL will appear like: swarm-relay-xxx.fly.dev',
            'Keep this URL - you\'ll need it in a moment'
          ]
        },
        {
          text: 'Test the relay health endpoint',
          substeps: [
            'Open a new browser tab',
            'Go to: https://swarm-relay-xxx.fly.dev/stats',
            '(Replace swarm-relay-xxx with your actual app name)',
            'You should see JSON output with relay information',
            'This confirms your relay is running and connected to the database'
          ]
        },
        {
          text: 'Add your relay to a Nostr client (Jumble.social)',
          substeps: [
            'Open jumble.social in your browser',
            'Sign in with your Nostr signer extension or private key',
            'Go to Settings (usually a gear icon)',
            'Find the "Relays" section',
            'Click "Add Relay" or the "+" button',
            'Enter your relay WebSocket URL: wss://swarm-relay-xxx.fly.dev',
            'Enable the relay and save'
          ]
        },
        {
          text: 'Test by posting a note',
          substeps: [
            'In Jumble.social, write a test note and publish it',
            'Go to nostr.band and search for your pubkey',
            'You should see your post appearing',
            'This confirms events are being stored in your relay',
            'Congratulations! Your relay is working! 🎉'
          ]
        }
      ],
      copyValues: [
        { label: 'Deploy command', value: 'flyctl launch', id: 'flyctl-launch' },
        { label: 'Test endpoint (replace xxx)', value: 'https://swarm-relay-xxx.fly.dev/stats', id: 'test-endpoint' },
        { label: 'WebSocket URL (replace xxx)', value: 'wss://swarm-relay-xxx.fly.dev', id: 'ws-url' },
        { label: 'Jumble.social URL', value: 'https://jumble.social', id: 'jumble-url' },
        { label: 'Nostr.band URL (verify posts)', value: 'https://nostr.band', id: 'nostr-band' }
      ]
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Deploy Your Nostr Relay
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
                          Step {step.num}: {step.title}
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
                  {/* Video Section - Only show for steps with videoId */}
                  {step.videoId && step.num !== 2 && step.num !== 3 && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Play size={20} />
                        <span>Video Tutorial</span>
                      </h3>
                      <div className="w-full bg-slate-900 rounded-lg overflow-hidden aspect-video">
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                          <div className="text-center">
                            <Play size={48} className="text-slate-500 mx-auto mb-2" />
                            <p className="text-slate-400">Video embed placeholder</p>
                            <p className="text-xs text-slate-500 mt-1">Replace videoId in code with your YouTube video ID</p>
                          </div>
                        </div>
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
                          {idx + 1}. {instruction.text}
                        </h4>
                        <ul className="space-y-2 ml-4">
                          {instruction.substeps.map((substep, subidx) => (
                            <li key={subidx} className="flex items-start space-x-2 text-slate-200 text-sm">
                              <span className="text-slate-500 font-bold mt-0.5">•</span>
                              <span>{substep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Copy Values */}
                  {step.copyValues.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white">Commands & Values</h3>
                      {step.copyValues.map((copyVal) => (
                        <div key={copyVal.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                          <p className="text-sm font-semibold text-slate-300 mb-2">{copyVal.label}</p>
                          <div className="flex items-stretch space-x-2">
                            <code className="flex-1 bg-slate-900 p-3 rounded text-xs text-green-400 overflow-x-auto font-mono break-all whitespace-pre-wrap">
                              {copyVal.value}
                            </code>
                            <button
                              onClick={() => copyToClipboard(copyVal.value, copyVal.id)}
                              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-sm flex items-center space-x-2 transition flex-shrink-0"
                            >
                              <Copy size={18} />
                              <span>{copiedText === copyVal.id ? '✓' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
