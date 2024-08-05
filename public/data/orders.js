const orders = [
  {
    orderNumber: "123456789",
    dateOfOrder: "09/10/2023",
    status: "Pending",
    deliveryDate: "Delivery Between Thursday 19 October and Friday 20 October",
    packedOn: "Monday 15 October",
    total: "ksh 1000",
    items: [
      {
        id: "item1",
        name: "Grilled Salmon",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456790",
    dateOfOrder: "25/09/2023",
    status: "Out for Delivery",
    deliveryDate: "Delivery Between Wednesday 18 October and Thursday 19 October",
    packedOn: "Monday 1 October",
    total: "ksh 2000",
    items: [
      {
        id: "item2",
        name: "Spicy Shrimp",
        quantity: 1,
        productImage: "/fried.jpeg"
      },
      {
        id: "item3",
        name: "Lobster Bisque",
        quantity: 2,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456791",
    dateOfOrder: "12/10/2023",
    status: "Delivered",
    deliveryDate: "Delivered on Monday 16 October",
    packedOn: "Monday 19 October",
    total: "ksh 3000",
    items: [
      {
        id: "item4",
        name: "Baked Cod",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456792",
    dateOfOrder: "03/10/2023",
    status: "In Transit",
    deliveryDate: "Delivery Between Friday 20 October and Saturday 21 October",
    packedOn: "Monday 12 October",
    total: "ksh 100",
    items: [
      {
        id: "item5",
        name: "Crab Cakes",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456793",
    dateOfOrder: "29/09/2023",
    status: "Received",
    deliveryDate: "Delivery Between Tuesday 17 October and Wednesday 18 October",
    packedOn: "Monday 8 October",
    total: "ksh 900",
    items: [
      {
        id: "item6",
        name: "Lobster Roll",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456794",
    dateOfOrder: "01/10/2023",
    status: "Cancelled",
    deliveryDate: "Order Cancelled",
    packedOn: "Monday 12 October",
    total: "ksh 1100",
    items: [
      {
        id: "item7",
        name: "Tuna Sashimi",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456795",
    dateOfOrder: "11/10/2023",
    status: "Processing",
    deliveryDate: "Delivery Between Saturday 21 October and Sunday 22 October",
    packedOn: "Monday 15 October",
    total: "ksh 2000",
    items: [
      {
        id: "item8",
        name: "Shrimp Tacos",
        quantity: 1,
        productImage: "/fried.jpeg"
      },
      {
        id: "item9",
        name: "Calamari",
        quantity: 3,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456796",
    dateOfOrder: "06/10/2023",
    status: "Delivered",
    deliveryDate: "Delivered on Sunday 22 October",
    packedOn: "Monday 10 October",
    total: "ksh 1000",
    items: [
      {
        id: "item10",
        name: "Oyster Platter",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456797",
    dateOfOrder: "02/10/2023",
    status: "Delivered",
    deliveryDate: "Delivered on Monday 23 October",
    packedOn: "Monday 9 October",
    total: "ksh 1000",
    items: [
      {
        id: "item11",
        name: "Seafood Paella",
        quantity: 1,
        productImage: "/fried.jpeg"
      }
    ]
  },
  {
    orderNumber: "123456798",
    dateOfOrder: "09/10/2023",
    status: "Ready for Pickup",
    deliveryDate: "Pickup Between Tuesday 17 October and Wednesday 18 October",
    packedOn: "Monday 18 October",
    total: "ksh 9000",
    items: [
      {
        id: "item12",
        name: "Clam Chowder",
        quantity: 1,
        productImage: "/fried.jpeg"
      },
      {
        id: "item13",
        name: "Lobster Bisque",
        quantity: 2,
        productImage: "/fried.jpeg"
      },
      {
        id: "item14",
        name: "Fish and Chips",
        quantity: 1,
        productImage: "/fried.jpeg"
      },
      {
        id: "item15",
        name: "Crab Salad",
        quantity: 3,
        productImage: "/fried.jpeg"
      }
    ]
  }
];

export default orders;
