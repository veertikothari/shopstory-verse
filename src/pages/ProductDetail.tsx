
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ChevronLeft, ShoppingCart, Star, Check, Truck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const productData = getProductById(id);
      if (productData) {
        setProduct(productData);
        setSelectedImage(productData.image);
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        });
      }
      
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`, {
        description: `${product.name} has been added to your cart.`
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-16">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/products" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  className={`border rounded-md overflow-hidden transition-all ${
                    selectedImage === image ? 'ring-2 ring-primary' : 'hover:opacity-80'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)} ({Math.floor(product.rating * 10)} reviews)</span>
            </div>
            
            <div className="mb-6">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center mb-2">
              <Truck className="text-primary w-5 h-5 mr-2" />
              <span className="text-sm">
                In stock - {product.stock} available | Free shipping on orders over $50
              </span>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  type="button"
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  type="button"
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
              
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-6 bg-white rounded-lg mt-4">
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <p className="mb-4">
                {product.description}
              </p>
              <h4 className="font-medium mb-2">Materials & Care</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Proin ac tortor id dui finibus convallis. Maecenas at nibh nec arcu 
                sodales varius. Suspendisse potenti. Cras faucibus sagittis mi, 
                a feugiat elit auctor a.
              </p>
            </TabsContent>
            <TabsContent value="shipping" className="p-6 bg-white rounded-lg mt-4">
              <h3 className="text-lg font-medium mb-4">Shipping & Returns</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Shipping</h4>
                  <p>
                    We ship to all 50 US states, as well as Canada, the UK, and the EU. 
                    Orders are typically processed within 1-2 business days. Shipping times 
                    vary by destination, but domestic orders usually arrive within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Returns</h4>
                  <p>
                    If you're not completely satisfied with your purchase, you may return it within 
                    30 days for a full refund. Items must be unused and in their original packaging. 
                    Please note that customized or personalized items cannot be returned unless they 
                    arrive damaged or defective.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 bg-white rounded-lg mt-4">
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {[
                  { name: "Sarah J.", rating: 5, comment: "Absolutely love this product! The quality is outstanding and it looks even better in person." },
                  { name: "Michael R.", rating: 4, comment: "Great product, arrived quickly and as described. Would recommend." },
                  { name: "Emily T.", rating: 5, comment: "Perfect addition to my home. The craftsmanship is evident and it's definitely worth the price." }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.name}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
