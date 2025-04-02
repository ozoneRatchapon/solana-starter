// import wallet from "../wba-wallet.json";
import { readFileSync } from 'fs';
import { join } from 'path';

const walletPath = join(process.env.HOME || process.env.USERPROFILE || '', '.config', 'solana', 'id.json');
const wallet = JSON.parse(readFileSync(walletPath, 'utf-8'));

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("DUKaveSuV1G4a2AwiDyTnBMZ37AoAjpTaLMC3CsLEdzf");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: mint,
      mintAuthority: signer,
    };

    let data: DataV2Args = {
      name: "GreenMove2",
      symbol: "GM",
      uri: "https://pbs.twimg.com/media/Ghi0R70acAIAOZC?format=jpg", // https://arweave.net/1234
      sellerFeeBasisPoints: 100,
      creators: [
        {
          address: signer.publicKey,
          verified: true,
          share: 100,
        },
      ],
      collection: null,
      uses: null,
    };

    let args: CreateMetadataAccountV3InstructionArgs = {
      data: data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.sendAndConfirm(umi);
    console.log(bs58.encode(result.signature));
    // 4bXjUEdtQffNyptHG45zYRctnaCwsURTce5Mxj1ZtADpRKBJ7ejrthLQXr89YojLah8f7kjCmuRshQ4Re8msAQRT
    // 53oorVb3bvr1pewwTYwQmX9RUsS62bva8Sim3ETizqwD1cpkqyGGWPapkMZWR8bvCtFHqXErnzzXBbFMFGD2y2yZ - Q2 2025
    // 2EMXiYBU6h3HnBuXe2VkpoCHQYD5tuCw7pikPQRYNe4tkzio8yJcH8yztpmh4koSn61DtN9eBY1RYSWtLzTa7ooW
    // https://solscan.io/tx/2EMXiYBU6h3HnBuXe2VkpoCHQYD5tuCw7pikPQRYNe4tkzio8yJcH8yztpmh4koSn61DtN9eBY1RYSWtLzTa7ooW?cluster=devnet
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
