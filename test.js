function sleep(ms) {
  console.log("sskdv")
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function demo() {
  await sleep(1000);
  console.log("sskdv")
}
demo()