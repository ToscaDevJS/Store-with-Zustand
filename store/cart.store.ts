import { CartProductProps, FavoritProductProps, ProductProps } from '@/mocks/products'
import { create } from 'zustand'

export interface CartStore {
    cart: CartProductProps[]
    addToCart: (product: CartProductProps) => void;
    minusFromCart: (product: CartProductProps) => void;
    removeFromCart: (product: CartProductProps) => void;
    removeAllFromCart: () => void;
    totalPrice: () => number;
    totalQuantity: () => number;
    favorites: FavoritProductProps[];
    toggleFavorite: (product: ProductProps) => void;
    removeAllFavorite: () => void;
    totalFavorite: () => number;
}

export const useCartStore = create<CartStore>()((set, get) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => {
            const existingProduct = state.cart.find((item) => item.id === product.id);

            if (existingProduct) {
                const newCart = state.cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return { cart: newCart };
            } else {
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }
        }),
    minusFromCart: (product) =>
        set((state) => {
            const existingProduct = state.cart.find((item) => item.id === product.id)
            if (existingProduct && existingProduct.quantity > 1) {
                const newCart = state.cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
                );
                return { cart: newCart };
            } else if (existingProduct) {
                // Si la cantidad es 1, mantén al menos 1 en el carrito
                const newCart = state.cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: 1 } : item
                );
                return { cart: newCart }
            }
            //si el producto no esta en el carrito, no hace nada
            return { cart: state.cart }
        }),
    removeFromCart: (product) => set((state) => {
        const existingProduct = state.cart.find((item) => item.id === product.id);
        if (existingProduct && existingProduct.quantity >= 1) {
            const newCart = state.cart.filter((item) => item.id !== product.id);
            return { cart: newCart }
        }
        return { cart: state.cart } //si el producto no esta en el carrito, no hace nada
    }),
    removeAllFromCart: () => set(() => ({ cart: [] })),
    favorites: [],
    toggleFavorite: (product) =>
        set((state) => {
            const existingFavorite = state.favorites.find((item) => item.id === product.id);

            if (existingFavorite) {
                const newFavorites = state.favorites.map((item) =>
                    item.id === product.id
                        ? { ...item, isFavorite: !item.isFavorite }
                        : item
                );
                const filteredFavorites = newFavorites.filter((item) => item.isFavorite);
                return { favorites: filteredFavorites }
            } else {
                return { favorites: [...state.favorites, { ...product, isFavorite: true }] }
            }
        }),
    removeAllFavorite: () => set(() => ({ favorites: [] })),
    totalPrice: () => get().cart.reduce((acc, cart) => acc + cart.price * cart.quantity, 0),
    totalQuantity: () => get().cart.reduce((acc, product) => acc + product.quantity, 0),
    totalFavorite: () => get().favorites.length,


}))


