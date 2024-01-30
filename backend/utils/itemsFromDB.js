exports.itemsFromDB = async function (items, model) {
  const itemsDB = items.map(async (item) => {
    try {
      const itemDB = await model.findById(item.id);

      if (!itemDB) {
        return {
          notFound: true,
          itemId: item.id,
        };
      }

      if (!itemDB.available) {
        return {
          notAvailable: true,
          itemId: item.id,
        };
      }

      return itemDB;
    } catch (err) {
      return {
        error: true,
        itemId: item.id,
      };
    }
  });

  const awaitedItemsDB = await Promise.all(itemsDB);

  return awaitedItemsDB;
};
