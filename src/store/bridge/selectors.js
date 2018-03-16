import { createSelector } from "reselect";

const bridges = ({
  bridge: {
    bridges,
  },
}) => bridges;

const isLoading = ({
  bridge: {
    loading,
  },
}) => loading;

const selectedId = ({
  bridge: {
    selectedId,
  },
}) => selectedId;

const selected = createSelector(
  bridges,
  selectedId,
  (bridges, id) => bridges.find(bridge => bridge && bridge.id === id)
);

export default {
  bridges,
  isLoading,
  selected,
};
