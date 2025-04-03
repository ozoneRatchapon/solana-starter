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
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");
const image_path = "ts/greengenerug_with_jeff.gif";

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    const image = await readFile(image_path);
    //2. Convert image to generic file.
    const generic_file = createGenericFile(image, "greengenerug", {
      displayName: "Very, Very Rare Rug",
      contentType: "image/gif",
    });
    //3. Upload image
    const [myUri] = await umi.uploader.upload([generic_file]);
    console.log("Your image URI: ", myUri);
    // https://devnet.irys.xyz/6AsELgdAUcoC58KiCENPWVcP9AbBDFg1C8eaCGLDJpzV
    // https://devnet.irys.xyz/7BHQ9wvdnQxC6Uy1oVYM51FGdhUmd39dYjmCi3iDZAiL - Q2 2025
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
