function FileUploadInput({
  handleChange,
  hiddenFileInput,
  accept,
  multiple,
}: {
  handleChange: any;
  hiddenFileInput: any;
  accept?: string;
  multiple?: boolean;
}) {
  return (
    <input
      type="file"
      multiple={multiple}
      accept={accept ? accept : "image/*"}
      onChange={(e) => handleChange(e)}
      ref={hiddenFileInput}
      style={{ display: "none" }}
    />
  );
}

export default FileUploadInput;
