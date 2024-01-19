import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export type ImageFileType = {
  file: File;
  url: string;
  id: string;
};

type ImageStateType = {
  [key: string]: ImageFileType[] | ImageFileType | null;
};

type FileHandlerReturnType = {
  imageFile: ImageStateType;
  setImageFile: React.Dispatch<React.SetStateAction<ImageStateType>>;
  isFileLoading: boolean;
  onFileChange: (
    event: ChangeEvent<HTMLInputElement>,
    options: { name: string; type: string }
  ) => void;
  removeImage: ({ id, name }: { id: string; name: string }) => void;
};

const useFileHandler = (initState: ImageStateType): FileHandlerReturnType => {
  const [imageFile, setImageFile] = useState<ImageStateType>(initState);
  const [isFileLoading, setFileLoading] = useState<boolean>(false);

  const removeImage = ({ id, name }: { id: string; name: string }): void => {
    const items = (imageFile[name] as ImageFileType[]).filter(
      (item) => item.id !== id
    );

    setImageFile({
      ...imageFile,
      [name]: items,
    });
  };

  const onFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    { name, type }: { name: string; type: string }
  ): void => {
    const val = event.target.value;
    const img = event.target.files?.[0];
    const size = img?.size ? img.size / 1024 / 1024 : 0;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setFileLoading(true);
    if (!regex.exec(val)) {
      toast.error("File type must be JPEG or PNG");
      setFileLoading(false);
    } else if (size > 0.5) {
      toast.error("File size exceeded 500kb, consider optimizing your image");
      setFileLoading(false);
    } else if (type === "multiple") {
      Array.from(event.target.files || []).forEach((file) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setImageFile((oldFiles) => ({
            ...oldFiles,
            [name]: [
              ...(oldFiles[name] as ImageFileType[]),
              { file, url: e.target?.result as string, id: uuidv4() },
            ],
          }));
        });
        reader.readAsDataURL(file);
      });

      setFileLoading(false);
    } else {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        setImageFile({
          ...imageFile,
          [name]: {
            file: img as File,
            url: e.target?.result as string,
            id: uuidv4(),
          },
        });
        setFileLoading(false);
      });
      reader.readAsDataURL(img as File);
    }
  };

  return {
    imageFile,
    setImageFile,
    isFileLoading,
    onFileChange,
    removeImage,
  };
};

export default useFileHandler;
