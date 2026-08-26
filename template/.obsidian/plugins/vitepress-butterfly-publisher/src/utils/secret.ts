import nacl from "tweetnacl";
import { blake2b } from "@noble/hashes/blake2.js";

/**
 * Encrypts a value for the GitHub Actions secrets API using libsodium's
 * sealed box scheme, implemented with tweetnacl + @noble/hashes:
 *
 *   1. generate an ephemeral X25519 keypair
 *   2. nonce = BLAKE2b-256(ephemeral_pk || recipient_pk) truncated to 24 bytes
 *   3. ciphertext = crypto_box(message, nonce, recipient_pk, ephemeral_sk)
 *   4. output = ephemeral_pk (32 bytes) || ciphertext
 *
 * This mirrors libsodium's crypto_box_seal exactly (the nonce is derived,
 * NOT all-zero), so GitHub's server can decrypt it.
 */
export function encryptGitHubSecret(
  value: string,
  publicKey: string,
): string {
  if (!value) {
    throw new Error("A GitHub Actions secret cannot be empty.");
  }

  const recipient = base64ToBytes(publicKey);
  const ephemeral = nacl.box.keyPair();

  const material = new Uint8Array(64);
  material.set(ephemeral.publicKey);
  material.set(recipient, 32);
  const nonce = blake2b(material, { dkLen: 24 });

  const message = new TextEncoder().encode(value);
  const ciphertext = nacl.box(message, nonce, recipient, ephemeral.secretKey);

  const sealed = new Uint8Array(ephemeral.publicKey.length + ciphertext.length);
  sealed.set(ephemeral.publicKey);
  sealed.set(ciphertext, ephemeral.publicKey.length);

  return bytesToBase64(sealed);
}

function base64ToBytes(input: string): Uint8Array {
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

/** Encodes binary data for GitHub's API as standard base64. */
function bytesToBase64(content: ArrayBuffer | Uint8Array): string {
  const bytes = content instanceof Uint8Array
    ? content
    : new Uint8Array(content);
  let binary = "";
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.byteLength; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}
