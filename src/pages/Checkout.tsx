
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CreditCard, CheckCircle } from 'lucide-react';

enum CheckoutStep {
  INFORMATION,
  SHIPPING,
  PAYMENT,
  CONFIRMATION
}

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.INFORMATION);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvc: ''
  });

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.SHIPPING);
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.PAYMENT);
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    setIsSubmitting(true);
    
    try {
      // Fake API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - show confirmation
      setCurrentStep(CheckoutStep.CONFIRMATION);
      clearCart();
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const getShippingCost = () => {
    switch (shippingMethod) {
      case 'express':
        return 14.99;
      case 'priority':
        return 9.99;
      default:
        return totalPrice >= 50 ? 0 : 4.99;
    }
  };
  
  const getTotal = () => {
    const shipping = getShippingCost();
    const tax = totalPrice * 0.08; // Simulating 8% tax
    return totalPrice + shipping + tax;
  };

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        {currentStep !== CheckoutStep.CONFIRMATION && (
          <div className="flex mb-8">
            <div className={`flex-1 text-center border-b-2 pb-2 ${
              currentStep >= CheckoutStep.INFORMATION ? 'border-primary text-primary' : 'border-gray-200 text-gray-500'
            }`}>
              Information
            </div>
            <div className={`flex-1 text-center border-b-2 pb-2 ${
              currentStep >= CheckoutStep.SHIPPING ? 'border-primary text-primary' : 'border-gray-200 text-gray-500'
            }`}>
              Shipping
            </div>
            <div className={`flex-1 text-center border-b-2 pb-2 ${
              currentStep >= CheckoutStep.PAYMENT ? 'border-primary text-primary' : 'border-gray-200 text-gray-500'
            }`}>
              Payment
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="md:col-span-2">
            {currentStep === CheckoutStep.INFORMATION && (
              <form onSubmit={handleInfoSubmit} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={customerInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={customerInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mt-8 mb-6">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country/Region</Label>
                    <Select
                      value={customerInfo.country}
                      onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      value={customerInfo.apartment}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={customerInfo.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={customerInfo.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button type="submit" className="w-full">
                    Continue to Shipping
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === CheckoutStep.SHIPPING && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
                
                <RadioGroup 
                  value={shippingMethod} 
                  onValueChange={setShippingMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">
                        Standard Shipping (3-5 business days)
                      </Label>
                    </div>
                    <div>
                      {totalPrice >= 50 ? 'Free' : '$4.99'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="priority" id="priority" />
                      <Label htmlFor="priority" className="cursor-pointer">
                        Priority Shipping (2-3 business days)
                      </Label>
                    </div>
                    <div>$9.99</div>
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="cursor-pointer">
                        Express Shipping (1-2 business days)
                      </Label>
                    </div>
                    <div>$14.99</div>
                  </div>
                </RadioGroup>
                
                <div className="mt-8 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(CheckoutStep.INFORMATION)}
                  >
                    Back to Information
                  </Button>
                  <Button type="submit">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === CheckoutStep.PAYMENT && (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-4 mb-6"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="cursor-pointer flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardInfoChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      name="nameOnCard"
                      value={cardInfo.nameOnCard}
                      onChange={handleCardInfoChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date (MM/YY)</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardInfoChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        value={cardInfo.cvc}
                        onChange={handleCardInfoChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                  >
                    Back to Shipping
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === CheckoutStep.CONFIRMATION && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mb-6 flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-6">
                  Your order has been placed and is being processed. You will receive an email confirmation shortly.
                </p>
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Order Reference: <span className="font-semibold">ORD-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                </div>
                <Button onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          {currentStep !== CheckoutStep.CONFIRMATION && (
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex py-4 border-b">
                      <div className="flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between text-sm font-medium">
                          <h3 className="text-gray-900">{item.name}</h3>
                          <p className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${totalPrice.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}
                    </dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">${(totalPrice * 0.08).toFixed(2)}</dd>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <dt className="text-base font-medium text-gray-900">Total</dt>
                      <dd className="text-base font-bold text-gray-900">${getTotal().toFixed(2)}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
