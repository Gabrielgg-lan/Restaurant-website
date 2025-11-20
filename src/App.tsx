import { useState, useCallback } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { images } from './assets/images/index.ts'
import './styles/App.css'
import type {
  MenuData,
  MenuItem,
  CartItem,
  Cart,
  MenuItemProps,
  MenuSectionProps,
  CartItemProps,
  CartProps,
  ItemModalProps,
  MoneyProps,
  CategoryId
} from './types'

// Custom hook pra gerenciar o carrinho de compras
const useCart = (): Cart => {
  const [items, setItems] = useState<CartItem[]>([])
  
  const addItem = useCallback((item: MenuItem, quantity: number = 1) => {
    setItems(current => {
      const existing = current.find(i => i.id === item.id)
      if (existing) {
        return current.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...current, { ...item, quantity }]
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems(current => current.filter(i => i.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems(current => 
      current.map(i => 
        i.id === itemId 
          ? { ...i, quantity: Math.max(0, quantity) }
          : i
      ).filter(i => i.quantity > 0)
    )
  }, [])

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return { items, addItem, removeItem, updateQuantity, total }
}

const menuData: MenuData = {
  title: 'Burger Joint',
  subtitle: 'Hambúrgueres artesanais, feitos com carinho',
  categories: [
    {
      id: 'entradas',
      title: 'Entradas',
      items: [
        { 
          id: 'batatas-rusticas',
          name: 'Batatas Rústicas', 
          price: 18.90, 
          desc: 'Batatas cortadas na casa, assadas e temperadas com ervas e páprica.',
          image: 'batatas-rusticas.jpg'
        },
        { 
          id: 'onion-rings',
          name: 'Onion Rings', 
          price: 16.50, 
          desc: 'Cebolas empanadas crocantes servidas com maionese da casa.',
          image: 'onion-rings.jpg'
        },
        { 
          id: 'pao-alho',
          name: 'Pão de Alho Especial', 
          price: 12.00, 
          desc: 'Pão artesal com manteiga de ervas e queijo gratinado.',
          image: 'pao-de-alho.jpg'
        }
      ]
    },
    {
      id: 'hamburgueres',
      title: 'Hambúrgueres',
      items: [
        { 
          id: 'classico',
          name: 'Clássico Burger', 
          price: 29.90, 
          desc: '150g de blend bovino, queijo cheddar, alface, tomate e molho secreto no pão brioche.',
          image: 'classico.jpg'
        },
        { 
          id: 'bacon-bbq',
          name: 'Bacon BBQ', 
          price: 34.50, 
          desc: 'Blend bovino, bacon crocante, cebola caramelizada e molho barbecue defumado.',
          image: 'bacon-bbq.jpg'
        },
        { 
          id: 'cheese-melt',
          name: 'Cheese Melt', 
          price: 32.00, 
          desc: 'Queijo cheddar duplo, picles e manteiga de alho no pão tostado.',
          image: 'cheese-melt.jpg'
        },
        { 
          id: 'veggie',
          name: 'Burger Veggie', 
          price: 28.00, 
          desc: 'Hambúrguer de grãos e cogumelos, alface, tomate e molho de ervas.',
          image: 'veggie-burger.jpg'
        }
      ]
    },
    {
      id: 'acompanhamentos',
      title: 'Acompanhamentos',
      items: [
        { 
          id: 'coleslaw',
          name: 'Salada Coleslaw', 
          price: 10.00, 
          desc: 'Repolho crocante com molho cremoso e toque de limão.',
          image: 'coleslaw.jpg'
        },
        { 
          id: 'fritas',
          name: 'Porção de Batata Frita', 
          price: 14.50, 
          desc: 'Fritas douradas, servidas com ketchup e maionese.',
          image: 'porcao-fritas.jpg'
        },
        
      ]
    },
    {
      id: 'sobremesas',
      title: 'Sobremesas',
      items: [
        { 
          id: 'brownie',
          name: 'Brownie com Sorvete', 
          price: 18.00, 
          desc: 'Brownie quente com uma bola de sorvete de baunilha e calda de chocolate.',
          image: 'brownie-sorvete.jpg'
        },
        { 
          id: 'cheesecake',
          name: 'Cheesecake', 
          price: 17.50, 
          desc: 'Cheesecake cremoso com calda de frutas vermelhas.',
          image: 'cheesecake.jpg'
        }
      ]
    }
  ],
    drinks: [
    { id: 'refri', name: 'Refrigerante (lata)', price: 7.50, image: 'refrigerante-lata.jpg' },
    { id: 'suco', name: 'Suco Natural', price: 9.90, image: 'suco-natural.jpg' },
    { id: 'cerveja', name: 'Cerveja Long Neck', price: 12.00, image: 'cerveja-long-neck.jpg' },
    { id: 'agua', name: 'Água Mineral', price: 5.00, image: 'agua-mineral.jpg' }
  ]
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="cart-item">
      <img
        src={getMenuItemImage(item.categoryId, item.id)}
        alt={item.name}
        className="cart-item-image"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = images.placeholder;
        }}
      />
      <div className="cart-item-content">
        <h4>{item.name}</h4>
        <div className="cart-item-price">
          <Money value={item.price} /> × {item.quantity}
        </div>
      </div>
      <div className="cart-item-actions">
        <button 
          className="quantity-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button 
          className="remove-btn"
          onClick={() => onRemove(item.id)}
        >
          ×
        </button>
      </div>
    </div>
  )
}

function Money({ value }: MoneyProps) {
  return <span>R$ {value.toFixed(2).replace('.', ',')}</span>;
}

function Cart({ items, onUpdateQuantity, onRemove, total, onClose }: CartProps) {
  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Seu Pedido</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="cart-items">
        {items.length === 0 ? (
          <p className="cart-empty">Seu carrinho está vazio</p>
        ) : (
          items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <Money value={total} />
          </div>
          <button className="checkout-btn">
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  )
}

// Utility function to safely get image URLs
function getMenuItemImage(categoryId: CategoryId | undefined, itemId: string): string {
  if (!categoryId) return images.placeholder;

  // Map app category IDs to the folder/category keys used in the images index
  // App categories: 'entradas', 'hamburgueres', 'acompanhamentos', 'sobremesas', 'bebidas'
  // Images index uses: 'comidas', 'sobremesas', 'bebidas'
  const categoryMap: Record<string, string> = {
    entradas: 'comidas',
    hamburgueres: 'comidas',
    acompanhamentos: 'comidas',
    sobremesas: 'sobremesas',
    bebidas: 'bebidas'
  };

  const imageCategory = categoryMap[categoryId] || 'comidas';
  const map = (images as unknown) as Record<string, Record<string, string> | undefined>;
  return map[imageCategory]?.[itemId] ?? images.placeholder;
}

function ItemModal({ item, onClose, onAddToCart }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-image">
          <img
            src={getMenuItemImage(item.categoryId, item.id)}
            alt={item.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = images.placeholder;
            }}
          />
        </div>
        <div className="modal-info">
          <h2>{item.name}</h2>
          <p className="modal-description">{item.desc}</p>
          <div className="modal-price">
            <Money value={item.price} />
          </div>
          <div className="modal-actions">
            <div className="quantity-control">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={() => {
                onAddToCart(item, quantity)
                onClose()
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Renders a single menu item with image, name, price, and description.
 * Props:
 * - item: MenuItem object containing details about the menu item.
 * - onOpenModal: Function to open the modal for item details.
 */
function MenuItem({ item, onOpenModal }: MenuItemProps) {
  const getImageSrc = () => getMenuItemImage(item.categoryId, item.id);

  return (
    <div className="menu-item" onClick={() => onOpenModal(item)}>
      <div className="menu-item-image">
        <img
          src={getImageSrc()}
          alt={item.name}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = images.placeholder;
          }}
        />
      </div>
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h3>{item.name}</h3>
          <span className="price">R$ {item.price.toFixed(2).replace('.', ',')}</span>
        </div>
        {item.desc && <p className="description">{item.desc}</p>}
      </div>
    </div>
  )
}

function MenuSection({ category, onOpenModal }: MenuSectionProps) {
  return (
    <div className="menu-section">
      <div className="menu-items">
        {category.items.map(item => (
          <MenuItem
            key={item.id}
            item={{ ...item, categoryId: category.id}}
            // wrap item with categoryId so image paths resolve to the right folder
            onOpenModal={(it) => onOpenModal({ ...it, categoryId: category.id })}
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  const [data] = useState<MenuData>(menuData)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cart = useCart()

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>{data.title}</h1>
          <p className="subtitle">{data.subtitle}</p>
        </div>
        <button 
          className="cart-button"
          onClick={() => setIsCartOpen(true)}
        >
          <span className="cart-icon">🛒</span>
          {cart.items.length > 0 && (
            <span className="cart-count">
              {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      {isCartOpen && (
        <Cart
          items={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemove={cart.removeItem}
          total={cart.total}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={cart.addItem}
        />
      )}

      <Tabs>
        <TabList>
          {data.categories.map(cat => (
            <Tab key={cat.id}>{cat.title}</Tab>
          ))}
          <Tab>Bebidas</Tab>
        </TabList>

        {data.categories.map(category => (
          <TabPanel key={category.id}>
            <MenuSection 
              category={category}
              onOpenModal={setSelectedItem}
            />
          </TabPanel>
        ))}
        <TabPanel>
          <div className="menu-section drinks-section">
            <div className="menu-items">
              {data.drinks.map(drink => (
                <MenuItem 
                  key={drink.id} 
                  item={{ ...drink, categoryId: 'bebidas' }}
                  onOpenModal={(it) => setSelectedItem({ ...it, categoryId: 'bebidas' })}
                />
              ))}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App