export type OrderMode = 'table' | 'takeaway' | 'delivery'

export type OptionChoice = {
  id: string
  label: string
  priceDelta: number
}

export type OptionGroup = {
  id: string
  title: string
  type: 'single' | 'multi'
  required?: boolean
  choices: OptionChoice[]
}

export type MenuItem = {
  id: string
  number: string
  name: string
  description: string
  price: number
  available: boolean
  tags: string[] // 'veg' | 'best' | 'new'
  options: OptionGroup[]
  swatch: string // css color for the drawn placeholder
  allergens?: string
}

export type MenuCategory = {
  id: string
  name: string
  descriptor: string
  items: MenuItem[]
}

export type CartLine = {
  lineId: string
  itemId: string
  name: string
  number: string
  basePrice: number
  unitPrice: number
  quantity: number
  selections: { groupTitle: string; label: string }[]
  note?: string
}

export type PastOrder = {
  id: string
  date: string
  mode: OrderMode
  itemCount: number
  total: number
  status: string
  lines: { name: string; qty: number; price: number }[]
}

export type WalletTx = {
  id: string
  date: string
  description: string
  amount: number
}

const g = (color: string) => color

export const MENU: MenuCategory[] = [
  {
    id: 'espresso',
    name: 'اسپرسو بار',
    descriptor: 'برنامهٔ اسپرسو تک‌خاستگاه و ترکیبی، دم‌آوری لحظه‌ای',
    items: [
      {
        id: 'esp-double',
        number: '01',
        name: 'اسپرسو دوبل',
        description: 'دو شات غلیظ از دانهٔ ترکیبی خانه با کرمای طلایی',
        price: 65000,
        available: true,
        tags: ['best'],
        swatch: g('oklch(0.32 0.05 56)'),
        allergens: 'بدون آلرژن شناخته‌شده',
        options: [
          {
            id: 'beans',
            title: 'انتخاب دانه',
            type: 'single',
            required: true,
            choices: [
              { id: 'house', label: 'ترکیب خانه', priceDelta: 0 },
              { id: 'ethiopia', label: 'تک‌خاستگاه اتیوپی', priceDelta: 12000 },
            ],
          },
          {
            id: 'shots',
            title: 'افزودنی',
            type: 'multi',
            choices: [
              { id: 'extra', label: 'شات اضافه', priceDelta: 18000 },
              { id: 'decaf', label: 'بدون کافئین', priceDelta: 0 },
            ],
          },
        ],
      },
      {
        id: 'cappuccino',
        number: '02',
        name: 'کاپوچینو',
        description: 'تعادل کلاسیک اسپرسو، شیر بخارپز و فوم مخملی',
        price: 88000,
        available: true,
        tags: ['best'],
        swatch: g('oklch(0.55 0.04 70)'),
        options: [
          {
            id: 'size',
            title: 'اندازه',
            type: 'single',
            required: true,
            choices: [
              { id: 'single', label: 'تک', priceDelta: 0 },
              { id: 'double', label: 'دوبل', priceDelta: 22000 },
            ],
          },
          {
            id: 'milk',
            title: 'نوع شیر',
            type: 'single',
            choices: [
              { id: 'whole', label: 'شیر کامل', priceDelta: 0 },
              { id: 'oat', label: 'شیر جو دوسر', priceDelta: 15000 },
              { id: 'almond', label: 'شیر بادام', priceDelta: 15000 },
            ],
          },
          {
            id: 'sugar',
            title: 'حذف',
            type: 'multi',
            choices: [{ id: 'nosugar', label: 'بدون شکر', priceDelta: 0 }],
          },
        ],
      },
      {
        id: 'latte-mac',
        number: '03',
        name: 'لاته ماکیاتو',
        description: 'لایه‌های شیر گرم با شاتی از اسپرسو در میانه',
        price: 92000,
        available: true,
        tags: [],
        swatch: g('oklch(0.62 0.035 72)'),
        options: [
          {
            id: 'milk',
            title: 'نوع شیر',
            type: 'single',
            choices: [
              { id: 'whole', label: 'شیر کامل', priceDelta: 0 },
              { id: 'oat', label: 'شیر جو دوسر', priceDelta: 15000 },
            ],
          },
        ],
      },
      {
        id: 'americano',
        number: '04',
        name: 'آمریکانو بلک',
        description: 'اسپرسو رقیق‌شده با آب داغ، تلخی تمیز و کشیده',
        price: 70000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.3 0.04 50)'),
        options: [
          {
            id: 'temp',
            title: 'دما',
            type: 'single',
            choices: [
              { id: 'hot', label: 'داغ', priceDelta: 0 },
              { id: 'iced', label: 'یخ', priceDelta: 8000 },
            ],
          },
        ],
      },
      {
        id: 'flat-white',
        number: '05',
        name: 'فلت وایت',
        description: 'ریستِرتو دوبل با میکروفومِ نازک و براق',
        price: 95000,
        available: true,
        tags: ['best'],
        swatch: g('oklch(0.58 0.04 74)'),
        options: [
          {
            id: 'milk',
            title: 'نوع شیر',
            type: 'single',
            choices: [
              { id: 'whole', label: 'شیر کامل', priceDelta: 0 },
              { id: 'oat', label: 'شیر جو دوسر', priceDelta: 15000 },
            ],
          },
        ],
      },
      {
        id: 'cortado',
        number: '06',
        name: 'کورتادو',
        description: 'اسپرسو با مقدار برابر شیر گرم، در لیوان شیشه‌ای کوچک',
        price: 84000,
        available: false,
        tags: [],
        swatch: g('oklch(0.56 0.04 68)'),
        options: [],
      },
      {
        id: 'mocha',
        number: '07',
        name: 'کافه موکا',
        description: 'اسپرسو، شکلات تلخ و شیر بخارپز با روکش کاکائو',
        price: 105000,
        available: true,
        tags: ['new'],
        swatch: g('oklch(0.4 0.05 48)'),
        options: [
          {
            id: 'choc',
            title: 'شکلات',
            type: 'single',
            choices: [
              { id: 'dark', label: 'تلخ 70٪', priceDelta: 0 },
              { id: 'milk', label: 'شیری', priceDelta: 0 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'filter',
    name: 'فیلتر و کلد برو',
    descriptor: 'برنامهٔ دم‌آوری آهسته و کلد برو، با عصاره‌گیری دقیق',
    items: [
      {
        id: 'pourover',
        number: '01',
        name: 'پور اور',
        description: 'دم‌آوری دستی V60 از دانهٔ تک‌خاستگاه روز',
        price: 98000,
        available: true,
        tags: ['veg', 'best'],
        swatch: g('oklch(0.5 0.05 60)'),
        options: [
          {
            id: 'origin',
            title: 'خاستگاه روز',
            type: 'single',
            required: true,
            choices: [
              { id: 'kenya', label: 'کنیا AA', priceDelta: 0 },
              { id: 'colombia', label: 'کلمبیا هویلا', priceDelta: 0 },
            ],
          },
        ],
      },
      {
        id: 'coldbrew',
        number: '02',
        name: 'کلد برو سنتی',
        description: 'دم‌آوری سرد 16 ساعته، نرم و کم‌اسید',
        price: 92000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.35 0.04 50)'),
        options: [],
      },
      {
        id: 'nitro',
        number: '03',
        name: 'نیترو کلد برو',
        description: 'کلد برو دم‌شده با نیتروژن، بافت کرمی و کف ابریشمی',
        price: 110000,
        available: true,
        tags: ['new', 'veg'],
        swatch: g('oklch(0.3 0.035 48)'),
        options: [],
      },
      {
        id: 'icelatte',
        number: '04',
        name: 'آیس لاته',
        description: 'اسپرسو سرد روی شیر و یخ، تازه و سبک',
        price: 96000,
        available: true,
        tags: [],
        swatch: g('oklch(0.66 0.035 76)'),
        options: [
          {
            id: 'milk',
            title: 'نوع شیر',
            type: 'single',
            choices: [
              { id: 'whole', label: 'شیر کامل', priceDelta: 0 },
              { id: 'oat', label: 'شیر جو دوسر', priceDelta: 15000 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'signature',
    name: 'نوشیدنی‌های امضایی',
    descriptor: 'اصیل‌های خانه، ساخته‌شده با دست بارمن',
    items: [
      {
        id: 'smoky-caramel',
        number: '01',
        name: 'لاته کارامل دودی',
        description: 'لاته با کارامل دست‌ساز و نمک دودی',
        price: 118000,
        available: true,
        tags: ['best', 'new'],
        swatch: g('oklch(0.5 0.06 60)'),
        options: [],
      },
      {
        id: 'cold-matcha',
        number: '02',
        name: 'ماچای سرد با شیر جو',
        description: 'ماچا درجهٔ تشریفات روی شیر جو دوسر و یخ',
        price: 124000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.6 0.08 140)'),
        options: [],
      },
      {
        id: 'lavender-lemon',
        number: '03',
        name: 'لیموناد لاوندر',
        description: 'لیموی تازه با شربت اسطوخودوس خانگی',
        price: 88000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.68 0.06 320)'),
        options: [],
      },
      {
        id: 'dark-choc',
        number: '04',
        name: 'شکلات داغ قهوه تلخ',
        description: 'شکلات تلخ 72٪ ذوب‌شده با لایه‌ای از اسپرسو',
        price: 102000,
        available: true,
        tags: [],
        swatch: g('oklch(0.34 0.05 44)'),
        options: [],
      },
    ],
  },
  {
    id: 'breakfast',
    name: 'صبحانه',
    descriptor: 'سرو تا ساعت 11:30 صبح',
    items: [
      {
        id: 'croissant',
        number: '01',
        name: 'کروسان کره‌ای',
        description: 'لایه‌لایه و ترد، با کرهٔ تخمیری فرانسوی',
        price: 78000,
        available: true,
        tags: ['veg', 'best'],
        swatch: g('oklch(0.72 0.06 78)'),
        allergens: 'حاوی گلوتن، تخم‌مرغ و لبنیات',
        options: [
          {
            id: 'spread',
            title: 'افزودنی',
            type: 'multi',
            choices: [
              { id: 'jam', label: 'مربای زردآلو', priceDelta: 12000 },
              { id: 'butter', label: 'کرهٔ اضافه', priceDelta: 8000 },
            ],
          },
        ],
      },
      {
        id: 'avocado-toast',
        number: '02',
        name: 'تست آووکادو',
        description: 'نان خمیرترش، آووکادو له‌شده، تخم کتان و فلفل',
        price: 165000,
        available: true,
        tags: ['veg', 'best'],
        swatch: g('oklch(0.6 0.07 140)'),
        allergens: 'حاوی گلوتن',
        options: [
          {
            id: 'egg',
            title: 'افزودنی',
            type: 'multi',
            choices: [
              { id: 'poached', label: 'تخم‌مرغ آب‌پز', priceDelta: 28000 },
              { id: 'feta', label: 'پنیر فتا', priceDelta: 22000 },
            ],
          },
        ],
      },
      {
        id: 'eggs-benedict',
        number: '03',
        name: 'اگ بندیکت',
        description: 'تخم‌مرغ آب‌پز روی نان مافین با سس هلندیز',
        price: 188000,
        available: true,
        tags: [],
        swatch: g('oklch(0.7 0.07 80)'),
        allergens: 'حاوی گلوتن، تخم‌مرغ و لبنیات',
        options: [],
      },
      {
        id: 'pancake',
        number: '04',
        name: 'پنکیک دارچینی',
        description: 'سه لایه پنکیک نرم با شربت افرا و دارچین',
        price: 142000,
        available: false,
        tags: ['veg'],
        swatch: g('oklch(0.68 0.06 76)'),
        options: [],
      },
    ],
  },
  {
    id: 'sandwich',
    name: 'ساندویچ و تست',
    descriptor: 'از ظهر تا پایان ساعت کاری',
    items: [
      {
        id: 'club',
        number: '01',
        name: 'ساندویچ کلاب',
        description: 'مرغ گریل، بیکن بوقلمون، گوجه و سس مخصوص',
        price: 198000,
        available: true,
        tags: ['best'],
        swatch: g('oklch(0.6 0.05 62)'),
        allergens: 'حاوی گلوتن و تخم‌مرغ',
        options: [
          {
            id: 'side',
            title: 'مخلفات',
            type: 'single',
            choices: [
              { id: 'fries', label: 'سیب‌زمینی سرخ‌شده', priceDelta: 0 },
              { id: 'salad', label: 'سالاد سبز', priceDelta: 0 },
            ],
          },
        ],
      },
      {
        id: 'turkey-star',
        number: '02',
        name: 'ستارهٔ ترکیه',
        description: 'بوقلمون دودی، پنیر گودا و سس خردل عسلی',
        price: 186000,
        available: true,
        tags: [],
        swatch: g('oklch(0.58 0.05 58)'),
        options: [],
      },
      {
        id: 'mozzarella',
        number: '03',
        name: 'باگت موزارلا',
        description: 'موزارلا تازه، گوجه و ریحان روی باگت برشته',
        price: 172000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.7 0.05 90)'),
        options: [],
      },
      {
        id: 'panini',
        number: '04',
        name: 'پانینی مرغ',
        description: 'مرغ گریل، پنیر و سبزیجات در نان پرس‌شده',
        price: 178000,
        available: true,
        tags: ['best'],
        swatch: g('oklch(0.62 0.05 64)'),
        options: [],
      },
    ],
  },
  {
    id: 'dessert',
    name: 'شیرینی و دسر',
    descriptor: 'انتخاب روزانه از قنادی خانه',
    items: [
      {
        id: 'brownie',
        number: '01',
        name: 'براونی تافی',
        description: 'براونی شکلاتی فاج با لایهٔ تافی نمکی',
        price: 96000,
        available: true,
        tags: ['best', 'veg'],
        swatch: g('oklch(0.33 0.05 44)'),
        allergens: 'حاوی گلوتن، تخم‌مرغ و آجیل',
        options: [],
      },
      {
        id: 'lemon-tart',
        number: '02',
        name: 'تارت لیمو',
        description: 'تارت کرهای با کرم لیمو و مرنگ سوخته',
        price: 102000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.78 0.08 96)'),
        options: [],
      },
      {
        id: 'oat-cookie',
        number: '03',
        name: 'کلوچهٔ جو دوسر',
        description: 'کلوچهٔ نرم جو دوسر با کشمش و دارچین',
        price: 58000,
        available: true,
        tags: ['veg'],
        swatch: g('oklch(0.66 0.06 76)'),
        options: [],
      },
      {
        id: 'tiramisu',
        number: '04',
        name: 'تیرامیسو کوپ',
        description: 'تیرامیسوی کلاسیک در کوپ، با ماسکارپونه و قهوه',
        price: 128000,
        available: true,
        tags: ['new', 'best'],
        swatch: g('oklch(0.5 0.04 60)'),
        allergens: 'حاوی تخم‌مرغ، لبنیات و کافئین',
        options: [],
      },
    ],
  },
]

export const ALL_ITEMS: MenuItem[] = MENU.flatMap((c) => c.items)

export function findItem(id: string): MenuItem | undefined {
  return ALL_ITEMS.find((i) => i.id === id)
}

export const PAST_ORDERS: PastOrder[] = [
  {
    id: '10487',
    date: '1403/09/21',
    mode: 'table',
    itemCount: 3,
    total: 271000,
    status: 'سرو شد',
    lines: [
      { name: 'کاپوچینو', qty: 2, price: 176000 },
      { name: 'کروسان کره‌ای', qty: 1, price: 95000 },
    ],
  },
  {
    id: '10395',
    date: '1403/09/14',
    mode: 'takeaway',
    itemCount: 2,
    total: 214000,
    status: 'تحویل شد',
    lines: [
      { name: 'فلت وایت', qty: 1, price: 95000 },
      { name: 'تست آووکادو', qty: 1, price: 119000 },
    ],
  },
  {
    id: '10280',
    date: '1403/09/06',
    mode: 'delivery',
    itemCount: 4,
    total: 486000,
    status: 'تحویل شد',
    lines: [
      { name: 'ساندویچ کلاب', qty: 2, price: 396000 },
      { name: 'لیموناد لاوندر', qty: 1, price: 88000 },
    ],
  },
  {
    id: '10155',
    date: '1403/08/28',
    mode: 'table',
    itemCount: 2,
    total: 188000,
    status: 'سرو شد',
    lines: [{ name: 'اگ بندیکت', qty: 1, price: 188000 }],
  },
  {
    id: '10012',
    date: '1403/08/19',
    mode: 'takeaway',
    itemCount: 3,
    total: 312000,
    status: 'تحویل شد',
    lines: [
      { name: 'پور اور', qty: 1, price: 98000 },
      { name: 'تیرامیسو کوپ', qty: 1, price: 128000 },
    ],
  },
]

export const WALLET_TX: WalletTx[] = [
  { id: 'w1', date: '1403/09/21', description: 'بازگشت وجه سفارش 10487', amount: 14000 },
  { id: 'w2', date: '1403/09/14', description: 'استفاده در سفارش 10395', amount: -20000 },
  { id: 'w3', date: '1403/09/02', description: 'شارژ کیف پول', amount: 50000 },
  { id: 'w4', date: '1403/08/28', description: 'هدیهٔ باشگاه مشتریان', amount: 25000 },
]

export const CAMPAIGNS = [
  {
    id: 'c1',
    title: 'صبحانهٔ آرام',
    body: 'هر سفارش صبحانه پیش از ساعت 10 صبح، یک قهوهٔ فیلتر مهمان ماست.',
    tag: 'فعال تا پایان آذر',
  },
  {
    id: 'c2',
    title: 'دوشنبه‌های دم‌آوری',
    body: 'دوشنبه‌ها روی تمام نوشیدنی‌های فیلتر و کلد برو، دو برابر امتیاز بگیرید.',
    tag: 'هفتگی',
  },
]
