// import wallet from "../wba-wallet.json";
import { readFileSync } from 'fs';
import { join } from 'path';

const walletPath = join(process.env.HOME || process.env.USERPROFILE || '', '.config', 'solana', 'id.json');
const wallet = JSON.parse(readFileSync(walletPath, 'utf-8'));


import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      "https://devnet.irys.xyz/7BHQ9wvdnQxC6Uy1oVYM51FGdhUmd39dYjmCi3iDZAiL";
    const metadata = {
      name: "Very, Very Rare Rug with Jeff",
      symbol: "RARERUG",
      description: "Very, Very Rare Rug with Jeff",
      image: image,
      attributes: [{ trait_type: "", value: "100" }],
      properties: {
        files: [
          {
            type: "image/gif",
            uri: "https://devnet.irys.xyz/7BHQ9wvdnQxC6Uy1oVYM51FGdhUmd39dYjmCi3iDZAiL",
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
    // https://devnet.irys.xyz/Hh2HWh3ntyFr89sHxeuG2z36N8d9PekQdEMAX2nQwgQU
    // https://devnet.irys.xyz/J7GQS9dStNw16MiBwDwUJ6tBEbpYjunKN6DrLU5RAfZL - Q2 2025
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
