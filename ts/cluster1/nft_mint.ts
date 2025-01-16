import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  let tx = createNft(umi, {
    mint: mint,
    sellerFeeBasisPoints: percentAmount(50),
    name: "GreenRug",
    uri: "https://devnet.irys.xyz/Hh2HWh3ntyFr89sHxeuG2z36N8d9PekQdEMAX2nQwgQU",
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );
  // https://explorer.solana.com/tx/5z8Gnhn6JP2GD2PS27zaJfNGjPiBkc14Daq7F1MjobDEcxzCkVa3K9Y58A7hRhsVAQEbQTnMTdkV1tzm9t9AGWBG?cluster=devnet
  console.log("Mint Address: ", mint.publicKey);
  // 6ttRsXC72Ghzu2WUuULyr32Pcc6gD891RQQSkGWmJhUj
})();
