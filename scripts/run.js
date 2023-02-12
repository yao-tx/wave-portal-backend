const main = async() => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  /** 
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  /**
   * Sending three waves!
   */

  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // Wait for transaction to be mined
   waveTxn = await waveContract.wave("Second message!");
  await waveTxn.wait(); // Wait for transaction to be mined

  const [_, randomPerson] = await hre.ethers.getSigners();

  // Get contract balance to see what happened!
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async() => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();