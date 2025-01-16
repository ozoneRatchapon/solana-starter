import wallet from "../wba-wallet.json";
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
      "https://devnet.irys.xyz/6AsELgdAUcoC58KiCENPWVcP9AbBDFg1C8eaCGLDJpzV";
    const metadata = {
      name: "GreenRug",
      symbol: "GRUG",
      description: "more Green",
      image: image,
      attributes: [{ trait_type: "", value: "100" }],
      properties: {
        files: [
          {
            type: "image/png",
            uri: "https://devnet.irys.xyz/6AsELgdAUcoC58KiCENPWVcP9AbBDFg1C8eaCGLDJpzV",
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
    // https://devnet.irys.xyz/Hh2HWh3ntyFr89sHxeuG2z36N8d9PekQdEMAX2nQwgQU
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
