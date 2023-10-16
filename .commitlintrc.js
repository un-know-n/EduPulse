module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://commitlint.js.org/#/reference-rules',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'DOCS',
        'FEAT',
        'FIX',
        'REFACTOR',
        'REVERT',
        'TEST',
        'STYLE',
        'CHORE',
        'PERF',
        'BUILD',
        'CI',
      ],
    ],
    'type-case': [2, 'always', ['upper-case']],

    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['server', 'client', 'db', 'general']],

    'subject-case': [2, 'always', ['sentence-case', 'lower-case']],

    'header-max-length': [1, 'always', 72],
    'body-max-line-length': [1, 'always', 72],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          FEAT: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          FIX: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          DOCS: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          STYLE: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎',
          },
          REFACTOR: {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          PERF: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          TEST: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          BUILD: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          CI: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          CHORE: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️',
          },
          REVERT: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
