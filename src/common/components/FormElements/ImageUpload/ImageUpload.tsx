import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.scss";
import { Button } from "../Button/Button";

interface ImageUploadProps {
  id: string;
  center: boolean;
  onInput: (id: string, file?: File, isValid?: boolean) => void;
  errorText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  center,
  onInput,
  errorText,
}) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<any>();
  const [isValid, setIsVlaid] = useState(false);
  const filePickerRef = useRef<any>();
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickedEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files?.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsVlaid(true);
      fileIsValid = true;
    } else {
      setIsVlaid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        id={id}
        accept=".jpg,.jpeg,.png"
        onChange={pickedEventHandler}
      />
      <div className={`image-upload ${center && `center`}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};
