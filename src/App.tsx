import { useEffect, useState } from 'react'

type IconName =
  | 'grid' | 'cart' | 'cup' | 'history' | 'box' | 'calendar'
  | 'trash' | 'cloud' | 'chart' | 'settings' | 'search' | 'bell'
  | 'arrow' | 'peso' | 'orders' | 'warning' | 'sun' | 'drop'

const paths: Record<IconName, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  cart: <><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"/></>,
  cup: <><path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z"/><path d="M17 10h2a2 2 0 0 1 0 4h-2M8 3c0 1 1 1 1 2M12 3c0 1 1 1 1 2"/></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></>,
  box: <><path d="m4 7 8-4 8 4-8 4-8-4ZM4 7v10l8 4 8-4V7M12 11v10"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/></>,
  cloud: <><path d="M5 16a4 4 0 0 1 .8-7.9A6 6 0 0 1 17.3 9H18a3 3 0 0 1 0 6H5ZM8 19l-1 2M13 19l-1 2M18 19l-1 2"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  peso: <><path d="M8 21V3h5a5 5 0 0 1 0 10H8M5 7h11M5 11h9"/></>,
  orders: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  warning: <><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v4M12 17h.01"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  drop: <path d="M12 2s7 7.5 7 13a7 7 0 0 1-14 0C5 9.5 12 2 12 2Z"/>,
}

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const nav: [string, IconName][] = [
  ['Dashboard', 'grid'],
  ['Point of Sale', 'cart'],
  ['Products & Menu', 'cup'],
  ['Sales History', 'history'],
  ['Smart Inventory', 'box'],
  ['Expiration Alerts', 'calendar'],
  ['Waste Monitoring', 'trash'],
  ['Weather Insights', 'cloud'],
  ['Reports', 'chart'],
  ['Employees Management', 'settings'],
]

type Product = { id: number; name: string; price: number; category: string; unitCost?: number }
type Ingredient = { id: number; name: string; quantity: number; unit: string; min: number; expiry: string }
type Sale = { id: number; date: string; items: string; total: number; cost?: number; profit?: number; paymentMethod?: string; cashier?: string }
type UserRole = 'Admin' | 'Manager' | 'Cashier'
type StaffRecord = {
  username: string
  name: string
  role: UserRole
  schedule: string
  startTime?: string
  endTime?: string
  active?: boolean
  attendance: {
    date: string
    status: string
    timeIn?: string
    timeOut?: string
  }[]
}
type Waste = { id: number; item: string; quantity: number; reason: string; cost: number; date: string }
type Employee = {
  id: number
  name: string
  role: 'Manager' | 'Admin'
  startTime: string
  endTime: string
  active: boolean
}

const initialProducts: Product[] = [
  { id: 1, name: 'Hot Caramel Latte', price: 215, category: 'Hot Coffee' },
  { id: 2, name: 'Americano', price: 150, category: 'Hot Coffee' },
  { id: 3, name: 'Cappuccino', price: 185, category: 'Hot Coffee' },
  { id: 4, name: 'Iced Spanish Latte', price: 220, category: 'Cold Coffee' },
  { id: 5, name: 'Cold Brew', price: 175, category: 'Cold Coffee' },
  { id: 6, name: 'Matcha Latte', price: 195, category: 'Non-Coffee' },
]
const initialIngredients: Ingredient[] = [
  { id: 1, name: 'Whole fresh milk', quantity: 4, unit: 'cartons', min: 8, expiry: '2026-10-28' },
  { id: 2, name: 'Barista oat milk', quantity: 5, unit: 'L', min: 6, expiry: '2026-10-29' },
  { id: 3, name: 'Vanilla syrup', quantity: 2, unit: 'bottles', min: 3, expiry: '2026-11-15' },
  { id: 4, name: 'Colombian beans', quantity: 18.5, unit: 'kg', min: 5, expiry: '2027-02-01' },
  { id: 5, name: 'Heavy cream', quantity: 3.5, unit: 'qt', min: 4, expiry: '2026-10-27' },
]

function readSaved<T,>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) as T : fallback
  } catch {
    return fallback
  }
}

function Panel({ title, icon, action, children, className = '' }: { title: string; icon: IconName; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>
    <header className="panel-head"><div><span className="panel-icon"><Icon name={icon} size={17}/></span><h2>{title}</h2></div>{action}</header>
    {children}
  </section>
}

function PageTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="welcome"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div></div>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label style={{ display: 'grid', gap: 6, minWidth: 0, fontSize: 13, color: '#6f4e37' }}><span>{label}</span>{children}</label>
}

const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #d8c3a5', borderRadius: 8, background: '#fffdf9', color: '#3b2925', font: 'inherit' }
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' }
const cellStyle: React.CSSProperties = { padding: '12px 10px', borderBottom: '1px solid #eee4d7', fontSize: 13, verticalAlign: 'middle' }
const actionStyle: React.CSSProperties = { border: 0, borderRadius: 8, padding: '9px 12px', cursor: 'pointer', background: '#6f4e37', color: '#fffaf3', fontWeight: 600 }

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [role, setRole] = useState<UserRole>('Admin')
  const [staff, setStaff] = useState<StaffRecord[]>(() => readSaved('solstice_staff', [
    { username: 'admin', name: 'Administrator', role: 'Admin', schedule: 'Mon–Fri · 9:00 AM–5:00 PM', attendance: [] },
    { username: 'manager', name: 'Café Manager', role: 'Manager', schedule: 'Mon–Sat · 8:00 AM–4:00 PM', attendance: [] },
    { username: 'cashier', name: 'Cashier One', role: 'Cashier', schedule: 'Mon–Fri · 10:00 AM–6:00 PM', attendance: [] },
  ]))

  const [active, setActive] = useState('Dashboard')
  const [notice, setNotice] = useState('')
  const [products, setProducts] = useState<Product[]>(() => readSaved('solstice_products', initialProducts))
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => readSaved('solstice_ingredients', initialIngredients))
  const [sales, setSales] = useState<Sale[]>(() => readSaved('solstice_sales', []))
  const [waste, setWaste] = useState<Waste[]>(() => readSaved('solstice_waste', []))
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([])
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('150')
  const [productCost, setProductCost] = useState('0')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [productCategory, setProductCategory] = useState('Hot Coffee')
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientQty, setIngredientQty] = useState('1')
  const [ingredientUnit, setIngredientUnit] = useState('pcs')
  const [ingredientMin, setIngredientMin] = useState('3')
  const [ingredientExpiry, setIngredientExpiry] = useState('')
  const [wasteItem, setWasteItem] = useState('')
  const [wasteQty, setWasteQty] = useState('1')
  const [wasteReason, setWasteReason] = useState('Over-preparation')
  const [wasteCost, setWasteCost] = useState('0')
  const [weather, setWeather] = useState('Loading weather...')
  const [temperature, setTemperature] = useState('—')
  const [humidity, setHumidity] = useState<number | null>(null)
  const [feelsLike, setFeelsLike] = useState<number | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState('')
  const [showWeatherAnimation, setShowWeatherAnimation] = useState(false)
  const [weatherAnimationKey, setWeatherAnimationKey] = useState(0)
  const [search, setSearch] = useState('')
  const [staffName, setStaffName] = useState('')
  const [staffUsername, setStaffUsername] = useState('')
  const [staffRole, setStaffRole] = useState<UserRole>('Cashier')
  const [staffSchedule, setStaffSchedule] = useState('Mon–Fri · 10:00 AM–6:00 PM')
  
  const [employees, setEmployees] = useState<Employee[]>(() => readSaved('solsticeEmployees', []))
  
  const [employeeForm, setEmployeeForm] = useState<Employee>({
    id: 0,
    name: '',
    role: 'Admin',
    startTime: '07:00',
    endTime: '11:00',
    active: true,
  })

  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null)

  useEffect(() => {
  localStorage.setItem('solstice_products', JSON.stringify(products))
}, [products])

useEffect(() => {
  localStorage.setItem('solstice_ingredients', JSON.stringify(ingredients))
}, [ingredients])

useEffect(() => {
  localStorage.setItem('solstice_sales', JSON.stringify(sales))
}, [sales])

useEffect(() => {
  localStorage.setItem('solstice_waste', JSON.stringify(waste))
}, [waste])

useEffect(() => { localStorage.setItem('solstice_staff', JSON.stringify(staff)) }, [staff])

useEffect(() => {
  if (
    weatherLoading ||
    weatherError ||
    !weather ||
    weather === 'Loading weather...'
  ) {
    return
  }

  setShowWeatherAnimation(true)
  setWeatherAnimationKey(key => key + 1)

  const timer = window.setTimeout(() => {
    setShowWeatherAnimation(false)
  }, 5000)

  return () => window.clearTimeout(timer)
}, [weather, weatherLoading, weatherError])

useEffect(() => {
  let active = true



  const loadWeather = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=14.446397&longitude=121.445786&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&timezone=Asia%2FManila'
      )

      if (!response.ok) {
        throw new Error('Weather request failed')
      }

      const data = await response.json()
      const current = data.current

      if (!active) return

      setTemperature(String(current.temperature_2m))
      setHumidity(current.relative_humidity_2m)
      setFeelsLike(current.apparent_temperature)

     const code = current.weather_code

if ([95, 96, 99].includes(code)) {
  setWeather('Stormy')
} else if (
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
) {
  setWeather('Rainy')
} else if ([45, 48].includes(code)) {
  setWeather('Cloudy')
} else if (code === 3) {
  setWeather('Cloudy')
} else if ([1, 2].includes(code)) {
  setWeather('Partly Cloudy')
} else {
  setWeather('Sunny')
}

      setWeatherError('')
    } catch {
      if (active) {
        setWeatherError('Unable to load live weather. Check your internet.')
      }
    } finally {
      if (active) setWeatherLoading(false)
    }
  }

  loadWeather()

  const timer = window.setInterval(loadWeather, 10 * 60 * 1000)

  return () => {
    active = false
    window.clearInterval(timer)
  }
}, [])

  const act = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2600) }
  useEffect(() => { if (role !== 'Cashier' && active === 'Point of Sale') setActive('Dashboard') }, [role, active])
  const money = (n: number) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0)
  const totalRecordedCost = sales.reduce((sum, sale) => sum + (sale.cost ?? 0), 0)
  const totalRecordedProfit = sales.reduce((sum, sale) => sum + (sale.profit ?? 0), 0)
  const visibleSales = role === 'Cashier' ? sales.filter(s => s.cashier === (staff.find(x => x.username === username)?.name || username)) : sales
  const totalOrders = visibleSales.length
  const lowStock = ingredients.filter(i => i.quantity <= i.min).length
  const soonExpiry = ingredients.filter(i => {
    if (!i.expiry) return false
    const days = (new Date(i.expiry).getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000
    return days >= 0 && days <= 3
  })
  const totalWaste = waste.reduce((sum, item) => sum + item.cost, 0)
  const addToCart = (product: Product) => {
    setCart(old => {
      const found = old.find(item => item.product.id === product.id)
      return found ? old.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...old, { product, qty: 1 }]
    })
    act(`${product.name} added to cart`)
  }
  const checkout = () => {
    if (!cart.length) { act('Add a product to the cart first.'); return }
    const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
    const cost = cart.reduce((sum, item) => sum + (item.product.unitCost ?? 0) * item.qty, 0)
    const sale: Sale = { id: Date.now(), date: new Date().toLocaleString(), items: cart.map(item => `${item.product.name} × ${item.qty}`).join(', '), total, cost, profit: total - cost, paymentMethod, cashier: staff.find(s => s.username === username)?.name || username }
    setSales(old => [sale, ...old])
    setCart([])
    setPaymentMethod('Cash')
    act(`Transaction saved — ${money(total)} (${paymentMethod})`)
  }
  const addProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName.trim() || Number(productPrice) <= 0 || Number(productCost) < 0) { act('Enter a product name, valid selling price, and non-negative unit cost.'); return }
    setProducts(old => [...old, { id: Date.now(), name: productName.trim(), price: Number(productPrice), category: productCategory, unitCost: Number(productCost) }])
    setProductName('')
    setProductCost('0')
    act('Product added successfully.')
  }
  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredientName.trim() || Number(ingredientQty) < 0 || Number(ingredientMin) < 0) { act('Please check the ingredient details.'); return }
    setIngredients(old => [...old, { id: Date.now(), name: ingredientName.trim(), quantity: Number(ingredientQty), unit: ingredientUnit, min: Number(ingredientMin), expiry: ingredientExpiry }])
    setIngredientName('')
    setIngredientQty('1')
    act('Ingredient added successfully.')
  }
  const logWaste = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wasteItem.trim() || Number(wasteQty) <= 0 || Number(wasteCost) < 0) { act('Enter a valid waste record.'); return }
    setWaste(old => [{ id: Date.now(), item: wasteItem.trim(), quantity: Number(wasteQty), reason: wasteReason, cost: Number(wasteCost), date: new Date().toLocaleDateString() }, ...old])
    setWasteItem('')
    act('Waste record saved.')
  }
  const filteredProducts = products.filter(p =>
  `${p.name} ${p.category}`
    .toLowerCase()
    .includes(search.trim().toLowerCase())
)
  const isCoolWeather =
  weather.toLowerCase().includes('rain') ||
  weather.toLowerCase().includes('storm') ||
  Number(temperature) < 24

const recommendedProducts = [...products]
  .sort((a, b) => {
    const score = (p: Product) => {
      const name = p.name.toLowerCase()
      const category = p.category.toLowerCase()
      const isCold =
        category.includes('cold') ||
        name.includes('iced') ||
        name.includes('cold brew')

      const isHot = category.includes('hot')

      if (isCoolWeather) return isHot ? 2 : isCold ? 0 : 1
      return isCold ? 2 : isHot ? 0 : 1
    }

    return score(b) - score(a)
  })
  .slice(0, 3)
 const filteredIngredients = ingredients.filter(i =>
  `${i.name} ${i.unit}`
    .toLowerCase()
    .includes(search.trim().toLowerCase())
)

  const renderDashboard = () => (
  <div className="content">

    <div className="welcome">
      <div>
        <div className="eyebrow">DASHBOARD OVERVIEW</div>
        <h1>Good morning, Admin!</h1>
        <p>Here’s what’s brewing at Solstice Coffee today.</p>
        <small>Live local records · Data saved in this browser</small>
      </div>

      <div className="welcome-actions">
        <button
          className="btn secondary"
          onClick={() => setActive('Reports')}
        >
          <Icon name="chart" size={16} /> View reports
        </button>

        {role === 'Cashier' && <button
          className="btn primary"
          onClick={() => setActive('Point of Sale')}
        >
          <Icon name="cart" size={16} /> Open Point of Sale
        </button>}
      </div>
    </div>

    <div className="metrics dashboard-metrics">
      <article className="metric">
        <div className="metric-top">
          <span>Recorded sales</span>
          <i><Icon name="peso" size={19} /></i>
        </div>
        <strong>{money(totalSales)}</strong>
        <div className="metric-foot">
          <span>All completed orders</span>
        </div>
      </article>

      <article className="metric">
        <div className="metric-top">
          <span>Total orders</span>
          <i><Icon name="orders" size={19} /></i>
        </div>
        <strong>{totalOrders}</strong>
        <div className="metric-foot">
          <span>Saved transactions</span>
        </div>
      </article>

      <article className="metric alert-card">
        <div className="metric-top">
          <span>Low-stock ingredients</span>
          <i><Icon name="warning" size={19} /></i>
        </div>
        <strong>{lowStock} items</strong>
        <div className="metric-foot">
          <span>At or below minimum stock</span>
          <button onClick={() => setActive('Smart Inventory')}>Review now</button>
        </div>
      </article>

      <article className={`metric ${soonExpiry.length ? 'alert-card' : ''}`}>
        <div className="metric-top">
          <span>Ingredients expiring soon</span>
          <i><Icon name="calendar" size={19} /></i>
        </div>
        <strong>{soonExpiry.length} items</strong>
        <div className="metric-foot">
          <span>Within the next 3 days</span>
          <button onClick={() => setActive('Expiration Alerts')}>Review now</button>
        </div>
      </article>
    </div>

    <div className="feature-grid">
      <Panel
        title="Weather & drink pairing"
        icon="cloud"
        action={
  <span className="data-chip">
    {weatherLoading
      ? 'LOADING WEATHER...'
      : weatherError
        ? 'WEATHER UNAVAILABLE'
        : 'LIVE WEATHER'}
  </span>
}
      >
<div className="weather-body">
  <div className={`weather-animation ${showWeatherAnimation ? 'show' : ''}`}>
    {weather.toLowerCase().includes('storm') ? (
      <div className="storm-animation" key={weatherAnimationKey}>
        ⛈️
        <span>Stormy weather</span>
      </div>
    ) : weather.toLowerCase().includes('rain') ? (
      <div className="rain-animation" key={weatherAnimationKey}>
        🌧️
        <span>Rainy weather</span>
      </div>
    ) : weather.toLowerCase().includes('partly') ? (
      <div className="partly-cloudy-animation" key={weatherAnimationKey}>
        🌤️
        <span>Partly cloudy weather</span>
      </div>
    ) : weather.toLowerCase().includes('cloud') ||
      weather.toLowerCase().includes('fog') ? (
      <div className="cloud-animation" key={weatherAnimationKey}>
        ☁️
        <span>Cloudy weather</span>
      </div>
    ) : (
      <div className="sun-animation" key={weatherAnimationKey}>
        ☀️
        <span>Sunny weather</span>
      </div>
    )}
  </div>

  <div className="weather-now">
    <div className="weather-symbol">
      <Icon
        name={
          weather.toLowerCase().includes('sun')
            ? 'sun'
            : 'cloud'
        }
        size={31}
      />
    </div>

    <div>
      <strong>{temperature}°C</strong>
      <span>{weather}</span>
    </div>
  </div>

  <p>
    {weather.toLowerCase().includes('rain') ||
    Number(temperature) < 24
      ? 'Suggested pairing: Hot Caramel Latte.'
      : 'Suggested pairing: Iced Spanish Latte.'}
  </p>

  <button
    className="text-btn"
    onClick={() => setActive('Weather Insights')}
  >
    Update weather &nbsp;→
  </button>
</div>
</Panel>

      <article className="drink-card">
        <img
          src="/assets/caramel-latte.jpg"
          alt="Caramel latte"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div className="drink-content">
          <div>
            <span className="recommend">FEATURED PAIRING</span>
            <span className="price">₱215</span>
          </div>

          <h2>
            {weather.toLowerCase().includes('rain') ||
            Number(temperature) < 24
              ? 'Hot Caramel Latte'
              : 'Iced Spanish Latte'}
          </h2>

          <p>
            A café favorite selected to match the current local weather.
          </p>

          <div className="drink-meta">
            <span>
              Products in menu <b>{products.length}</b>
            </span>

            <button onClick={() => setActive('Point of Sale')}>
              Open POS <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </article>
    </div>

    <div className="operations-grid">
      <div className="left-stack">

        <Panel title="Sales overview" icon="chart">
          <div className="mix-summary">
            <div>
              <strong>{totalOrders}</strong>
              <span>Transactions</span>
            </div>

            <div>
              <strong>{money(totalSales)}</strong>
              <span>Total sales</span>
            </div>

            <div>
              <strong>{products.length}</strong>
              <span>Menu items</span>
            </div>
          </div>

          <div className="insight">
            <Icon name="chart" size={16} />
            <span>
              Figures are calculated from completed checkouts in this browser.
            </span>
          </div>
        </Panel>

        <Panel
          title="Smart inventory"
          icon="box"
          action={
            <button
              className="text-btn"
              onClick={() => setActive('Smart Inventory')}
            >
              View all <Icon name="arrow" size={14} />
            </button>
          }
        >
          <div className="stock-list">
            {ingredients.slice(0, 5).map(item => {
              const pct = Math.min(
                100,
                (item.quantity / Math.max(item.min * 2, 1)) * 100
              );

              const tone =
                item.quantity <= item.min
                  ? 'danger'
                  : item.quantity <= item.min * 1.5
                    ? 'warn'
                    : 'good';

              return (
                <div className="stock-row" key={item.id}>
                  <div className="stock-name">
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} {item.unit}
                    </span>
                  </div>

                  <div className="progress">
                    <i
                      className={tone}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <span className={`status ${tone}`}>
                    {tone === 'good'
                      ? 'In stock'
                      : tone === 'warn'
                        ? 'Low'
                        : 'Reorder'}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>

      </div>

      <div className="right-stack">

        <Panel
          title="Expiration alerts"
          icon="calendar"
          action={
            <span className="badge danger">
              {soonExpiry.length} soon
            </span>
          }
        >
          <div className="expiry-list">
            {soonExpiry.length ? (
              soonExpiry.map(i => (
                <div key={i.id}>
                  <span className="day danger">
                    {Math.max(
                      0,
                      Math.ceil(
                        (
                          new Date(i.expiry).getTime() -
                          new Date().setHours(0, 0, 0, 0)
                        ) / 86400000
                      )
                    )} day(s)
                  </span>

                  <p>
                    <b>{i.name}</b>
                    <small>
                      {i.quantity} {i.unit}
                    </small>
                  </p>

                  <time>{i.expiry || 'No date'}</time>
                </div>
              ))
            ) : (
              <p>No ingredients expiring within 3 days.</p>
            )}
          </div>

          <button
            className="full-link"
            onClick={() => setActive('Expiration Alerts')}
          >
            Open expiration monitor <Icon name="arrow" size={15} />
          </button>
        </Panel>

        <Panel
          title="Waste monitoring"
          icon="trash"
          action={<span className="badge sage">Saved records</span>}
        >
          <div className="waste-total">
            <div>
              <span>Total logged waste</span>
              <strong>{money(totalWaste)}</strong>
            </div>

            <div className="waste-ring">
              <span>{waste.length}</span>
              <small>records</small>
            </div>
          </div>

          <button
            className="full-link"
            onClick={() => setActive('Waste Monitoring')}
          >
            View waste log <Icon name="arrow" size={15} />
          </button>
        </Panel>

      </div>
    </div>

    <footer>
      Solstice Coffee Management · Local browser demo
    </footer>

  </div>
);

 const renderPage = () => {
  if (active === 'Dashboard') {
    if (role !== 'Cashier') return renderDashboard();
    const mine = sales.filter(s => s.cashier === (staff.find(x => x.username === username)?.name || username));
    const todayKey = new Date().toDateString();
    const todays = mine.filter(s => new Date(s.date).toDateString() === todayKey);
    const metricCards = [
      {label:'My sales today', value: money(todays.reduce((n,s)=>n+s.total,0))},
      {label:'Transactions today', value: String(todays.length)},
      {label:'My weekly sales', value: money(mine.filter(s => { const d = new Date(s.date); const now = new Date(); const start = new Date(now); start.setDate(now.getDate()-((now.getDay()+6)%7)); start.setHours(0,0,0,0); return d >= start; }).reduce((n,s)=>n+s.total,0))},
      {label:'Low-stock alerts', value: String(lowStock)},
    ];
    return <div className="content"><PageTitle eyebrow="CASHIER WORKSPACE" title={`Hello, ${staff.find(x => x.username === username)?.name || username}`} subtitle="Your shift at a glance. Use Point of Sale to record customer transactions." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:14,marginBottom:18}}>{metricCards.map(m=><div key={m.label} style={{background:'#fffdf9',border:'1px solid #e7d8c5',borderRadius:12,padding:18}}><div style={{fontSize:12,color:'#8b6c52',marginBottom:8}}>{m.label}</div><strong style={{fontSize:22,color:'#3b2925'}}>{m.value}</strong></div>)}</div>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:18}}><button style={actionStyle} onClick={()=>setActive('Point of Sale')}>Open Point of Sale</button><button style={actionStyle} onClick={()=>setActive('My Schedule')}>View My Schedule</button><button style={actionStyle} onClick={()=>setActive('Attendance')}>Record Attendance</button></div>
      <Panel title="Recent personal transactions" icon="history"><div style={{overflowX:'auto'}}><table style={tableStyle}><thead><tr>{['Date','Items','Payment','Total'].map(h=><th key={h} style={cellStyle}>{h}</th>)}</tr></thead><tbody>{mine.slice(0,5).map(s=><tr key={s.id}><td style={cellStyle}>{s.date}</td><td style={cellStyle}>{s.items}</td><td style={cellStyle}>{s.paymentMethod || '—'}</td><td style={cellStyle}>{money(s.total)}</td></tr>)}{mine.length===0 && <tr><td style={cellStyle} colSpan={4}>No transactions recorded under this cashier yet.</td></tr>}</tbody></table></div></Panel>
    </div>;
  }

  if (role !== 'Cashier' && active === 'Point of Sale') return renderDashboard();

  if (role === 'Cashier' && !['Point of Sale', 'Smart Inventory', 'Sales History', 'Reports', 'My Schedule', 'Attendance', 'Dashboard'].includes(active)) {
    setActive('Dashboard');
    return renderDashboard();
  }

  if (active === 'Point of Sale') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="SALES COUNTER"
          title="Point of Sale"
          subtitle="Create a transaction, review selling price and ingredient cost, then record the payment."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 18 }}>
          {[{ label: 'Transactions recorded', value: String(sales.length) }, { label: 'Recorded sales', value: money(totalSales) }, { label: 'Recorded ingredient cost', value: money(totalRecordedCost) }, { label: 'Estimated gross profit', value: money(totalRecordedProfit) }].map(metric => (
            <div key={metric.label} style={{ background: '#fffdf9', border: '1px solid #e7d8c5', borderRadius: 12, padding: 15 }}>
              <div style={{ fontSize: 12, color: '#8b6c52', marginBottom: 7 }}>{metric.label}</div><strong style={{ fontSize: 19, color: '#3b2925' }}>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            alignItems: 'start',
          }}
        >
          <Panel title="Add items to transaction" icon="cup">
            <input
              style={inputStyle}
              placeholder="Search menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
                gap: 10,
                marginTop: 14,
              }}
            >
              {filteredProducts.map(p => (
                <article
                  key={p.id}
                  style={{
                    border: '1px solid #e7d8c5',
                    borderRadius: 10,
                    padding: 13,
                    background: '#fffdf9',
                  }}
                >
                  <b>{p.name}</b>

                  <p
                    style={{
                      margin: '8px 0',
                      fontSize: 13,
                      color: '#8b6c52',
                    }}
                  >
                    {p.category}
                  </p>

                  <strong>{money(p.price)}</strong>

                  <button
                    style={{
                      ...actionStyle,
                      display: 'block',
                      width: '100%',
                      marginTop: 12,
                    }}
                    onClick={() => addToCart(p)}
                  >
                    Add to cart +
                  </button>
                </article>
              ))}
            </div>
          </Panel>

          <Panel
            title="Current transaction"
            icon="cart"
            action={
              <button
                className="text-btn"
                onClick={() => setCart([])}
              >
                Clear cart
              </button>
            }
          >
            {cart.length === 0 ? (
              <p>Your cart is empty. Add a menu item to begin.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10,
                      padding: '10px 0',
                      borderBottom: '1px solid #eee4d7',
                    }}
                  >
                    <div>
                      <b>{item.product.name}</b>

                      <div style={{ fontSize: 13 }}>
                        {money(item.product.price)} × {item.qty}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <button
                        style={actionStyle}
                        onClick={() =>
                          setCart(old =>
                            old.map(x =>
                              x.product.id === item.product.id
                                ? {
                                    ...x,
                                    qty: Math.max(1, x.qty - 1),
                                  }
                                : x
                            )
                          )
                        }
                      >
                        −
                      </button>

                      <button
                        style={actionStyle}
                        onClick={() =>
                          setCart(old =>
                            old.map(x =>
                              x.product.id === item.product.id
                                ? { ...x, qty: x.qty + 1 }
                                : x
                            )
                          )
                        }
                      >
                        +
                      </button>

                      <button
                        style={{
                          ...actionStyle,
                          background: '#a64f3c',
                        }}
                        onClick={() =>
                          setCart(old =>
                            old.filter(
                              x => x.product.id !== item.product.id
                            )
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}

                <div style={{ display: 'grid', gap: 8, marginTop: 16, padding: 14, borderRadius: 10, background: '#f7f1e8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>Subtotal</span><strong>{money(cart.reduce((sum, x) => sum + x.product.price * x.qty, 0))}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>Estimated ingredient cost</span><strong>{money(cart.reduce((sum, x) => sum + (x.product.unitCost ?? 0) * x.qty, 0))}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>Estimated gross profit</span><strong>{money(cart.reduce((sum, x) => sum + (x.product.price - (x.product.unitCost ?? 0)) * x.qty, 0))}</strong></div>
                  <Field label="Payment method">
                    <select style={inputStyle} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                      <option>Cash</option><option>GCash</option><option>Debit/Credit Card</option><option>Other</option>
                    </select>
                  </Field>
                  <small style={{ color: '#8b6c52' }}>Costs and profit are estimates based on the unit cost entered in Products &amp; Menu.</small>
                </div>

                <h2>
                  Total:{' '}
                  {money(
                    cart.reduce(
                      (sum, x) => sum + x.product.price * x.qty,
                      0
                    )
                  )}
                </h2>

                <button
                  style={{ ...actionStyle, width: '100%' }}
                  onClick={checkout}
                >
                  Record transaction
                </button>
              </>
            )}
          </Panel>
        </div>
      </div>
    );
  }

  if (active === 'Products & Menu') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="MENU MANAGEMENT"
          title="Products & Menu"
          subtitle="Add menu items and remove items no longer sold."
        />

        <Panel title="Add product" icon="cup">
          <form
            onSubmit={addProduct}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 12,
              alignItems: 'end',
            }}
          >
            <Field label="Product name">
              <input
                style={inputStyle}
                value={productName}
                onChange={e => setProductName(e.target.value)}
                required
                placeholder="e.g. Mocha Latte"
              />
            </Field>

            <Field label="Price (PHP)">
              <input
                style={inputStyle}
                type="number"
                min="1"
                step="0.01"
                value={productPrice}
                onChange={e => setProductPrice(e.target.value)}
                required
              />
            </Field>

            <Field label="Unit ingredient cost (PHP)">
              <input
                style={inputStyle}
                type="number"
                min="0"
                step="0.01"
                value={productCost}
                onChange={e => setProductCost(e.target.value)}
                required
              />
            </Field>

            <Field label="Category">
              <select
                style={inputStyle}
                value={productCategory}
                onChange={e => setProductCategory(e.target.value)}
              >
                <option>Hot Coffee</option>
                <option>Cold Coffee</option>
                <option>Non-Coffee</option>
                <option>Pastries</option>
              </select>
            </Field>

            <button style={actionStyle} type="submit">
              Add product
            </button>
          </form>
        </Panel>

        <Panel
          title={`Menu items (${products.length})`}
          icon="history"
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {['Product', 'Category', 'Selling price', 'Unit cost', 'Action'].map(x => (
                    <th key={x} style={cellStyle}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td style={cellStyle}>{p.name}</td>
                    <td style={cellStyle}>{p.category}</td>
                    <td style={cellStyle}>{money(p.price)}</td>
                    <td style={cellStyle}>{p.unitCost === undefined ? 'Not set' : money(p.unitCost)}</td>

                    <td style={cellStyle}>
                      <button
                        style={{
                          ...actionStyle,
                          background: '#a64f3c',
                        }}
                        onClick={() => {
                          setProducts(old =>
                            old.filter(x => x.id !== p.id)
                          );
                          act('Product removed.');
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  if (active === 'My Schedule') {
    const me = staff.find(s => s.username === username)
    return <div className="content"><PageTitle eyebrow="TEAM" title="My Schedule" subtitle="Check your assigned shift and days off." />
      <Panel title="Assigned shift" icon="calendar"><div style={{padding:18}}><h3 style={{marginTop:0,color:'#3b2925'}}>{me?.name || username}</h3><p>{me?.schedule || 'No schedule assigned yet. Please contact your manager.'}</p></div></Panel>
    </div>
  }

  if (active === 'Attendance') {
    const meIndex = staff.findIndex(s => s.username === username)
    const me = staff[meIndex]
    const today = new Date().toLocaleDateString()
    const record = me?.attendance.find(a => a.date === today)
    const updateAttendance = (kind: 'in' | 'out') => {
      if (meIndex < 0) return
      const existingRecord = me?.attendance.find(a => a.date === today)
      if (kind === 'in' && existingRecord?.timeIn) { act('Time in has already been recorded for today.'); return }
      if (kind === 'out' && !existingRecord?.timeIn) { act('Please record Time In first.'); return }
      if (kind === 'out' && existingRecord?.timeOut) { act('Time out has already been recorded for today.'); return }
      const nowDate = new Date()
      const now = nowDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
      let status = existingRecord?.status || 'Present'
      if (kind === 'in' && me?.schedule) {
        const match = me.schedule.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i)
        if (match) {
          let hour = Number(match[1].split(':')[0]) % 12
          const minute = Number(match[1].split(':')[1])
          if (match[2].toUpperCase() === 'PM') hour += 12
          const scheduledMinutes = hour * 60 + minute
          const actualMinutes = nowDate.getHours() * 60 + nowDate.getMinutes()
          if (actualMinutes > scheduledMinutes + 5) status = 'Late'
        }
      }
      setStaff(old => old.map((person, i) => {
        if (i !== meIndex) return person
        const existing = person.attendance.find(a => a.date === today)
        const attendance = existing
          ? person.attendance.map(a => a.date === today ? {...a, status, ...(kind === 'in' ? {timeIn: now} : {timeOut: now})} : a)
          : [...person.attendance, {date: today, status, ...(kind === 'in' ? {timeIn:now} : {timeOut:now})}]
        return {...person, attendance}
      }))
      act(kind === 'in' ? `Time in recorded (${status}).` : 'Time out recorded.')
    }
    return <div className="content"><PageTitle eyebrow="TEAM" title="Attendance" subtitle="Record your time in and time out for today's shift." />
      <Panel title={`Today's attendance · ${today}`} icon="history"><div style={{padding:18}}><p><strong>Status:</strong> {record?.status || 'Not recorded'}</p><p><strong>Time in:</strong> {record?.timeIn || '—'} &nbsp; <strong>Time out:</strong> {record?.timeOut || '—'}</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><button style={actionStyle} disabled={!!record?.timeIn} onClick={() => updateAttendance('in')}>Time In</button><button style={actionStyle} disabled={!record?.timeIn || !!record?.timeOut} onClick={() => updateAttendance('out')}>Time Out</button></div></div></Panel>
      <Panel title="My attendance history" icon="calendar"><div style={{overflowX:'auto'}}><table style={tableStyle}><thead><tr>{['Date','Status','Time in','Time out'].map(h=><th key={h} style={cellStyle}>{h}</th>)}</tr></thead><tbody>{(me?.attendance || []).slice().reverse().map((a,i)=><tr key={i}><td style={cellStyle}>{a.date}</td><td style={cellStyle}>{a.status}</td><td style={cellStyle}>{a.timeIn || '—'}</td><td style={cellStyle}>{a.timeOut || '—'}</td></tr>)}</tbody></table></div></Panel>
    </div>
  }

 if (active === 'Employees Management' && role !== 'Cashier') {
  const todayAttendanceDate = new Date().toLocaleDateString()

  const markAbsent = (targetUsername: string) => {
    setStaff(old =>
      old.map(person => {
        if (
          person.username !== targetUsername ||
          person.attendance.some(a => a.date === todayAttendanceDate)
        ) {
          return person
        }

        return {
          ...person,
          attendance: [
            ...person.attendance,
            { date: todayAttendanceDate, status: 'Absent' },
          ],
        }
      })
    )

    act('Absent recorded if the employee has no attendance record today.')
  }

  const saveStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get('employeeName') || '').trim()
    const username = String(data.get('username') || '').trim().toLowerCase()
    const employeeRole = String(data.get('employeeRole') || 'Cashier') as UserRole
    const startTime = String(data.get('startTime') || '09:00')
    const endTime = String(data.get('endTime') || '17:00')
    const active = data.get('active') === 'on'

    if (!name || !username) {
      act('Enter an employee name and username.')
      return
    }

    const existing = staff.find(person => person.username === username)

    if (existing) {
      act('That username already exists. Please use a unique username.')
      return
    }

    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number)
      const suffix = hours >= 12 ? 'PM' : 'AM'
      const displayHour = hours % 12 || 12
      return `${displayHour}:${String(minutes).padStart(2, '0')} ${suffix}`
    }

    const newStaff: StaffRecord = {
      username,
      name,
      role: employeeRole,
      startTime,
      endTime,
      active,
      schedule: `${formatTime(startTime)} – ${formatTime(endTime)}`,
      attendance: [],
    }

    setStaff(old => [...old, newStaff])
    form.reset()
    act('Employee added successfully.')
  }

  const updateStaff = (
    username: string,
    field: 'name' | 'role' | 'startTime' | 'endTime' | 'active',
    value: string | boolean
  ) => {
    setStaff(old =>
      old.map(person => {
        if (person.username !== username) return person

        const updated = { ...person, [field]: value }

        if (field === 'startTime' || field === 'endTime') {
          const start = field === 'startTime' ? String(value) : (updated.startTime || '09:00')
          const end = field === 'endTime' ? String(value) : (updated.endTime || '17:00')

          const formatTime = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number)
            const suffix = hours >= 12 ? 'PM' : 'AM'
            return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`
          }

          updated.schedule = `${formatTime(start)} – ${formatTime(end)}`
          updated.startTime = start
          updated.endTime = end
        }

        return updated
      })
    )
  }

  return (
    <div className="content">
      <PageTitle
        eyebrow="PEOPLE & OPERATIONS"
        title="Employees Management"
        subtitle="Manage employee details, work schedules, status, and attendance."
      />

      <Panel title="Add employee" icon="orders">
        <form
          onSubmit={saveStaff}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            padding: 18,
            alignItems: 'end',
          }}
        >
          <Field label="Employee name">
            <input
              name="employeeName"
              style={inputStyle}
              placeholder="Enter full name"
              required
            />
          </Field>

          <Field label="Username">
            <input
              name="username"
              style={inputStyle}
              placeholder="Unique username"
              required
            />
          </Field>

          <Field label="Role">
            <select name="employeeRole" style={inputStyle} defaultValue="Cashier">
              <option value="Cashier">Cashier</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </Field>

          <Field label="Start time">
            <input
              name="startTime"
              type="time"
              style={inputStyle}
              defaultValue="09:00"
              required
            />
          </Field>

          <Field label="End time">
            <input
              name="endTime"
              type="time"
              style={inputStyle}
              defaultValue="17:00"
              required
            />
          </Field>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 10 }}>
            <input name="active" type="checkbox" defaultChecked />
            Active employee
          </label>

          <button style={actionStyle} type="submit">
            Add employee
          </button>
        </form>
      </Panel>

      <Panel title={`Employee records (${staff.length})`} icon="history">
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {[
                  'Employee',
                  'Username',
                  'Role',
                  'Start time',
                  'End time',
                  'Status',
                  'Attendance',
                  "Today's status",
                  'Actions',
                ].map(header => (
                  <th key={header} style={cellStyle}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {staff.map(person => (
                <tr key={person.username}>
                  <td style={cellStyle}>
                    <input
                      style={inputStyle}
                      value={person.name}
                      onChange={e => updateStaff(person.username, 'name', e.target.value)}
                    />
                  </td>

                  <td style={cellStyle}>{person.username}</td>

                  <td style={cellStyle}>
                    <select
                      style={inputStyle}
                      value={person.role}
                      onChange={e =>
                        updateStaff(person.username, 'role', e.target.value)
                      }
                    >
                      <option value="Cashier">Cashier</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>

                  <td style={cellStyle}>
                    <input
                      type="time"
                      style={inputStyle}
                      value={person.startTime || '09:00'}
                      onChange={e =>
                        updateStaff(person.username, 'startTime', e.target.value)
                      }
                    />
                  </td>

                  <td style={cellStyle}>
                    <input
                      type="time"
                      style={inputStyle}
                      value={person.endTime || '17:00'}
                      onChange={e =>
                        updateStaff(person.username, 'endTime', e.target.value)
                      }
                    />
                  </td>

                  <td style={cellStyle}>
                    <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={person.active !== false}
                        onChange={e =>
                          updateStaff(person.username, 'active', e.target.checked)
                        }
                      />
                      {person.active === false ? 'Inactive' : 'Active'}
                    </label>
                  </td>

                  <td style={cellStyle}>{person.attendance.length}</td>

                  <td style={cellStyle}>
                    {person.attendance.find(a => a.date === todayAttendanceDate)?.status ||
                      <button
                        style={actionStyle}
                        onClick={() => markAbsent(person.username)}
                      >
                        Mark absent
                      </button>}
                  </td>
                  <td style={cellStyle}>
  <button
    style={actionStyle}
    onClick={() => {
      const confirmed = window.confirm(
        `Delete ${person.name}? This will also remove their attendance from this staff list.`
      )

      if (confirmed) {
        setStaff(old =>
          old.filter(employee => employee.username !== person.username)
        )
        act('Employee deleted.')
      }
    }}
  >
    Delete
  </button>
</td>
                </tr>
      
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Attendance overview" icon="calendar">
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {['Employee', 'Date', 'Status', 'Time in', 'Time out'].map(header => (
                  <th key={header} style={cellStyle}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {staff.flatMap(person =>
                person.attendance.map((attendance, index) => (
                  <tr key={`${person.username}-${index}`}>
                    <td style={cellStyle}>{person.name}</td>
                    <td style={cellStyle}>{attendance.date}</td>
                    <td style={cellStyle}>{attendance.status}</td>
                    <td style={cellStyle}>{attendance.timeIn || '—'}</td>
                    <td style={cellStyle}>{attendance.timeOut || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
  if (active === 'Reports') {
    const now = new Date()
    const getDate = (value: string) => { const d = new Date(value); return Number.isNaN(d.getTime()) ? null : d }
    const sameWeek = (d: Date) => { const start = new Date(now); start.setHours(0,0,0,0); start.setDate(start.getDate() - ((start.getDay()+6)%7)); const end = new Date(start); end.setDate(start.getDate()+7); return d >= start && d < end }
    const periodSales = sales.filter(s => { const d = getDate(s.date); return d && (role === 'Cashier' ? s.cashier === (staff.find(x=>x.username===username)?.name || username) : true) })
    const daily = periodSales.filter(s => { const d=getDate(s.date); return d?.toDateString() === now.toDateString() })
    const weekly = periodSales.filter(s => { const d=getDate(s.date); return !!d && sameWeek(d) })
    const monthly = periodSales.filter(s => { const d=getDate(s.date); return !!d && d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear() })
    const sum = (list: Sale[], field: 'total'|'cost'|'profit') => list.reduce((n,s)=>n+(s[field] || 0),0)
    const cards = [{label:'Today',list:daily},{label:'This week',list:weekly},{label:'This month',list:monthly}]
    return <div className="content"><PageTitle eyebrow="BUSINESS PERFORMANCE" title={role === 'Cashier' ? 'My Sales Reports' : 'Sales Reports'} subtitle="Sales are grouped by local transaction date. Figures use recorded checkouts." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14,marginBottom:18}}>{cards.map(c=><Panel key={c.label} title={c.label} icon="chart"><div style={{padding:16}}><p>Transactions: <strong>{c.list.length}</strong></p><p>Sales: <strong>{money(sum(c.list,'total'))}</strong></p><p>Ingredient cost: <strong>{money(sum(c.list,'cost'))}</strong></p><p>Gross profit: <strong>{money(sum(c.list,'profit'))}</strong></p></div></Panel>)}</div>
      {role !== 'Cashier' && <Panel title="Sales by cashier" icon="orders"><div style={{overflowX:'auto'}}><table style={tableStyle}><thead><tr>{['Cashier','Transactions','Sales','Ingredient cost','Gross profit'].map(h=><th key={h} style={cellStyle}>{h}</th>)}</tr></thead><tbody>{Array.from(new Set(sales.map(s=>s.cashier || 'Unassigned'))).map(name=>{const list=sales.filter(s=>(s.cashier||'Unassigned')===name);return <tr key={name}><td style={cellStyle}>{name}</td><td style={cellStyle}>{list.length}</td><td style={cellStyle}>{money(sum(list,'total'))}</td><td style={cellStyle}>{money(sum(list,'cost'))}</td><td style={cellStyle}>{money(sum(list,'profit'))}</td></tr>})}</tbody></table></div></Panel>}
    </div>
  }

  if (active === 'Sales History') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="TRANSACTION RECORDS"
          title="Sales History"
          subtitle={role === 'Cashier' ? 'Your completed transactions.' : 'Completed transactions across the café, including cashier attribution.'}
        />

        <Panel
          title={`Transactions (${visibleSales.length})`}
          icon="history"
          action={<strong>{money(visibleSales.reduce((sum, sale) => sum + sale.total, 0))}</strong>}
        >
          {visibleSales.length === 0 ? (
            <p>
              No sales yet. Go to Point of Sale and complete a checkout
              to create your first record.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {['Transaction', 'Date', 'Items', 'Payment', 'Sales total', 'Ingredient cost', 'Gross profit'].map(x => (
                      <th key={x} style={cellStyle}>
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {visibleSales.map(s => (
                    <tr key={s.id}>
                      <td style={cellStyle}>
                        #{String(s.id).slice(-6)}
                      </td>
                      <td style={cellStyle}>{s.date}</td>
                      <td style={cellStyle}>{s.items}</td>
                      <td style={cellStyle}>{s.paymentMethod ?? 'Legacy record'}</td>
                      <td style={cellStyle}>{money(s.total)}</td>
                      <td style={cellStyle}>{s.cost === undefined ? 'Not recorded' : money(s.cost)}</td>
                      <td style={cellStyle}>{s.profit === undefined ? 'Not recorded' : money(s.profit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    );
  }

  if (active === 'Smart Inventory') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="STOCK CONTROL"
          title="Smart Inventory"
          subtitle="Record ingredients, stock levels, reorder thresholds, and expiration dates."
        />

        {role !== 'Cashier' && <Panel title="Add ingredient" icon="box">
          <form
            onSubmit={addIngredient}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
              gap: 12,
              alignItems: 'end',
            }}
          >
            <Field label="Ingredient name">
              <input
                style={inputStyle}
                value={ingredientName}
                onChange={e => setIngredientName(e.target.value)}
                required
                placeholder="e.g. Espresso beans"
              />
            </Field>

            <Field label="Quantity">
              <input
                style={inputStyle}
                type="number"
                min="0"
                step="0.1"
                value={ingredientQty}
                onChange={e => setIngredientQty(e.target.value)}
                required
              />
            </Field>

            <Field label="Unit">
              <input
                style={inputStyle}
                value={ingredientUnit}
                onChange={e => setIngredientUnit(e.target.value)}
                required
                placeholder="kg, L, pcs"
              />
            </Field>

            <Field label="Low-stock threshold">
              <input
                style={inputStyle}
                type="number"
                min="0"
                step="0.1"
                value={ingredientMin}
                onChange={e => setIngredientMin(e.target.value)}
                required
              />
            </Field>

            <Field label="Expiration date">
              <input
                style={inputStyle}
                type="date"
                value={ingredientExpiry}
                onChange={e => setIngredientExpiry(e.target.value)}
              />
            </Field>

            <button style={actionStyle} type="submit">
              Add ingredient
            </button>
          </form>
        </Panel>}

        <Panel
          title={`Ingredients (${ingredients.length})`}
          icon="history"
        >
          <input
            style={{ ...inputStyle, marginBottom: 12 }}
            placeholder="Search ingredients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {[
                    'Ingredient',
                    'Quantity',
                    'Reorder at',
                    'Expiry',
                    'Status',
                    'Stock action',
                  ].map(x => (
                    <th key={x} style={cellStyle}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredIngredients.map(i => (
                  <tr key={i.id}>
                    <td style={cellStyle}>{i.name}</td>
                    <td style={cellStyle}>
                      {i.quantity} {i.unit}
                    </td>
                    <td style={cellStyle}>
                      {i.min} {i.unit}
                    </td>
                    <td style={cellStyle}>{i.expiry || '—'}</td>

                    <td style={cellStyle}>
                      <span
                        className={`status ${
                          i.quantity <= i.min
                            ? 'danger'
                            : i.quantity <= i.min * 1.5
                              ? 'warn'
                              : 'good'
                        }`}
                      >
                        {i.quantity <= i.min
                          ? 'Low stock'
                          : i.quantity <= i.min * 1.5
                            ? 'Watch'
                            : 'In stock'}
                      </span>
                    </td>

                    <td style={cellStyle}>
                      {role !== 'Cashier' ? <><button
                        style={actionStyle}
                        onClick={() => {
                          const raw = window.prompt(
                            `New quantity for ${i.name}`,
                            String(i.quantity)
                          );

                          if (
                            raw !== null &&
                            raw.trim() !== '' &&
                            Number.isFinite(Number(raw)) &&
                            Number(raw) >= 0
                          ) {
                            setIngredients(old =>
                              old.map(x =>
                                x.id === i.id
                                  ? { ...x, quantity: Number(raw) }
                                  : x
                              )
                            );
                          }
                        }}
                      >
                        Update qty
                      </button>{' '}

                      <button
                        style={{
                          ...actionStyle,
                          background: '#a64f3c',
                        }}
                        onClick={() =>
                          setIngredients(old =>
                            old.filter(x => x.id !== i.id)
                          )
                        }
                      >
                        Remove
                      </button></> : <span style={{color:'#8b6c52'}}>View only</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  if (active === 'Expiration Alerts') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="FRESHNESS TRACKING"
          title="Expiration Alerts"
          subtitle="Ingredients expiring within the next three days are highlighted."
        />

        <Panel
          title={`Upcoming expiration (${soonExpiry.length})`}
          icon="calendar"
        >
          {ingredients
            .filter(i => i.expiry)
            .sort((a, b) => a.expiry.localeCompare(b.expiry))
            .map(i => {
              const days = Math.ceil(
                (
                  new Date(i.expiry).getTime() -
                  new Date().setHours(0, 0, 0, 0)
                ) / 86400000
              );

              return (
                <div
                  key={i.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: 12,
                    borderBottom: '1px solid #eee4d7',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <b>{i.name}</b>
                    <div style={{ fontSize: 13, color: '#8b6c52' }}>
                      {i.quantity} {i.unit}
                    </div>
                  </div>

                  <span
                    className={`status ${
                      days < 0 ? 'danger' : days <= 3 ? 'warn' : 'good'
                    }`}
                  >
                    {days < 0
                      ? `Expired ${Math.abs(days)} day(s) ago`
                      : days === 0
                        ? 'Expires today'
                        : `Expires in ${days} day(s)`}
                  </span>

                  <span>{i.expiry}</span>
                </div>
              );
            })}
        </Panel>
      </div>
    );
  }

  if (active === 'Waste Monitoring') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="WASTE & LOSS"
          title="Waste Monitoring"
          subtitle="Log wasted ingredients and estimate their cost."
        />

        <Panel title="Log waste" icon="trash">
          <form
            onSubmit={logWaste}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 12,
              alignItems: 'end',
            }}
          >
            <Field label="Ingredient / item">
              <input
                style={inputStyle}
                value={wasteItem}
                onChange={e => setWasteItem(e.target.value)}
                required
                placeholder="e.g. spoiled milk"
              />
            </Field>

            <Field label="Quantity wasted">
              <input
                style={inputStyle}
                type="number"
                min="0.1"
                step="0.1"
                value={wasteQty}
                onChange={e => setWasteQty(e.target.value)}
                required
              />
            </Field>

            <Field label="Reason">
              <select
                style={inputStyle}
                value={wasteReason}
                onChange={e => setWasteReason(e.target.value)}
              >
                <option>Over-preparation</option>
                <option>Spillage</option>
                <option>Expired</option>
                <option>Quality issue</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Estimated cost (PHP)">
              <input
                style={inputStyle}
                type="number"
                min="0"
                step="0.01"
                value={wasteCost}
                onChange={e => setWasteCost(e.target.value)}
                required
              />
            </Field>

            <button style={actionStyle} type="submit">
              Save waste record
            </button>
          </form>
        </Panel>

        <Panel
          title={`Waste log (${waste.length})`}
          icon="history"
          action={<strong>Total: {money(totalWaste)}</strong>}
        >
          {waste.length === 0 ? (
            <p>No waste records yet. Use the form above to log waste.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {[
                      'Date',
                      'Item',
                      'Quantity',
                      'Reason',
                      'Estimated cost',
                      'Action',
                    ].map(x => (
                      <th key={x} style={cellStyle}>
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {waste.map(w => (
                    <tr key={w.id}>
                      <td style={cellStyle}>{w.date}</td>
                      <td style={cellStyle}>{w.item}</td>
                      <td style={cellStyle}>{w.quantity}</td>
                      <td style={cellStyle}>{w.reason}</td>
                      <td style={cellStyle}>{money(w.cost)}</td>

                      <td style={cellStyle}>
                        <button
                          style={{
                            ...actionStyle,
                            background: '#a64f3c',
                          }}
                          onClick={() =>
                            setWaste(old =>
                              old.filter(x => x.id !== w.id)
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    );
  }

  if (active === 'Weather Insights') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="WEATHER-ADAPTIVE MENU"
          title="Weather Insights"
          subtitle="Manually enter current conditions to update the suggested drink pairing."
        />

        <Panel title="Current conditions" icon="cloud">
          <form
            onSubmit={e => {
              e.preventDefault();
              act('Weather settings updated.');
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 14,
              alignItems: 'end',
            }}
          >
            <Field label="Weather condition">
              <select
                style={inputStyle}
                value={weather}
                onChange={e => setWeather(e.target.value)}
              >
                <option>Rainy & cool</option>
                <option>Cloudy</option>
                <option>Sunny</option>
                <option>Hot & humid</option>
                <option>Stormy</option>
              </select>
            </Field>

            <Field label="Temperature (°C)">
              <input
                style={inputStyle}
                type="number"
                value={temperature}
                onChange={e => setTemperature(e.target.value)}
                required
              />
            </Field>

            <button style={actionStyle} type="submit">
              Save conditions
            </button>
          </form>

          <div
            style={{
              marginTop: 20,
              padding: 18,
              background: '#f7f1e8',
              borderRadius: 12,
            }}
          >
            <div className="eyebrow">DRINK RECOMMENDATION</div>

            <h2>
              {weather.toLowerCase().includes('rain') ||
              Number(temperature) < 24
                ? 'Hot Caramel Latte'
                : 'Iced Spanish Latte'}
            </h2>

            <p>
              {weather.toLowerCase().includes('rain') ||
              Number(temperature) < 24
                ? 'A warm drink may suit cool or rainy conditions.'
                : 'A chilled drink may suit warm conditions.'}
            </p>

            <small>
              Demo recommendation based on manually entered conditions;
              no live weather API is connected.
            </small>
          </div>
        </Panel>
      </div>
    );
  }

  if (active === 'Reports') {
    return (
      <div className="content">
        <PageTitle
          eyebrow="BUSINESS SUMMARY"
          title="Reports"
          subtitle="A summary of transactions, stock alerts, and logged waste."
        />

        <div className="metrics">
          <article className="metric">
            <div className="metric-top">
              <span>Total sales</span>
              <i><Icon name="peso" /></i>
            </div>

            <strong>{money(totalSales)}</strong>

            <div className="metric-foot">
              <span>All saved transactions</span>
            </div>
          </article>

          <article className="metric">
            <div className="metric-top">
              <span>Completed orders</span>
              <i><Icon name="orders" /></i>
            </div>

            <strong>{totalOrders}</strong>

            <div className="metric-foot">
              <span>All saved transactions</span>
            </div>
          </article>

          <article className="metric">
            <div className="metric-top">
              <span>Waste cost</span>
              <i><Icon name="trash" /></i>
            </div>

            <strong>{money(totalWaste)}</strong>

            <div className="metric-foot">
              <span>{waste.length} waste records</span>
            </div>
          </article>
        </div>

        <Panel title="Sales transactions" icon="chart">
          <p>
            Total recorded revenue: <b>{money(totalSales)}</b>
          </p>

          <p>
            Average order value:{' '}
            <b>{money(totalOrders ? totalSales / totalOrders : 0)}</b>
          </p>

          <p>
            Low-stock ingredients: <b>{lowStock}</b>
          </p>

          <p>
            Ingredients expiring within 3 days: <b>{soonExpiry.length}</b>
          </p>

          <button
            style={actionStyle}
            onClick={() => {
              const rows = [
                ['Transaction ID', 'Date', 'Items', 'Total'],
                ...sales.map(s => [s.id, s.date, s.items, s.total]),
              ];

              const csv = rows
                .map(row =>
                  row
                    .map(v => `"${String(v).replace(/"/g, '""')}"`)
                    .join(',')
                )
                .join('\n');

              const url = URL.createObjectURL(
                new Blob([csv], {
                  type: 'text/csv;charset=utf-8;',
                })
              );

              const a = document.createElement('a');
              a.href = url;
              a.download = 'solstice-sales-report.csv';
              a.click();

              URL.revokeObjectURL(url);
              act('Sales CSV downloaded.');
            }}
          >
            Export sales CSV
          </button>
        </Panel>
      </div>
    );
  }

  return (
    <div className="content">
      <PageTitle
        eyebrow="PREFERENCES"
        title="Settings"
        subtitle="Basic settings for this local demo application."
      />

      <Panel title="Application information" icon="settings">
        <p>
          <b>System:</b> Solstice Coffee Management
        </p>

        <p>
          <b>Storage:</b> Local browser storage on this device and browser
        </p>

        <p>
          <b>Weather:</b> Manual entry; live API not connected
        </p>

        <p>
          <b>Database:</b> No shared server database configured
        </p>

        <button
          style={{
            ...actionStyle,
            background: '#a64f3c',
          }}
          onClick={() => {
            if (
              window.confirm(
                'Clear all saved products, ingredients, sales, and waste records? This cannot be undone.'
              )
            ) {
              localStorage.removeItem('solstice_products');
              localStorage.removeItem('solstice_ingredients');
              localStorage.removeItem('solstice_sales');
              localStorage.removeItem('solstice_waste');

              setProducts(initialProducts);
              setIngredients(initialIngredients);
              setSales([]);
              setWaste([]);
              setCart([]);

              act('Local demo data reset.');
            }
          }}
        >
          Reset demo data
        </button>
      </Panel>
    </div>
  );
};

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const user = username.trim().toLowerCase()
    const account = staff.find(person => person.username.toLowerCase() === user)
    // Demo-only role passwords: seeded accounts keep their documented passwords;
    // newly added staff use <Role>@2026 until a real authentication backend is connected.
    const expectedPassword = user === 'admin'
      ? 'Solstice@2026'
      : user === 'manager'
        ? 'Manager@2026'
        : user === 'cashier'
          ? 'Cashier@2026'
          : account ? `${account.role}@2026` : ''
    if (account && password === expectedPassword) {
      setRole(account.role)
      setUsername(user)
      setIsLoggedIn(true)
      setActive('Dashboard')
      setLoginError('')
    } else {
      setLoginError('Invalid username or password. New demo staff use <Role>@2026 (for example, Cashier@2026).')
    }
  }

  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#f7f1e8',
          padding: 24
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: '100%',
            maxWidth: 400,
            boxSizing: 'border-box',
            padding: 32,
            borderRadius: 18,
            background: '#fffdf9',
            boxShadow: '0 12px 36px rgba(59,41,37,.12)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 4,
                color: '#6f4e37'
              }}
            >
              ☕ SOLSTICE COFFEE
            </div>

            <h1 style={{ color: '#3b2925', marginBottom: 8 }}>
              Welcome Back
            </h1>

            <p style={{ color: '#8b6c52', marginTop: 0 }}>
              Every Season, Your Perfect Brew.
            </p>
          </div>

          <label
            style={{
              display: 'grid',
              gap: 8,
              color: '#6f4e37',
              marginBottom: 16
            }}
          >
            Username

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              style={inputStyle}
            />
          </label>

          <label
            style={{
              display: 'grid',
              gap: 8,
              color: '#6f4e37',
              marginBottom: 16
            }}
          >
            Password

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={inputStyle}
            />
          </label>

          {loginError && (
            <p
              role="alert"
              style={{
                color: '#a64f3c',
                fontSize: 13
              }}
            >
              {loginError}
            </p>
          )}

          <button
            type="submit"
            style={{
              ...actionStyle,
              width: '100%',
              padding: 12
            }}
          >
            Login
          </button>

          <p
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#8b6c52',
              marginTop: 18
            }}
          >
            Admin access only
          </p>
        </form>
      </div>
    )
  }
return (
  <div className={`app-shell ${
  weatherLoading || weatherError
    ? ''
    : `weather-${weather.toLowerCase().replace(/\s+/g, '-')}`
}`}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Icon name="cup" size={20}/></div><div><strong>SOLSTICE</strong><span>COFFEE</span></div></div>
      <p className="brand-note">Every season,<br/>your perfect brew.</p>
      <nav>{nav.filter(([label]) => role !== 'Cashier' ? !['Point of Sale', 'My Schedule', 'Attendance'].includes(label) : ['Dashboard', 'Point of Sale', 'Smart Inventory', 'Sales History', 'Reports', 'My Schedule', 'Attendance'].includes(label)).map(([label, icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setSearch('') }}><Icon name={icon}/><span>{label}</span>{label === 'Expiration Alerts' && soonExpiry.length > 0 && <b>{soonExpiry.length}</b>}</button>)}</nav>
      <div className="sidebar-bottom">
  <button
    className={active === 'Settings' ? 'active' : ''}
    onClick={() => setActive('Settings')}
  >
    <Icon name="settings" />
    <span>Settings</span>
  </button>

  <button
    onClick={() => {
      setIsLoggedIn(false)
      setPassword('')
      setUsername('')
      setLoginError('')
      setActive('Dashboard')
    }}
  >
    <Icon name="arrow" />
    <span>Logout</span>
  </button>

  <div className="profile">
    <div className="avatar">{(staff.find(s => s.username === username)?.name || username).slice(0, 2).toUpperCase()}</div>
    <div>
      <strong>{staff.find(s => s.username === username)?.name || username}</strong>
      <span>{role}</span>
    </div>
  </div>
</div>
    </aside>
     <main>
      <div className="topbar">
     <div className="search" style={{ position: 'relative', zIndex: 1001 }}>
  <Icon name="search" size={17} />

  <input
    placeholder="Search inventory, sales, reports..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    onKeyDown={e => {
      if (e.key !== 'Enter') return;

      const query = search.trim().toLowerCase();
      if (!query) return;

      const product = products.find(p =>
        `${p.name} ${p.category}`.toLowerCase().includes(query)
      );

      const ingredient = ingredients.find(i =>
        `${i.name} ${i.unit}`.toLowerCase().includes(query)
      );

      if (product) {
        setActive('Point of Sale');
      } else if (ingredient) {
        setActive('Smart Inventory');
      } else if (/sale|order|transaction/.test(query)) {
        setActive('Sales History');
      } else if (/expir|expired/.test(query)) {
        setActive('Expiration Alerts');
      } else if (/waste|discard/.test(query)) {
        setActive('Waste Monitoring');
      } else if (/report|analytics/.test(query)) {
        setActive('Reports');
      } else if (/weather|temperature|forecast/.test(query)) {
        setActive('Weather Insights');
      } else if (/menu|product|drink|coffee/.test(query)) {
        setActive('Products & Menu');
      } else if (/inventory|stock|ingredient/.test(query)) {
        setActive('Smart Inventory');
      } else {
        alert('No matching results found.');
      }
    }}
  />

  {search.trim() && (
    <div
    style={{
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  width: '100%',
  boxSizing: 'border-box',
  maxHeight: '320px',
  overflowY: 'auto',
  background: '#F7F1E8',
  border: '1px solid #D8C3A5',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(59, 41, 37, 0.15)',
  zIndex: 1000,
  padding: '8px',
  color: '#3B2925'
}}
    >
      <div
        style={{
          padding: '8px 10px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1px',
          color: '#6F4E37'
        }}
      >
        SEARCH RESULTS
      </div>

      {[
        ...products
          .filter(p =>
            `${p.name} ${p.category}`.toLowerCase().includes(search.trim().toLowerCase())
          )
          .map(p => ({
            name: p.name,
            detail: `Product · ${p.category}`,
            page: 'Point of Sale'
          })),

        ...ingredients
          .filter(i =>
            `${i.name} ${i.unit}`.toLowerCase().includes(search.trim().toLowerCase())
          )
          .map(i => ({
            name: i.name,
            detail: `Ingredient · ${i.unit}`,
            page: 'Smart Inventory'
          })),

        ...[
          { name: 'Sales History', keywords: 'sales sale order transaction' },
          { name: 'Expiration Alerts', keywords: 'expiration expir expired' },
          { name: 'Waste Monitoring', keywords: 'waste discard wastage' },
          { name: 'Reports', keywords: 'reports report analytics' },
          { name: 'Weather Insights', keywords: 'weather temperature forecast' },
          { name: 'Products & Menu', keywords: 'menu products product drinks coffee' },
          { name: 'Smart Inventory', keywords: 'inventory stock ingredients ingredient' }
        ]
          .filter(item =>
            `${item.name} ${item.keywords}`
              .toLowerCase()
              .includes(search.trim().toLowerCase())
          )
          .map(item => ({
            name: item.name,
            detail: 'Management page',
            page: item.name
          }))
      ]
        .filter(
          (item, index, all) =>
            all.findIndex(
              other =>
                other.name.toLowerCase() === item.name.toLowerCase() &&
                other.page === item.page
            ) === index
        )
        .slice(0, 8)
        .map((item, index) => (
          <button
            key={`${item.page}-${item.name}-${index}`}
            type="button"
            onClick={() => {
              setActive(item.page);
              setSearch('');
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              background: 'transparent',
              color: '#3B2925',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '13px' }}>
              {item.name}
            </div>
            <div style={{ fontSize: '11px', color: '#6F4E37', marginTop: '3px' }}>
              {item.detail}
            </div>
          </button>
        ))}

      {!products.some(p =>
        `${p.name} ${p.category}`.toLowerCase().includes(search.trim().toLowerCase())
      ) &&
        !ingredients.some(i =>
          `${i.name} ${i.unit}`.toLowerCase().includes(search.trim().toLowerCase())
        ) &&
        ![
          'sales sale order transaction',
          'expiration expir expired',
          'waste discard wastage',
          'reports report analytics',
          'weather temperature forecast',
          'menu products product drinks coffee',
          'inventory stock ingredients ingredient'
        ].some(keywords =>
          keywords.includes(search.trim().toLowerCase())
        ) && (
          <div
            style={{
              padding: '12px 10px',
              fontSize: '12px',
              color: '#6F4E37'
            }}
          >
            No matching results found.
          </div>
        )}
    </div>
  )}
</div>

        <div className="top-meta">
          <span>
            {new Date().toLocaleDateString('en-PH', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </span>

          <button
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => setActive('Expiration Alerts')}
          >
            <Icon name="bell" size={18} />
            <i />
          </button>

          <div className="mini-avatar">AD</div>
        </div>
      </div>

      {renderPage()}
    </main>

    {notice && (
      <div className="toast" role="status">
        {notice}
      </div>
    )}
  </div>
)
}
