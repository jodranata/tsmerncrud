const encodeBase64 = (
  file: File | Blob,
  cb: (err: string | null, data?: string) => void,
): void => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (): void => {
    if (typeof reader.result === 'string') cb(null, reader.result);
  };
  reader.onerror = (): void => cb(`Failed to read file ${reader.error}`);
};

export default encodeBase64;
