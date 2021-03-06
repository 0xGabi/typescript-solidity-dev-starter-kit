import { BuidlerConfig, usePlugin, task } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@nomiclabs/buidler-etherscan");
usePlugin("buidler-typechain");
usePlugin("solidity-coverage");
usePlugin("buidler-gas-reporter");

const INFURA_API_KEY = "";
const RINKEBY_PRIVATE_KEY = "";
const XDAI_PRIVATE_KEY = "";
const ETHERSCAN_API_KEY = "";

task("get-dao", "Get Kernel address").setAction(async (_, { ethers }) => {
  const apm = await ethers.getContractAt(
    "APMRegistry",
    "0xac9ca92d16e8bc0505eda84573d614ffecd8a293"
  );

  console.log(await apm.kernel());
});

const config: BuidlerConfig = {
  defaultNetwork: "buidlerevm",
  solc: {
    version: "0.4.24",
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY],
    },
    xdai: {
      url: `https://xdai.poanetwork.dev`,
      accounts: [XDAI_PRIVATE_KEY],
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
