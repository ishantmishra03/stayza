import {
  FaWifi,
  FaSwimmer,
  FaMountain,
  FaConciergeBell,
  FaUtensils,
 
} from "react-icons/fa";

export const rooms = [
  {
    _id: "1",
    name: "Urbanza Suites",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuiqBUjWhCZp0Pq4D64sSR4JGRi9viZq7uAQ&s",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    ],
    location: "Main Road 123 Street, 23 Colony",
    pricePerNight: 299,
    rating: 4.5,
    type: "Luxury Room",
    amenities: ["Free Wifi", "Pool Access", "Room Service"],
    isAvailable: true,
  },
  {
    _id: "2",
    name: "Skyline Inn",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuiqBUjWhCZp0Pq4D64sSR4JGRi9viZq7uAQ&s",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    ],
    location: "Central Ave, Downtown",
    pricePerNight: 219,
    rating: 4.3,
    type: "Double Bed",
    amenities: ["Free Wifi", "Mountain View", "Free Breakfast"],
    isAvailable: true,
  },
  {
    _id: "3",
    name: "Coastal Escape",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuiqBUjWhCZp0Pq4D64sSR4JGRi9viZq7uAQ&s",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    ],
    location: "Beachside Blvd, Oceanview",
    pricePerNight: 349,
    rating: 4.7,
    type: "Luxury Room",
    amenities: ["Pool Access", "Room Service", "Free Wifi"],
    isAvailable: true,
  },
  {
    _id: "4",
    name: "Mountain Retreat",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuiqBUjWhCZp0Pq4D64sSR4JGRi9viZq7uAQ&s",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    ],
    location: "Hilltop Heights",
    pricePerNight: 189,
    rating: 4.2,
    type: "Single Bed",
    amenities: ["Mountain View", "Free Breakfast", "Room Service"],
    isAvailable: false,
  },
];

export const amenityIcons = {
  "Free Wifi": <FaWifi />,
  "Pool Access": <FaSwimmer />,
  "Mountain View": <FaMountain />,
  "Room Service": <FaConciergeBell />,
  "Free Breakfast": <FaUtensils />,
};

export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Dev",
    "email": "dev@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "admin",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Urbanza Suites",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}


export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": rooms[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": rooms[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": rooms[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}


