workflow "linting" {
  on = "push"
  resolves = ["\tdocker://node:alpine"]
}

action "yarn install" {
  uses = "docker://node:alpine"
  runs = "yarn"
  args = "install"
}

action "\tdocker://node:alpine" {
  uses = "\tdocker://node:alpine"
  needs = ["yarn install"]
}
