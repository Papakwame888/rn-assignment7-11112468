React Native E-commerce App
This app is a simple e-commerce application built with React Native, utilizing AsyncStorage for local data storage and navigation with React Navigation's Drawer Navigator.

Screenshots: 
![WhatsApp Image 2024-07-09 at 10 00 43_ed7dee99](https://github.com/Papakwame888/rn-assignment7-11112468/assets/170115382/8fda3212-e15f-4c7a-9a55-439e72d84358)
![WhatsApp Image 2024-07-09 at 10 00 43_cead7ed8](https://github.com/Papakwame888/rn-assignment7-11112468/assets/170115382/f0a31288-667b-417a-8b8b-e43f62f29c99)
![WhatsApp Image 2024-07-09 at 10 00 43_bd5ad867](https://github.com/Papakwame888/rn-assignment7-11112468/assets/170115382/ffa93e27-4d95-4bc9-9961-b75808bb6ece)
![WhatsApp Image 2024-07-09 at 10 00 43_f423c312](https://github.com/Papakwame888/rn-assignment7-11112468/assets/170115382/8261b2bb-cbbb-4b85-b347-d1a6ef482372)


Design Choices:
Navigation:
Implemented a Drawer Navigator for easy access to Home, Product Details, and Cart screens.
Each screen is designed to display relevant information and allow user interaction.
Screens:
HomeScreen: Displays a list of products fetched from https://fakestoreapi.com/products. Users can view product details and add items to the cart.
ProductDetailScreen: Shows detailed information about a selected product.
CartScreen: Lists items added to the cart, allows removal of items, and displays the total price.
Storage:
AsyncStorage: Used to store the cart items locally on the device. This ensures persistence across app sessions and allows seamless user interaction.
Styling:
StyleSheet: Utilized React Native's StyleSheet API for styling components, ensuring a consistent and user-friendly interface across screens.
Designed responsive and appealing UI components using flexbox and appropriate styling properties.
Implementation Details:
Fetching Data:
Products are fetched from the FakeStore API (https://fakestoreapi.com/products) using fetch API within useEffect hook.
Managing Cart:
Cart items are stored and retrieved from AsyncStorage using AsyncStorage.setItem and AsyncStorage.getItem methods. This allows for persistent storage of user-selected items.
Navigation:
Implemented Drawer Navigator from React Navigation to facilitate seamless navigation between screens.
