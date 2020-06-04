import React, { useState, useEffect } from "react";
import uniqueId from "lodash/uniqueId";
import filesize from "filesize";

import { Upload, FileList } from "../../components";
import { Container, Content } from "./styles";
import { FileInterface } from "../../components/FileList";
import api from "../../services/api";

interface PostsResponseInterface {
  _id: string;
  name: string;
  url: string;
  size: number;
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<FileInterface[]>([]);

  useEffect(() => {
    api.get<PostsResponseInterface[]>("posts").then(({ data }) => {
      const files = data.map<FileInterface>((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
        error: false,
        progress: 100,
      }));

      setUploadedFiles(files);
    });
  }, []);

  const handleUpload = (files: File[]) => {
    const parsedFiles = files.map<FileInterface>((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
    }));

    setUploadedFiles(uploadedFiles.concat(parsedFiles));
    parsedFiles.forEach((file) => processUpload(file));
  };

  const processUpload = (file: FileInterface) => {
    const data = new FormData();
    data.append("file", file.file!!, file.name);

    api
      .post("posts", data, {
        onUploadProgress: (e: ProgressEvent) => {
          const { loaded, total } = e;
          const progress = Math.round((loaded * 100) / total);
          updateFile(file.id, { ...file, progress });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        updateFile(file.id, {
          ...file,
          uploaded: true,
          id: data._id,
          url: data.url,
        });
      })
      .catch((e) => {
        updateFile(file.id, {
          ...file,
          error: true,
        });
      });
  };

  const updateFile = (id: string, data: FileInterface) => {
    const files = [...uploadedFiles.filter((file) => file.id !== id), data];
    setUploadedFiles(files);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`posts/${id}`);
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList onDelete={handleDelete} files={uploadedFiles} />
        )}
      </Content>
    </Container>
  );
}
