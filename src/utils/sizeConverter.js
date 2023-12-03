export const sizeConverter = (sizeFile) => {
    return sizeFile >= 1024 ? `${(sizeFile / 1024).toFixed(2)} KB` : `${sizeFile} B`;
}