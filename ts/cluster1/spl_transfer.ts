import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

// import wallet from "../wba-wallet.json";
import { readFileSync } from 'fs';
import { join } from 'path';

const walletPath = join(process.env.HOME || process.env.USERPROFILE || '', '.config', 'solana', 'id.json');
const wallet = JSON.parse(readFileSync(walletPath, 'utf-8'));

import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("DUKaveSuV1G4a2AwiDyTnBMZ37AoAjpTaLMC3CsLEdzf");

// Recipient address
const to = new PublicKey("AeWV2D4ZgcLrpYj37NGvAbTa7e9pYG6CqxMyAaKqUNTX");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
    );
    console.log(`fromTokenAccount is: ${fromTokenAccount.address.toBase58()}`);

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to,
    );
    console.log(`toTokenAccount is: ${toTokenAccount.address.toBase58()}`);

    // Transfer the new token to the "toTokenAccount" we just created
    await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair,
      2e6,  
    );

    console.log(
      `Transfer of 2 SOL to ${toTokenAccount.address.toBase58()} successful!`,
    );
    // F4S37JcqnRqPGtwtRsFdbtaxJF8PLkn1vj7kMAzDET51
    // 6XYFa1MukmrXVtLxFehYLnz6j1zFPcuZ1RweMXjNbXnt - Q2 2025
    // 77nM6Kjp9oWn2QmaCCZ1FL8ctpzZZGRXdsXC9n3jRrvS - Q2 2025 (2)
    // https://solscan.io/tx/77nM6Kjp9oWn2QmaCCZ1FL8ctpzZZGRXdsXC9n3jRrvS?cluster=devnet
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
