export const examples = [
  {
    id: 'ci-tests',
    tag: 'CI',
    tagVariant: 'green',
    title: 'Run Tests on Push',
    description: 'Trigger automated tests whenever code is pushed to any branch.',
    code: `name: Run Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test`,
  },
  {
    id: 'deploy-pages',
    tag: 'CD',
    tagVariant: 'blue',
    title: 'Deploy to GitHub Pages',
    description: 'Automatically publish a static site to GitHub Pages on every push to main.',
    code: `name: Deploy to Pages
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4`,
  },
  {
    id: 'docker',
    tag: 'Docker',
    tagVariant: 'cyan',
    title: 'Build & Push Docker Image',
    description: 'Build a Docker image and push it to GitHub Container Registry (GHCR).',
    code: `name: Docker Build & Push
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest`,
  },
  {
    id: 'schedule',
    tag: 'Schedule',
    tagVariant: 'orange',
    title: 'Scheduled Workflow (Cron)',
    description: 'Run a workflow on a schedule — useful for nightly builds, cleanup, or reports.',
    code: `name: Nightly Build
on:
  schedule:
    - cron: '0 2 * * *'  # 02:00 UTC daily
  workflow_dispatch:      # allow manual run

jobs:
  nightly:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: npm run test:e2e`,
  },
  {
    id: 'matrix',
    tag: 'Matrix',
    tagVariant: 'purple',
    title: 'Matrix Strategy',
    description: 'Run the same job across multiple Node.js versions and operating systems in parallel.',
    code: `name: Matrix Tests
on: [push]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
      - run: npm ci && npm test`,
  },
  {
    id: 'secrets',
    tag: 'Secrets',
    tagVariant: 'red',
    title: 'Using Secrets & Environments',
    description: 'Access encrypted secrets and environment-specific variables safely in workflows.',
    code: `name: Deploy with Secrets
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    env:
      API_URL: \${{ vars.API_URL }}
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
          DB_PASSWORD: \${{ secrets.DB_PASSWORD }}`,
  },
]
