
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import { Truck, ShoppingBag, Star, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock product data
const product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  price: 299.99,
  discount: 20,
  rating: 4.8,
  reviews: 238,
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ],
  colors: ['Black', 'White', 'Space Gray'],
  description:
    'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.',
  features: [
    'Active Noise Cancellation',
    'Hi-Fi Sound Quality',
    '30-hour Battery Life',
    'Quick Charge (5min for 3hr playback)',
    'Bluetooth 5.2',
    'Comfortable Memory Foam Ear Cushions',
    'Touch Controls',
    'Voice Assistant Compatible',
  ],
  details:
    'Our Premium Wireless Headphones combine cutting-edge technology with superior comfort. The advanced 40mm drivers deliver rich, balanced audio across all frequencies. The active noise cancellation adapts to your environment, providing the perfect level of sound isolation. With premium materials and ergonomic design, these headphones are designed for extended listening sessions.',
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 40kHz',
    'Impedance': '32Ω',
    'Bluetooth Version': '5.2',
    'Codec Support': 'AAC, SBC, aptX HD, LDAC',
    'Battery Life': '30 hours (ANC on), 40 hours (ANC off)',
    'Charging Time': '2 hours',
    'Weight': '250g',
  },
  stock: 15,
  related: [
    {
      id: '2',
      name: 'Wireless Earbuds',
      price: 149.99,
      image: '/placeholder.svg',
      rating: 4.5,
    },
    {
      id: '3',
      name: 'Over-Ear Studio Headphones',
      price: 349.99,
      image: '/placeholder.svg',
      rating: 4.9,
    },
    {
      id: '4',
      name: 'Noise-Cancelling Travel Headphones',
      price: 279.99,
      image: '/placeholder.svg',
      rating: 4.7,
    },
  ],
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  const discountedPrice = product.price - (product.price * (product.discount / 100));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.images[0],
      quantity,
      color: selectedColor,
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedColor})`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Home</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Products</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900 font-medium">Premium Headphones</span>
        </div>

        {/* Product overview */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded border ${
                    selectedImage === index
                      ? 'border-blue-600'
                      : 'border-gray-200'
                  } overflow-hidden`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <span className="text-gray-600">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500">{product.discount}% OFF</Badge>
                </>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-3 py-1 border rounded-full ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1" size="lg">
                Buy Now
              </Button>
            </div>

            <div className="flex items-center text-gray-600 pt-4">
              <Truck className="h-5 w-5 mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-6">
              <p className="text-gray-700 leading-relaxed">{product.details}</p>
            </TabsContent>
            <TabsContent value="features" className="py-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-green-50 p-1 mr-3 mt-0.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <p className="text-gray-500">
                Product reviews will be displayed here.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.related.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden product-card">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
