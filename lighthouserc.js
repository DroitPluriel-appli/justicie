module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:performance': ['error', { minScore: 0.95 }],
      },
    },
    collect: {
      settings: {
        onlyCategories: ['accessibility', 'best-practices', 'performance'],
        preset: 'desktop',
      },
      url: [
        'http://localhost:3000/',
      ],
    },
    upload: {
      outputDir: 'lighthouse-ci-reports',
      target: 'filesystem',
    },
  },
}
