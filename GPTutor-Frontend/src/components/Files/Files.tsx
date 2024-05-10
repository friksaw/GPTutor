import React, { useCallback, useRef, useState } from "react";
import fileExtension from "./utils/fileExtension";
import fileSizeReadable from "./utils/fileSizeReadable";
import fileTypeAcceptable from "./utils/fileTypeAcceptable";

interface IProps {
  accepts: string[];
  children: (isDragging: boolean) => React.ReactNode;
  className: string;
  clickable: boolean;
  dragActiveClassName: string;
  inputProps: any;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize: number;
  minFileSize: number;
  name: string;
  onChange: (files: File[]) => void;
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.ChangeEventHandler<HTMLInputElement>;
  onError: (error: any, file: File) => void;
}

const Files = ({
  accepts,
  children,
  className,
  clickable,
  dragActiveClassName,
  inputProps,
  multiple,
  maxFiles,
  maxFileSize,
  minFileSize,
  name,
  onChange,
  onDragEnter,
  onDragLeave,
  onError,
}: IProps) => {
  const idCounter = useRef(1);
  const dropzoneElement = useRef<any>();
  const inputElement = useRef<any>();
  const [isDragging, setDragging] = useState(false);

  const handleError = (error: any, file: File) => {
    onError(error, file);
  };

  const handleDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (event) => {
    const el = dropzoneElement.current as any;
    if (dragActiveClassName && !el.className.includes(dragActiveClassName)) {
      el.className = `${el.className} ${dragActiveClassName}`;
    }

    if (typeof children === "function") {
      setDragging(true);
    }

    if (onDragEnter) {
      onDragEnter(event);
    }
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    event: any
  ) => {
    const el = dropzoneElement.current as any;
    if (dragActiveClassName) {
      el.className = el.className.replace(` ${dragActiveClassName}`, "");
    }

    if (typeof children === "function") {
      setDragging(false);
    }

    if (onDragLeave) {
      onDragLeave(event);
    }
  };

  const openFileChooser = () => {
    if (!inputElement.current) return;

    inputElement.current.value = null;
    inputElement.current.click();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event: any) => {
    event.preventDefault();
    handleDragLeave(event);

    // Collect added files, perform checking, cast pseudo-array to Array,
    // then return to method
    let filesAdded = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    // Multiple files dropped when not allowed
    if (!multiple && filesAdded.length > 1) {
      filesAdded = [filesAdded[0]];
    }

    const fileResults: File[] = [];
    for (let i = 0; i < filesAdded.length; i += 1) {
      const file = filesAdded[i];

      // Assign file an id
      file.id = `files-${idCounter.current}`;
      idCounter.current += 1;

      // Tell file it's own extension
      file.extension = fileExtension(file);

      // Tell file it's own readable size
      file.sizeReadable = fileSizeReadable(file.size);

      // Add preview, either image or file extension
      if (file.type && file.type.split("/")[0] === "image") {
        file.preview = {
          type: "image",
          url: window.URL.createObjectURL(file),
        };
      } else {
        file.preview = {
          type: "file",
        };
      }

      // Check max file count
      if (maxFiles && fileResults.length >= maxFiles) {
        handleError(
          {
            code: 4,
            message: "maximum file count reached",
          },
          file
        );

        break;
      }

      // Check if file is too big
      if (file.size > maxFileSize) {
        handleError(
          {
            code: 2,
            message: `${file.name} is too large`,
          },
          file
        );

        break;
      }

      // Check if file is too small
      if (file.size < minFileSize) {
        handleError(
          {
            code: 3,
            message: `${file.name} is too small`,
          },
          file
        );

        break;
      }

      console.log(file);
      // Ensure acceptable file type
      if (!fileTypeAcceptable(accepts, file)) {
        handleError(
          {
            code: 1,
            message: `${file.name} is not a valid file type`,
          },
          file
        );

        break;
      }

      fileResults.push(file);
    }

    onChange(fileResults);
  };

  return (
    <>
      <input
        {...inputProps}
        ref={inputElement}
        type="file"
        accept={accepts ? accepts.join() : ""}
        multiple={multiple}
        name={name}
        style={{ display: "none" }}
        onChange={handleDrop}
      />
      <div
        ref={dropzoneElement}
        className={className}
        onClick={clickable ? openFileChooser : undefined}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {typeof children === "function" ? children(isDragging) : children}
      </div>
    </>
  );
};

export default Files;
