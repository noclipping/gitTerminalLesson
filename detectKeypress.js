const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
};
export default async () => {

  console.log(`
  Press any key to continue.
  __________________________
  `)
  await keypress()

}