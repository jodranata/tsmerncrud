const toBase64 = (
  file: File | Blob,
  cb: (err: string | null, data?: string | ArrayBuffer | null) => void,
): void => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (): void => cb(null, reader.result);
  reader.onerror = (): void => cb(`Failed to read file ${reader.error}`);
};

export default toBase64;
