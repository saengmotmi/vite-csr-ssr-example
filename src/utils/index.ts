export const getByteLengthByUTF8 = (str: string) =>
  new TextEncoder().encode(str).buffer.byteLength;
