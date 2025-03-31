
import { useState } from 'react';
import { customerInsights } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Download } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  spent: number;
  lastOrder: string;
}

const generateMockCustomers = (count: number): Customer[] => {
  const locations = customerInsights.demographics.locations;
  const customers: Customer[] = [];
  
  for (let i = 0; i < count; i++) {
    const locationIndex = Math.floor(Math.random() * locations.length);
    const orders = Math.floor(Math.random() * 10) + 1;
    
    customers.push({
      id: `CUST-${10000 + i}`,
      name: [
        'Emma Wilson', 'Michael Chen', 'Sophia Rodriguez', 'James Williams', 
        'Olivia Johnson', 'Daniel Kim', 'Ava Martinez', 'Noah Thompson',
        'Isabella Brown', 'Liam Davis', 'Mia Miller', 'Lucas Garcia',
        'Charlotte Smith', 'Ethan Anderson', 'Amelia Taylor', 'Oliver White'
      ][Math.floor(Math.random() * 16)],
      email: `customer${i}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      location: locations[locationIndex].city,
      orders: orders,
      spent: Math.floor(orders * (Math.random() * 200 + 50)),
      lastOrder: `${2023}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    });
  }
  
  return customers;
};

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers] = useState<Customer[]>(generateMockCustomers(50));
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterLocation, setFilterLocation] = useState('all');
  
  const locations = ['all', ...new Set(customers.map(customer => customer.location))];
  
  const filteredAndSortedCustomers = customers
    .filter(customer => 
      (filterLocation === 'all' || customer.location === filterLocation) &&
      (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       customer.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        if (sortBy === 'spent') return a.spent - b.spent;
        if (sortBy === 'orders') return a.orders - b.orders;
        if (sortBy === 'lastOrder') return new Date(a.lastOrder).getTime() - new Date(b.lastOrder).getTime();
        return a[sortBy as keyof Customer].toString().localeCompare(b[sortBy as keyof Customer].toString());
      } else {
        if (sortBy === 'spent') return b.spent - a.spent;
        if (sortBy === 'orders') return b.orders - a.orders;
        if (sortBy === 'lastOrder') return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime();
        return b[sortBy as keyof Customer].toString().localeCompare(a[sortBy as keyof Customer].toString());
      }
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Management</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Customer Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Customers</span>
              <span className="text-2xl font-bold">{customers.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average Orders</span>
              <span className="text-2xl font-bold">
                {(customers.reduce((acc, customer) => acc + customer.orders, 0) / customers.length).toFixed(1)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average Lifetime Value</span>
              <span className="text-2xl font-bold">
                ${(customers.reduce((acc, customer) => acc + customer.spent, 0) / customers.length).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Customer List</CardTitle>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-8"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
                    ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                    Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
                    Location {sortBy === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort('orders')}>
                    Orders {sortBy === 'orders' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort('spent')}>
                    Spent {sortBy === 'spent' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('lastOrder')}>
                    Last Order {sortBy === 'lastOrder' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell className="text-right">{customer.orders}</TableCell>
                    <TableCell className="text-right">${customer.spent}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                  </TableRow>
                ))}
                
                {filteredAndSortedCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No customers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
