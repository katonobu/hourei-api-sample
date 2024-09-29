/**
 * ソースコードのダウンロードリンク コンポーネント
 * @returns {JSX.Element} ソースコードのダウンロードリンク コンポーネント
 */
const SourceDownloadLink = () => {
  const sourceCodeStorageUrl =
    process.env.NEXT_PUBLIC_SOURCE_CODE_STORAGE_URL ?? "";
  const titleAndRole = "ソースコードのダウンロード";

  return (
    <div>
      <a href={sourceCodeStorageUrl} download aria-label={titleAndRole}>
        {titleAndRole}
      </a>
    </div>
  );
};
export default SourceDownloadLink;
