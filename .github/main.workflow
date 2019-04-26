workflow "linting" {
  on = "push"
  resolves = ["yarn lint"]
}

action "yarn install" {
  uses = "docker://node:alpine"
  runs = "yarn"
  args = "install"
}

action "yarn lint" {
  uses = "docker://node:alpine"
  needs = ["yarn install"]
}
