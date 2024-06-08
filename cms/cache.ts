export function get(checksum: string) {
  console.log("RETRIEVING ITEM", checksum);
  const summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const tags = ["One", "Two", "Three"];
  return {
    summary,
    tags
  }
}

type Item = {
  summary: string,
  tags: string[]
}

export async function set(checksum: string, item: Item) {
  console.log("SETTING ITEM", checksum);
  console.log(checksum);
}
