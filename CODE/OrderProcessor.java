public class OrderProcessor {
    private Database database;
    private EmailService emailService;
    private InventorySystem inventorySystem;

    public OrderProcessor() {
        this.database = new Database();
        this.emailService = new EmailService();
        this.inventorySystem = new InventorySystem();
    }

    public void processOrder(Order order) {
        List<Item> items = order.getItems();

        checkIfItemsAvailable(items);

        database.saveOrder(order);

        emailService.sendEmail(order.getCustomerEmail(), "Order Confirmation", "Your order has been received and is being processed.");

        updateInventory(items);

        applyDiscountIfIsLoyal(order);
    }

    public void checkIfItemsAreAvailable(List<Item> items) {
        for (Item item : items) {
            if (!inventorySystem.isItemAvailable(item)) {
                throw new RuntimeException("Item not available in inventory");
            }
        }
    }

    public void updateInventory(List<Item> items) {
        for (Item item : items) {
            inventorySystem.updateInventory(item, item.getQuantity() * -1);
        }
    }

    public void applyDiscountIfIsLoyal(Order order) {        
        if (order instanceof LoyalCustomerOrder) {
            LoyalCustomerOrder loyalCustomerOrder = (LoyalCustomerOrder) order;
            loyalCustomerOrder.applyDiscount();
        }
    }
 }

 public class LoyalCustomerOrder extends Order {
    @Override
    public void applyDiscount() {
        setTotalPrice(getTotalPrice() * 0.9);
    }
 }