// Types for menu items and categories
export type CategoryId = 'entradas' | 'hamburgueres' | 'acompanhamentos' | 'sobremesas' | 'bebidas';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc?: string;
  image: string;
  categoryId?: CategoryId;
}

export interface MenuCategory {
  id: CategoryId;
  title: string;
  items: MenuItem[];
}

export interface MenuData {
  title: string;
  subtitle: string;
  categories: MenuCategory[];
  drinks: MenuItem[];
}

// Types for cart functionality
export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  total: number;
}

// Types for image management
export type MenuImages = {
  [key in CategoryId]: {
    [key: string]: string;
  };
} & {
  placeholder: string;
}

// Props types for components
export interface MoneyProps {
  value: number;
}

export interface MenuItemProps {
  item: MenuItem;
  onOpenModal: (item: MenuItem) => void;
}

export interface MenuSectionProps {
  category: MenuCategory;
  onOpenModal: (item: MenuItem) => void
}

export interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
  total: number
  onClose: () => void
}

export interface ItemModalProps {
  item: MenuItem
  onClose: () => void
  onAddToCart: (item: MenuItem, quantity: number) => void
}