import React, { useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStore } from "./state/store";
import TableScreen from "./screens/TableScreen";
import CreateTableScreen from "./screens/CreateTableScreen";

import type { FCWithoutChildren } from "./types/component";

const AppRoot: FCWithoutChildren = () => {
  const store = useStore();

  useEffect(() => {
    store.connect();
  }, [store]);

  return (
    <Container>
      {store.data.table ? (
        <TableScreen />
      ) : (
        <CreateTableScreen onCreateTable={store.onCreateTable} />
      )}
    </Container>
  );
};

export default observer(AppRoot);

const Container = styled.div`
  min-height: 100vh;
`;
