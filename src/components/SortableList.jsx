import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

const SortableList = ({ items, renderItem, onSort }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const sortable = Sortable.create(listRef.current, {
      animation: 150,
      handle: ".drag-handle",
      onEnd: (evt) => {
        onSort(evt.oldIndex, evt.newIndex);
      },
    });

    return () => sortable.destroy();
  }, [onSort]);

  return (
    <div ref={listRef}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default SortableList;
