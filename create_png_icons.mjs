import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(size, filename) {
  const width = size;
  const height = size;

  // Raw RGBA pixel buffer (each row has 1 filter byte (0) + width * 4 bytes)
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      
      // Distance from center
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Dark theme background with purple/cyan subtle gradient
      let r = 9;
      let g = 13;
      let b = 22;

      // Outer rounded square glow
      const nx = Math.abs(dx);
      const ny = Math.abs(dy);
      const isInsideCard = Math.pow(nx, 4) + Math.pow(ny, 4) < 0.7;

      if (isInsideCard) {
        // Gradient inside card
        r = Math.floor(25 + 60 * (x / width));
        g = Math.floor(15 + 30 * (y / height));
        b = Math.floor(55 + 120 * (1 - y / height));
      }

      // Draw Sigma Symbol "Σ"
      const sx = x / width;
      const sy = y / height;
      let isSigma = false;

      // Top horizontal bar: y in [0.28, 0.35], x in [0.30, 0.72]
      if (sy >= 0.28 && sy <= 0.35 && sx >= 0.30 && sx <= 0.72) isSigma = true;
      // Bottom horizontal bar: y in [0.65, 0.72], x in [0.30, 0.72]
      if (sy >= 0.65 && sy <= 0.72 && sx >= 0.30 && sx <= 0.72) isSigma = true;
      // Top diagonal: from (0.30, 0.30) to (0.55, 0.50)
      const topDiagDist = Math.abs((sy - 0.30) - (0.8 * (sx - 0.30)));
      if (sx >= 0.30 && sx <= 0.55 && sy >= 0.30 && sy <= 0.52 && topDiagDist < 0.05) isSigma = true;
      // Bottom diagonal: from (0.55, 0.50) to (0.30, 0.70)
      const botDiagDist = Math.abs((sy - 0.50) + (0.8 * (sx - 0.55)));
      if (sx >= 0.30 && sx <= 0.55 && sy >= 0.48 && sy <= 0.70 && botDiagDist < 0.05) isSigma = true;

      if (isSigma) {
        // Neon gradient: cyan to purple to pink
        r = Math.floor(168 + 70 * sx);
        g = Math.floor(85 + 100 * (1 - sy));
        b = 247;
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = 255; // Alpha
    }
  }

  // Deflate pixel data
  const deflated = zlib.deflateSync(rawData);

  // Helper CRC32
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const typeAndData = buf.subarray(4, 8 + len);
    const crc = crc32(typeAndData);
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT chunk
  const idatChunk = makeChunk('IDAT', deflated);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const pngBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(filename, pngBuffer);
  console.log(`Generated ${size}x${size} PNG: ${filename}`);
}

const pubDir = path.join(process.cwd(), 'client', 'public');
createPng(192, path.join(pubDir, 'icon-192.png'));
createPng(512, path.join(pubDir, 'icon-512.png'));

