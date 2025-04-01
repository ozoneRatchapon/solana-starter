import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { readFileSync } from 'fs';
import { join } from 'path';
const walletPath = join(process.env.HOME || process.env.USERPROFILE || '', '.config', 'solana', 'id.json');
const wallet = JSON.parse(readFileSync(walletPath, 'utf-8'));

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("BmGqzLS1T3Hf4XGFiGKsG2ejmybFmYsg1iF1zEND59BW");

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);
    // 2pDty9vXdw2HdNpM9qurgTRgxVLAWVojAGVaS9E2fdsG - first run ATA
    // 2pDty9vXdw2HdNpM9qurgTRgxVLAWVojAGVaS9E2fdsG - other run ATA
    // https://solscan.io/account/2pDty9vXdw2HdNpM9qurgTRgxVLAWVojAGVaS9E2fdsG?cluster=devnet
    // if you want to use the same ATA address, you can use the same mint address
    // if not, you can create a new mint address
    // 8JTDvJ1yTA6m96bMviwtVLQv7EwguyGKoNFbBLojTbLp - ATA address from new mint address for Q2 2025
    // https://solscan.io/account/8JTDvJ1yTA6m96bMviwtVLQv7EwguyGKoNFbBLojTbLp?cluster=devnet
    
    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      12345,
    );
    console.log(`Your mint txid: ${mintTx}`);
    // 3vkNvFpxbfxiawDgtCbaWEJpGhbuqg9FqYDZrR4qQ4yoqXpY5Ggg5f3VCS9auMYEuMnSLY2N4Mte2PqCkDtKXyEB - Q2 2025 mint tx
    // https://solscan.io/tx/3vkNvFpxbfxiawDgtCbaWEJpGhbuqg9FqYDZrR4qQ4yoqXpY5Ggg5f3VCS9auMYEuMnSLY2N4Mte2PqCkDtKXyEB?cluster=devnet
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
