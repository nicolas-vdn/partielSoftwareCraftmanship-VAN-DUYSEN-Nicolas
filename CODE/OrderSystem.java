public class OrderSystem {
    private Map<Integer, List<String>> orderList; // Liste des commandes

    public void addNewOrder(Integer customerID, String itemName) {
        List<String> items = orderList.getOrDefault(customerID, new ArrayList<>());

        items.add(itemName);

        orderList.put(customerID, items);
    }

    public void modifyOrder(Integer customerID, Integer itemIndex, String newItemName) {
        List<String> items = orderList.get(customerID);

        if (isValidItem(items, itemIndex)) {
            items.set(itemIndex, newItemName);
        }
    }

    public void removeOrder(Integer customerID, Integer itemIndex) {
        List<String> items = orderList.get(customerID);

        if (isValidItem(items, itemIndex)) {
            items.remove(itemIndex);
        }
    }

    public void isValidItem(List<String> items, Integer itemIndex) {
        return items != null && itemIndex < items.size()
    }
    
    @Override
    public void toString() {
        for (Map.Entry<Integer, List<String>> entry : orderList.entrySet()) {
            
        System.out.println("Customer ID: " + entry.getKey());
        System.out.println("Items: " + String.join(", ", entry.getValue()));
        System.out.println();
        }
    }
}