export function base64ToImage(base64: string): string {
  const parts = base64.split(",");
  const byteString = atob(parts[1]);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteString.length; offset += 512) {
    const slice = byteString.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "image/jpeg" });

  const imageURL = URL.createObjectURL(blob);

  return imageURL;
}
