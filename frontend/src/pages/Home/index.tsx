import React from "react";

import Upload from "../../components/Upload";
import { Container, Content } from "./styles";

export default function Home() {
  return (
    <Container>
      <Content>
        <Upload />
      </Content>
    </Container>
  );
}
