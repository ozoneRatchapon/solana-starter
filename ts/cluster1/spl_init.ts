/**
 * @fileoverview
 * This script initializes a new SPL Token mint on the Solana devnet using the `@solana/web3.js` and `@solana/spl-token` libraries.
 * 
 * The script performs the following steps:
 * 1. Reads the Solana wallet configuration file from the user's home directory.
 * 2. Imports the keypair from the wallet file.
 * 3. Establishes a connection to the Solana devnet.
 * 4. Creates a new mint with specified parameters such as mint authority and decimals.
 * 
 * Usage:
 * Run the script using the following command:
 * ```
 * npx ts-node ts/cluster1/spl_init.ts
 * ```
 */

import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Constructs the file path to the Solana wallet configuration file.
 * 
 * This method leverages the `process.env.HOME` or `process.env.USERPROFILE` environment variables
 * to dynamically determine the user's home directory, ensuring compatibility across different
 * operating systems (e.g., Unix-based systems and Windows).
 * 
 * The `.config/solana/id.json` path is appended to the home directory to locate the wallet file.
 * 
 * This approach is considered secure and reliable because:
 * - It avoids hardcoding the file path, making the code more portable and adaptable to different environments.
 * - It uses environment variables to dynamically determine the user's home directory, which is a standard and secure practice.
 * - It ensures that the wallet file is stored in a hidden configuration directory, reducing the risk of accidental exposure.
 */
const walletPath = join(process.env.HOME || process.env.USERPROFILE || '', '.config', 'solana', 'id.json');
const wallet = JSON.parse(readFileSync(walletPath, 'utf-8'));

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection≠
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here to create a mint
    // await is used to wait for the promise to resolve
    // createMint is a function that creates a new mint
    // The mint is created using the connection, keypair, and other parameters
    // The mint address is returned as a PublicKey
    const mint = await createMint(
      connection, // Connection to the network
      keypair, // Keypair of the wallet owner
      keypair.publicKey, // Mint authority - can be different from the wallet owner
      null, // Optional freeze authority
      6, // Decimals
    );
    console.log(`Mint created at ${mint.toBase58()}`);
    // 3N2fxpEWCp48Es3Xc9bfSHMF77qJ9onucQr55uQTE7u5 - Mint Token Address First Run
    // Ga7a2FjtEMAkHoP7QoEjKKGtzZCZW4XvJfRcZGVvYNgr - Mint Token Address Other Run
    // BmGqzLS1T3Hf4XGFiGKsG2ejmybFmYsg1iF1zEND59BW - Mint Token Address Q2 2025
    // DUKaveSuV1G4a2AwiDyTnBMZ37AoAjpTaLMC3CsLEdzf - Mint Token Address Q2 2025 (2)
    // https://solscan.io/token/BmGqzLS1T3Hf4XGFiGKsG2ejmybFmYsg1iF1zEND59BW?cluster=devnet
    // every run file has a new mint address
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
