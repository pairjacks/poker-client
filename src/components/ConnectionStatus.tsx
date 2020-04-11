import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStore, ServerConnectionStatus } from "../state/store";
import type { FCWithoutChildren } from "../types/component";

const ConnectionStatus: FCWithoutChildren = () => {
  const store = useStore();

  return (
    <Container status={store.data.connectionStatus}>
      {store.data.connectionStatus}
    </Container>
  );
};

export default observer(ConnectionStatus);

const Container = observer(styled.div<{
  status: ServerConnectionStatus;
}>`
  color: ${({ status, theme }) => {
    switch (status) {
      case "connected":
        return theme.colors.serverConnected;
      case "disconnected":
        return theme.colors.serverDisconnected;
      case "connecting":
        return theme.colors.serverConnecting;
    }
  }};
`);
