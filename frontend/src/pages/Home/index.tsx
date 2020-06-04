import React from "react";

import { Upload, FileList } from "../../components";
import { Container, Content } from "./styles";

export default function Home() {
  return (
    <Container>
      <Content>
        <Upload />
        <FileList />
      </Content>
    </Container>
  );
}
