import moment from 'moment'

export const BLOG_NOTIFICATION_TYPE = {
  REPLY: 'REPLY',
  LIKE: 'LIKE'
}
export const mockNotifications = [
  {
    id: 1,
    user: 'JaneDoe',
    type: BLOG_NOTIFICATION_TYPE.REPLY,
    content: 'replied to your comment on the blog "Understanding React Hooks"',
    time: moment().subtract(2, 'hours')
  },
  {
    id: 2,
    user: 'Admin',
    type: BLOG_NOTIFICATION_TYPE.LIKE,
    content: 'liked your blog post "10 Tips for Clean Code"',
    time: moment().subtract(1, 'day')
  }
]

export const categories = [
  'EVENTS',
  'PROMOTIONS',
  'ANNOUNCEMENTS',
  'MENU',
  'EXERCISES',
  'WEIGHT LOSS',
  'DIET PLANS'
]

export const newsItems = [
  {
    image: 'https://storage.googleapis.com/a1aa/image/ee346eb9-9fd5-4200-d074-e7745bef9e33.jpg',
    title: 'ORGANIZING AN EVENT FOR 300+ GUESTS? HERE\'S HOW FITFOOD HELPED THALLO HANDLE LUNCH AND BRAND IMAGE FLAWLESSLY',
    date: '10/05/2025',
    description: 'Fitfood x Thallo: 350 healthy meals for a medical conference – The perfect culinary solution for'
  },
  {
    image: 'https://storage.googleapis.com/a1aa/image/77519fcc-2213-459e-196f-687a74c018d8.jpg',
    title: 'BLOW OUT 10TH BIRTHDAY CANDLES - FITFOOD GIVES YOU 20% OFF',
    date: '02/05/2025',
    description: 'Get 20% off when you comment and share this post'
  },
  {
    image: 'https://storage.googleapis.com/a1aa/image/72dbcbe2-d5d4-4be1-b7d6-bc491242552e.jpg',
    title: 'FITFOOD X FARADAY - SINBLE: HOW TO TURN A LATE WEEKEND AFTERNOON SNACK INTO EMPLOYEES\' FAVORITE TIME?',
    date: '20/04/2025',
    description: 'Weekend, after stressful working hours,'
  }
]

// src/apis/blogDetailMock.js

export const detailedNewsItem = {
  id: 'faraday-sinble-event',
  image: 'https://storage.googleapis.com/a1aa/image/72dbcbe2-d5d4-4be1-b7d6-bc491242552e.jpg',
  title: 'FITFOOD X FARADAY - SINBLE: HOW TO TURN A LATE WEEKEND AFTERNOON SNACK INTO EMPLOYEES’ FAVORITE TIME?',
  date: '04/20/2025',
  categories: ['EVENTS', 'PROMOTIONS', 'ANNOUNCEMENTS'],
  contentMarkdown: `
Office Afternoon Snack: Small but Makes a Big Difference!

At the end of the week, after hours of intense work, a light afternoon snack is the most meaningful treat a company can offer its employees. More than just a meal, a well-planned snack break can:

* Banish fatigue and recharge energy for the afternoon.
* Foster teamល team bonding through shared moments.
* Boost morale and enhance work efficiency.
* Increase employee engagement and satisfaction with the company.

That’s why more and more businesses are paying attention to organizing afternoon snack events. Fitfood and Faraday – Sinble’s Happy Friday is a prime example.

![Office Snack Table](https://storage.googleapis.com/a1aa/image/ee346eb9-9fd5-4200-d074-e7745bef9e33.jpg)

*An example of a delightful office snack setup.*

### Faraday – Sinble: "A Need for Innovation"

Faraday – Sinble is an international investment advisory and asset management firm. With the philosophy of "COMPREHENSIVE AND TRANSPARENT INVESTMENT CONSULTING," they strive to create a professional and friendly work environment for their team.

"We wanted to establish a weekly Friday activity, a light afternoon snack that could foster connection and bring positive energy to our employees," a representative from Faraday – Sinble shared.

![Team Collaboration](https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
*A dynamic and friendly workspace.*

### Fitfood: "Meeting Every Need"

Fitfood is proud to be the chosen culinary partner for Faraday – Sinble. With extensive experience in organizing events of all sizes and flexible menu customization, Fitfood delivered a perfect afternoon snack event:

* **Varied Menu:** From healthy pastries and fresh fruits to mixed salads and detox drinks.
* **Guaranteed Quality:** Fresh, hygienic, and nutritious ingredients.
* **Professional Service:** A dedicated team with quick and tidy setup.

![Healthy Food Spread](https://images.unsplash.com/photo-1540189549336-e6e1ad2e242d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

*Healthy and appealing dishes prepared by Fitfood.*

### Results: "Absolute Satisfaction"

Faraday – Sinble’s afternoon snack event was a resounding success. Employees were thrilled and delighted with the delicious and nutritious treats. The workplace atmosphere became noticeably more relaxed and cheerful.

"Fitfood truly helped us turn an ordinary Friday afternoon into the most anticipated time of the week. We are extremely satisfied with the service quality and look forward to continued collaboration," a Faraday – Sinble representative affirmed.

> **Would you like to organize a similar afternoon snack event for your company?**
>
> Contact Fitfood today for consultation and detailed quotes! We are committed to providing culinary solutions tailored to your needs and budget.
`
}
export const relatedNews = [
  {
    id: 'foody-review-event',
    image: 'https://storage.googleapis.com/a1aa/image/ee346eb9-9fd5-4200-d074-e7745bef9e33.jpg',
    title: 'ORGANIZING AN EVENT FOR 300+ GUESTS? HERE\'S HOW FITFOOD HELPED THALLO HANDLE LUNCH AND BRAND IMAGE FLAWLESSLY',
    date: '10/05/2025'
  },
  {
    id: 'birthday-promotion',
    image: 'https://storage.googleapis.com/a1aa/image/77519fcc-2213-459e-196f-687a74c018d8.jpg',
    title: 'BLOW OUT 10TH BIRTHDAY CANDLES - FITFOOD GIVES YOU 20% OFF',
    date: '02/05/2025'
  },
  {
    id: 'foody-review-event-2',
    image: 'https://storage.googleapis.com/a1aa/image/ee346eb9-9fd5-4200-d074-e7745bef9e33.jpg',
    title: 'FITFOOD X VADP - MORE THAN A HEALTHY LUNCH, A SUSTAINABLE LIFESTYLE PARTNERSHIP',
    date: '16/04/2025'
  }
]

export const mealPackages = [
  {
    id: 'fit-3-package',
    title: 'Half beef steak, sweet potato, cauliflower, pickles',
    price: '650,000đ',
    image: 'https://res.cloudinary.com/quyendev/image/upload/v1752552841/L1-300x300_mgdje8.png',
    calories: 650,
    protein: 40,
    carbs: 50,
    fat: 20,
    slug: 'fit-3-package',
    size: 'low'
  },
  {
    id: 'fit-3-package',
    title: 'Half beef steak, sweet potato, cauliflower, pickles',
    price: '650,000đ',
    image: 'https://res.cloudinary.com/quyendev/image/upload/v1752552841/L1-300x300_mgdje8.png',
    calories: 650,
    protein: 40,
    carbs: 50,
    fat: 20,
    slug: 'fit-3-package',
    size: 'high'
  },
  {
    id: 'fit-3-package',
    title: 'Half beef steak, sweet potato, cauliflower, pickles',
    price: '650,000đ',
    image: 'https://res.cloudinary.com/quyendev/image/upload/v1752552841/L1-300x300_mgdje8.png',
    calories: 650,
    protein: 40,
    carbs: 50,
    fat: 20,
    slug: 'fit-3-package',
    size: 'balance'
  },
  {
    id: 'fit-3-package',
    title: 'Half beef steak, sweet potato, cauliflower, pickles',
    price: '650,000đ',
    image: 'https://res.cloudinary.com/quyendev/image/upload/v1752552841/L1-300x300_mgdje8.png',
    calories: 650,
    protein: 40,
    carbs: 50,
    fat: 20,
    slug: 'fit-3-package',
    size: 'vegetarian'
  },
  {
    id: 'fit-3-package',
    title: 'Half beef steak, sweet potato, cauliflower, pickles',
    price: '650,000đ',
    image: 'https://res.cloudinary.com/quyendev/image/upload/v1752552841/L1-300x300_mgdje8.png',
    calories: 650,
    protein: 40,
    carbs: 50,
    fat: 20,
    slug: 'fit-3-package',
    size: 'low'
  },
  {
    id: 'fit-3-package',
    title: 'Half beef steak, sweet potato, cauliflower, pickles',
    price: '650,000đ',
    image: 'https://res.cloudinary.com/quyendev/image/upload/v1752552841/L1-300x300_mgdje8.png',
    calories: 650,
    protein: 40,
    carbs: 50,
    fat: 20,
    slug: 'fit-3-package',
    size: 'low'
  }
]

export const ItemHealthy = {
  protein: [
    {
      id: 1,
      title: 'Grilled Chicken Breast',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1750922086/Top-blade-beef-steak-300x300_fvv3fj.png',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      type: 'protein'
    },
    {
      id: 2,
      title: 'Salmon Fillet',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1750922086/Top-blade-beef-steak-300x300_fvv3fj.png',
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 13,
      type: 'protein'
    },
    {
      id: 3,
      title: 'Tofu Scramble',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1750922086/Top-blade-beef-steak-300x300_fvv3fj.png',
      calories: 144,
      protein: 15,
      carbs: 5,
      fat: 8,
      type: 'protein'
    },
    {
      id: 4,
      title: 'Grilled Shrimp',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1750922086/Top-blade-beef-steak-300x300_fvv3fj.png',
      calories: 99,
      protein: 24,
      carbs: 0,
      fat: 1,
      type: 'protein'
    }
  ],
  carbs: [
    {
      id: 5,
      title: 'Quinoa Bowl',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      calories: 222,
      protein: 8,
      carbs: 39,
      fat: 4,
      type: 'carbs'
    },
    {
      id: 6,
      title: 'Sweet Potato Mash',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      calories: 180,
      protein: 3,
      carbs: 41,
      fat: 0.2,
      type: 'carbs'
    },
    {
      id: 7,
      title: 'Brown Rice',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      calories: 215,
      protein: 5,
      carbs: 45,
      fat: 1.8,
      type: 'carbs'
    },
    {
      id: 8,
      title: 'Whole Wheat Pasta',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      calories: 174,
      protein: 7.5,
      carbs: 37,
      fat: 0.8,
      type: 'carbs'
    },
    {
      id: 9,
      title: 'Whole Wheat Pasta',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      calories: 174,
      protein: 7.5,
      carbs: 37,
      fat: 0.8,
      type: 'carbs'
    },
    {
      id: 10,
      title: 'Whole Wheat Pasta',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      calories: 174,
      protein: 7.5,
      carbs: 37,
      fat: 0.8,
      type: 'carbs'
    }
  ],
  side: [
    {
      id: 11,
      title: 'Roasted Vegetables',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      calories: 80,
      protein: 3,
      carbs: 12,
      fat: 3,
      type: 'side'
    },
    {
      id: 12,
      title: 'Steamed Broccoli',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      calories: 55,
      protein: 3.7,
      carbs: 11,
      fat: 0.6,
      type: 'side'
    },
    {
      id: 13,
      title: 'Avocado Salad',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      type: 'side'
    },
    {
      id: 14,
      title: 'Grilled Asparagus',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      calories: 40,
      protein: 3,
      carbs: 6,
      fat: 1,
      type: 'side'
    }
  ],
  sauce: [
    {
      id: 15,
      title: 'Pesto',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      calories: 80,
      protein: 2,
      carbs: 2,
      fat: 8,
      type: 'sauce'
    },
    {
      id: 16,
      title: 'Tahini Dressing',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      calories: 89,
      protein: 2.6,
      carbs: 3.2,
      fat: 8,
      type: 'sauce'
    },
    {
      id: 17,
      title: 'Greek Yogurt Sauce',
      image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      calories: 30,
      protein: 3,
      carbs: 2,
      fat: 1.5,
      type: 'sauce'
    }
  ]
}

export const menuSuggest = [
  {
    id: 1,
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 10,
    image: [
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png'
    ],
    description: 'Sous vide duck breast, Baked baby potato, Cold soba, French bean, Wasabi mayos'
  },
  {
    id: 2,
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 10,
    image: [
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png'
    ],
    description: 'Sous vide duck breast, Baked baby potato, Cold soba, French bean, Wasabi mayos'
  },
  {
    id: 3,
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 10,
    image: [
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png'
    ],
    description: 'Sous vide duck breast, Baked baby potato, Cold soba, French bean, Wasabi mayos dddddddddddddddddđssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
  },
  {
    id: 4,
    calories: 100,
    protein: 10,
    carbs: 10,
    fat: 10,
    image: [
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
      'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png'
    ],
    description: 'Sous vide duck breast, Baked baby potato, Cold soba, French bean, Wasabi mayos'
  }
]

export const itemCart = [
  {
    id: 1,
    mealItem: {
      protein: [
        {
          id: 1,
          title: 'Grilled Chicken Breast',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1750922086/Top-blade-beef-steak-300x300_fvv3fj.png',
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 3.6,
          type: 'protein'
        }
      ],
      carbs: [
        {
          id: 5,
          title: 'Quinoa Bowl',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
          calories: 222,
          protein: 8,
          carbs: 39,
          fat: 4,
          type: 'carbs'
        }
      ],
      side: [
        {
          id: 11,
          title: 'Roasted Vegetables',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
          calories: 80,
          protein: 3,
          carbs: 12,
          fat: 3,
          type: 'side'
        }
      ],
      sauce: [
        {
          id: 15,
          title: 'Pesto',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
          calories: 80,
          protein: 2,
          carbs: 2,
          fat: 8,
          type: 'sauce'
        }
      ]
    },
    customer: {
      id: 1,
      name: 'Nguyen Van A',
      email: '0Vn0u@example.com'
    },
    quantity: 1,
    totalPrice: 1200
  },
  {
    id: 2,
    mealItem: {
      protein: [
        {
          id: 1,
          title: 'Grilled Chicken Breast',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1750922086/Top-blade-beef-steak-300x300_fvv3fj.png',
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 3.6,
          type: 'protein'
        }
      ],
      carbs: [
        {
          id: 5,
          title: 'Quinoa Bowl',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Donburi-white-rice--300x300_nszum2.png',
          calories: 222,
          protein: 8,
          carbs: 39,
          fat: 4,
          type: 'carbs'
        }
      ],
      side: [
        {
          id: 11,
          title: 'Roasted Vegetables',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Salad-and-nuts-300x300_rqk6ub.png',
          calories: 80,
          protein: 3,
          carbs: 12,
          fat: 3,
          type: 'side'
        }
      ],
      sauce: [
        {
          id: 15,
          title: 'Pesto',
          image: 'https://res.cloudinary.com/quyendev/image/upload/v1751107724/Cilantro-lime-300x300_sf78nk.png',
          calories: 80,
          protein: 2,
          carbs: 2,
          fat: 8,
          type: 'sauce'
        }
      ]
    },
    customer: {
      id: 1,
      name: 'Nguyen Van A',
      email: '0Vn0u@example.com'
    },
    quantity: 2,
    totalPrice: 1200
  }
]

export const products = [
  {
    id: 1,
    name: 'Royal Canin Adult Dog Food',
    brand: 'Royal Canin',
    category: 'Food',
    price: 450000,
    description: 'Nutritious food for adult dogs, supports digestion and skin health.',
    stock: 50,
    sku: 'RC-ADULT-001',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'royal-canin-adult-dog-food',
    weight: 1
  },
  {
    id: 2,
    name: 'Nylon Dog Leash Accessory',
    brand: 'Generic',
    category: 'Accessory',
    price: 150000,
    description: 'Durable and comfortable leash for pets, various colors.',
    stock: 30,
    sku: 'LEASH-NYLON-002',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'nylon-dog-leash-accessory',
    weight: 0.5
  },
  {
    id: 3,
    name: 'Multi-functional Cat Cage',
    brand: 'Generic',
    category: 'Cage',
    price: 800000,
    description: 'Safe and easy-to-clean cat cage, medium size.',
    stock: 20,
    sku: 'CAGE-CAT-003',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'multi-functional-cat-cage',
    weight: 5
  },
  {
    id: 4,
    name: 'Comprehensive Vitamin for Cats',
    brand: 'Generic',
    category: 'Supplement',
    price: 200000,
    description: 'Vitamins to support overall cat health, boost immunity.',
    stock: 40,
    sku: 'VITAMIN-CAT-004',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'comprehensive-vitamin-for-cats',
    weight: 0.2
  },
  {
    id: 5,
    name: 'Rubber Ball Toy for Dogs',
    brand: 'Kong',
    category: 'Toy',
    price: 50000,
    description: 'Durable and safe toy to help dogs exercise and have fun.',
    stock: 100,
    sku: 'TOY-BALL-005',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'rubber-ball-toy-for-dogs',
    weight: 0.1
  },
  {
    id: 6,
    name: 'Pedigree Puppy Dog Food',
    brand: 'Pedigree',
    category: 'Food',
    price: 350000,
    description: 'Balanced nutrition for puppies, promotes healthy growth.',
    stock: 60,
    sku: 'PED-PUPPY-006',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'pedigree-puppy-dog-food',
    weight: 2
  },
  {
    id: 7,
    name: 'Whiskas Adult Cat Food',
    brand: 'Whiskas',
    category: 'Food',
    price: 250000,
    description: 'Tasty and nutritious food for adult cats, with essential vitamins.',
    stock: 45,
    sku: 'WHISKAS-ADULT-007',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'whiskas-adult-cat-food',
    weight: 1.5
  },
  {
    id: 8,
    name: 'Kong Classic Dog Toy',
    brand: 'Kong',
    category: 'Toy',
    price: 120000,
    description: 'Classic rubber toy for dogs, durable and fun for chewing.',
    stock: 80,
    sku: 'KONG-CLASSIC-008',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'kong-classic-dog-toy',
    weight: 0.15
  },
  {
    id: 9,
    name: 'Purina Pro Plan Sensitive Skin Dog Food',
    brand: 'Purina',
    category: 'Food',
    price: 500000,
    description: 'Specialized food for dogs with sensitive skin, hypoallergenic formula.',
    stock: 35,
    sku: 'PURINA-SKIN-009',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'purina-pro-plan-sensitive-skin-dog-food',
    weight: 3
  },
  {
    id: 10,
    name: 'Friskies Cat Treats',
    brand: 'Friskies',
    category: 'Treat',
    price: 80000,
    description: 'Delicious treats for cats, available in various flavors.',
    stock: 70,
    sku: 'FRISKIES-TREAT-010',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'friskies-cat-treats',
    weight: 0.5
  },
  {
    id: 11,
    name: 'Hill\'s Science Diet Adult Dog Food',
    brand: 'Hill\'s',
    category: 'Food',
    price: 600000,
    description: 'Science-based nutrition for adult dogs, supports overall health.',
    stock: 25,
    sku: 'HILLS-ADULT-011',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'hills-science-diet-adult-dog-food',
    weight: 2.5
  },
  {
    id: 12,
    name: 'Iams Proactive Health Cat Food',
    brand: 'Iams',
    category: 'Food',
    price: 400000,
    description: 'Nutritious food for cats, promotes healthy digestion and coat.',
    stock: 55,
    sku: 'IAMS-CAT-012',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'iams-proactive-health-cat-food',
    weight: 1.8
  },
  {
    id: 13,
    name: 'PetSafe Automatic Feeder',
    brand: 'PetSafe',
    category: 'Accessory',
    price: 900000,
    description: 'Automatic feeder for pets, programmable portions.',
    stock: 15,
    sku: 'PETSAFE-FEEDER-013',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'petsafe-automatic-feeder',
    weight: 2
  },
  {
    id: 14,
    name: 'Blue Buffalo Wilderness Dog Food',
    brand: 'Blue Buffalo',
    category: 'Food',
    price: 550000,
    description: 'Grain-free food for dogs, high protein from natural sources.',
    stock: 40,
    sku: 'BLUE-WILDERNESS-014',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'blue-buffalo-wilderness-dog-food',
    weight: 2.7
  },
  {
    id: 15,
    name: 'Fancy Feast Gourmet Cat Food',
    brand: 'Fancy Feast',
    category: 'Food',
    price: 300000,
    description: 'Gourmet wet food for cats, variety of flavors.',
    stock: 50,
    sku: 'FANCY-FEAST-015',
    image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
    slug: 'fancy-feast-gourmet-cat-food',
    weight: 1.2
  }
]

export const mockCart = {
  totalItems: 3,
  totalAmount: 1000000,
  cartItems: [
    {
      id: 1,
      menuMealId: null,
      customMealId: null,
      title: 'Royal Canin Adult Dog Food',
      image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
      quantity: 1,
      totalPrice: 450000
    },
    {
      id: 2,
      menuMealId: null,
      customMealId: null,
      title: 'Nylon Dog Leash Accessory',
      image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
      quantity: 2,
      totalPrice: 300000
    },
    {
      id: 3,
      menuMealId: null,
      customMealId: null,
      title: 'Multi-functional Cat Cage',
      image: 'https://www.petmart.vn/wp-content/uploads/2023/04/sot-thit-cuu-ham-lua-mach-rau-cu-cho-cho-jerhigh-lamb-stew-with-barley-rice-vegetable-400x400.jpg',
      quantity: 1,
      totalPrice: 250000
    }
  ]
}