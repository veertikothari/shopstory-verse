
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  
  // General settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ShopStory',
    storeEmail: 'support@shopstory.com',
    storePhone: '+1 (800) 555-1234',
    currency: 'usd',
    timezone: 'EST',
    address: '123 Design Street, San Francisco, CA 94103'
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
    customerReview: false,
    newCustomer: true,
    emailNotifications: true,
    smsNotifications: false
  });
  
  // Tax settings
  const [taxSettings, setTaxSettings] = useState({
    automaticTax: true,
    taxRate: '8',
    taxOnShipping: false,
    enableVAT: false,
    vatNumber: ''
  });
  
  // Shipping settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '50',
    standardShippingRate: '4.99',
    priorityShippingRate: '9.99',
    expressShippingRate: '14.99',
    internationalShipping: false
  });
  
  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (field: string) => {
    setNotificationSettings(prev => ({ 
      ...prev, 
      [field]: !prev[field as keyof typeof notificationSettings] 
    }));
  };
  
  const handleTaxSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTaxToggle = (field: string) => {
    setTaxSettings(prev => ({ 
      ...prev, 
      [field]: !prev[field as keyof typeof taxSettings] 
    }));
  };
  
  const handleShippingSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingToggle = (field: string) => {
    setShippingSettings(prev => ({ 
      ...prev, 
      [field]: !prev[field as keyof typeof shippingSettings] 
    }));
  };
  
  const handleSaveSettings = (type: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`${type} settings saved successfully`);
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Store Settings</h2>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={storeSettings.storeName}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={storeSettings.storePhone}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={storeSettings.currency}
                    onValueChange={(value) => setStoreSettings(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD ($)</SelectItem>
                      <SelectItem value="aud">AUD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={storeSettings.timezone}
                    onValueChange={(value) => setStoreSettings(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                      <SelectItem value="CST">Central Time (CST)</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Store Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={storeSettings.address}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('General')}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Order Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                    <p className="text-sm text-gray-500">
                      Send confirmation when a new order is placed
                    </p>
                  </div>
                  <Switch
                    id="orderConfirmation"
                    checked={notificationSettings.orderConfirmation}
                    onCheckedChange={() => handleNotificationToggle('orderConfirmation')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderShipped">Order Shipped</Label>
                    <p className="text-sm text-gray-500">
                      Send notification when an order is shipped
                    </p>
                  </div>
                  <Switch
                    id="orderShipped"
                    checked={notificationSettings.orderShipped}
                    onCheckedChange={() => handleNotificationToggle('orderShipped')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderDelivered">Order Delivered</Label>
                    <p className="text-sm text-gray-500">
                      Send notification when an order is delivered
                    </p>
                  </div>
                  <Switch
                    id="orderDelivered"
                    checked={notificationSettings.orderDelivered}
                    onCheckedChange={() => handleNotificationToggle('orderDelivered')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Admin Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lowStockAlert">Low Stock Alert</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when product stock is low
                    </p>
                  </div>
                  <Switch
                    id="lowStockAlert"
                    checked={notificationSettings.lowStockAlert}
                    onCheckedChange={() => handleNotificationToggle('lowStockAlert')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="customerReview">Customer Reviews</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications for new customer reviews
                    </p>
                  </div>
                  <Switch
                    id="customerReview"
                    checked={notificationSettings.customerReview}
                    onCheckedChange={() => handleNotificationToggle('customerReview')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newCustomer">New Customers</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when new customers register
                    </p>
                  </div>
                  <Switch
                    id="newCustomer"
                    checked={notificationSettings.newCustomer}
                    onCheckedChange={() => handleNotificationToggle('newCustomer')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send notifications via SMS
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('Notification')}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="automaticTax">Automatic Tax Calculation</Label>
                  <p className="text-sm text-gray-500">
                    Automatically calculate taxes based on customer location
                  </p>
                </div>
                <Switch
                  id="automaticTax"
                  checked={taxSettings.automaticTax}
                  onCheckedChange={() => handleTaxToggle('automaticTax')}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    name="taxRate"
                    type="number"
                    value={taxSettings.taxRate}
                    onChange={handleTaxSettingsChange}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="taxOnShipping">Apply Tax to Shipping</Label>
                  <p className="text-sm text-gray-500">
                    Include shipping costs in tax calculations
                  </p>
                </div>
                <Switch
                  id="taxOnShipping"
                  checked={taxSettings.taxOnShipping}
                  onCheckedChange={() => handleTaxToggle('taxOnShipping')}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableVAT">Enable VAT/GST</Label>
                    <p className="text-sm text-gray-500">
                      Apply Value Added Tax or Goods and Services Tax
                    </p>
                  </div>
                  <Switch
                    id="enableVAT"
                    checked={taxSettings.enableVAT}
                    onCheckedChange={() => handleTaxToggle('enableVAT')}
                  />
                </div>
                
                {taxSettings.enableVAT && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vatNumber">VAT/GST Registration Number</Label>
                      <Input
                        id="vatNumber"
                        name="vatNumber"
                        value={taxSettings.vatNumber}
                        onChange={handleTaxSettingsChange}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('Tax')}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="freeShippingThreshold"
                      name="freeShippingThreshold"
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={handleShippingSettingsChange}
                    />
                    <div className="flex items-center text-xs text-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Orders above this amount qualify for free shipping
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Rates</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingRate">Standard Shipping ($)</Label>
                    <Input
                      id="standardShippingRate"
                      name="standardShippingRate"
                      type="number"
                      value={shippingSettings.standardShippingRate}
                      onChange={handleShippingSettingsChange}
                    />
                    <p className="text-xs text-gray-500">3-5 business days</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priorityShippingRate">Priority Shipping ($)</Label>
                    <Input
                      id="priorityShippingRate"
                      name="priorityShippingRate"
                      type="number"
                      value={shippingSettings.priorityShippingRate}
                      onChange={handleShippingSettingsChange}
                    />
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expressShippingRate">Express Shipping ($)</Label>
                    <Input
                      id="expressShippingRate"
                      name="expressShippingRate"
                      type="number"
                      value={shippingSettings.expressShippingRate}
                      onChange={handleShippingSettingsChange}
                    />
                    <p className="text-xs text-gray-500">1-2 business days</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="internationalShipping">International Shipping</Label>
                  <p className="text-sm text-gray-500">
                    Enable shipping to international addresses
                  </p>
                </div>
                <Switch
                  id="internationalShipping"
                  checked={shippingSettings.internationalShipping}
                  onCheckedChange={() => handleShippingToggle('internationalShipping')}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('Shipping')}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
