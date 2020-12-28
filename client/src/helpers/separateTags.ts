const tagRegex = /^(?!\d+$)(?:[a-zA-Z][a-zA-Z ']*)?$/;

const separateTags = (text: string): string[] => {
  return text
    .split(',')
    .map((tag: string) => tag.trim())
    .filter((val: string) => val && tagRegex.test(val));
};

export default separateTags;
