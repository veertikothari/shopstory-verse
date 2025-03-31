import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, products } from '@/services/mockData';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { X } from 'lucide-react';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'home', name: 'Home' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'accessories', name: 'Accessories' }
  ];

  // Filter and sort products
  useEffect(() => {
    let result = getProductsByCategory(activeCategory);
    
    // Filter by price
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // featured - keep default order
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const clearFilters = () => {
    setActiveCategory('all');
    setSortBy('featured');
    setPriceRange([0, 150]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Render filters for desktop or mobile
  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center">
              <Button
                variant={activeCategory === category.id ? "default" : "ghost"}
                className={`justify-start text-sm w-full ${
                  activeCategory === category.id ? "" : "text-gray-600"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            min={0}
            max={150}
            step={5}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Shop</h1>
        <p className="text-gray-600 mb-8">Browse our collection of high-quality products</p>
        
        <div className="flex flex-col md:flex-row">
          {/* Mobile filter toggle */}
          {isMobile && (
            <div className="mb-4">
              <Button onClick={toggleFilter} variant="outline" className="w-full justify-between">
                Filters
                {isFilterOpen ? <X className="h-4 w-4 ml-2" /> : <span className="h-4 w-4 ml-2">+</span>}
              </Button>
              
              {/* Mobile filter dropdown */}
              {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg shadow-lg mt-2 border">
                  <FiltersContent />
                </div>
              )}
            </div>
          )}
          
          {/* Desktop filters sidebar */}
          {!isMobile && (
            <div className="md:w-1/4 md:pr-8">
              <FiltersContent />
            </div>
          )}
          
          {/* Products grid */}
          <div className={`${isMobile ? 'w-full' : 'md:w-3/4'}`}>
            {/* Sort dropdown */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
