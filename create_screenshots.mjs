import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, filename, text) {
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Dark background gradient
      let r = 9 + Math.floor(15 * (y / height));
      let g = 13 + Math.floor(10 * (x / width));
      let b = 22 + Math.floor(35 * (1 - y / height));

      // Neon card header
      if (y > 40 && y < 140 && x > 30 && x < width - 30) {
        r = Math.floor(30 + 40 * (x / width));
        g = Math.floor(20 + 20 * (y / height));
        b = Math.floor(70 + 80 * (1 - y / height));
      }

      // Accent lines to simulate app UI
      if (y % 45 === 0 && x > 40 && x < width - 40) {
        r = 168; g = 85; b = 247;
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = 255;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }
  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const typeAndData = buf.subarray(4, 8 + len);
    buf.writeUInt32BE(crc32(typeAndData), 8 + len);
    return buf;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const png = Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(filename, png);
  console.log(`Generated: ${filename}`);
}

const pubDir = path.join(process.cwd(), 'client', 'public');
createPng(540, 960, path.join(pubDir, 'screenshot-mobile.png'), 'Sigma Dev Mobile Preview');
createPng(1280, 720, path.join(pubDir, 'screenshot-desktop.png'), 'Sigma Dev Desktop Preview');
