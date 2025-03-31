
import { useState } from 'react';
import { customerInsights, recentOrders } from '@/services/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, LineChart, PieChart, Line, Bar, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import {
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  const ageData = customerInsights.demographics.ageGroups.map(group => ({
    name: group.group,
    value: group.count
  }));
  
  const genderData = customerInsights.demographics.gender.map(item => ({
    name: item.type,
    value: item.count
  }));
  
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 7000 },
    { name: 'Jul', value: 8500 },
    { name: 'Aug', value: 7800 },
    { name: 'Sep', value: 9000 },
    { name: 'Oct', value: 10000 },
    { name: 'Nov', value: 9500 },
    { name: 'Dec', value: 12000 }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <h3 className="text-2xl font-bold">{customerInsights.totalCustomers}</h3>
              </div>
            </div>
            <div className="mt-4 text-xs flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+{customerInsights.newCustomersThisMonth} this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Order</p>
                <h3 className="text-2xl font-bold">${customerInsights.orderStatistics.averageOrderValue.toFixed(2)}</h3>
              </div>
            </div>
            <div className="mt-4 text-xs flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{customerInsights.orderStatistics.totalOrders}</h3>
              </div>
            </div>
            <div className="mt-4 text-xs flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Repeat Purchase</p>
                <h3 className="text-2xl font-bold">{(customerInsights.orderStatistics.repeatPurchaseRate * 100).toFixed(0)}%</h3>
              </div>
            </div>
            <div className="mt-4 text-xs flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+3.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                width={500}
                height={300}
              >
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              </LineChart>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="age">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="age">Age</TabsTrigger>
                <TabsTrigger value="gender">Gender</TabsTrigger>
              </TabsList>
              
              <TabsContent value="age" className="h-64 mt-4">
                <BarChart
                  width={500}
                  height={250}
                  data={ageData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <Bar dataKey="value" fill="#8884d8" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </TabsContent>
              
              <TabsContent value="gender" className="h-64 mt-4">
                <PieChart width={500} height={250}>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Count']} />
                </PieChart>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Last 7 days</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">Order</th>
                  <th className="py-3 px-2 text-left font-medium">Customer</th>
                  <th className="py-3 px-2 text-left font-medium">Date</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{order.id}</td>
                    <td className="py-3 px-2">{order.customer}</td>
                    <td className="py-3 px-2">{order.date}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                           'bg-orange-100 text-orange-800'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
