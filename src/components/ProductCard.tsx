
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      image
    });
    
    toast.success('Added to cart!', {
      description: `${name} has been added to your cart.`
    });
  };

  return (
    <div 
      className="product-card bg-white rounded-lg overflow-hidden shadow-sm relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out transform group-hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            {category === 'new' && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {category === 'sale' && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                SALE
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-primary font-semibold">${price.toFixed(2)}</p>
        </div>
        
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white p-3 transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Button 
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
