import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStore } from "../state/store";
import type { FCWithoutChildren } from "../types/component";

const ConnectionStatus: FCWithoutChildren = () => {
  const store = useStore();

  return (
    <Container status={store.data.isConnected ? "connected" : "disconnected"}>
      {store.data.isConnected ? "Connected" : "Disconnected"}
    </Container>
  );
};

export default observer(ConnectionStatus);

const Container = observer(styled.div<{
  status: "connected" | "disconnected";
}>`
  color: ${({ status, theme }) =>
    status === "connected"
      ? theme.colors.serverConnected
      : theme.colors.serverDisconnected};
`);
