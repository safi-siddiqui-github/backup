import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Gift, Package, Download, CheckCircle2, Truck } from "lucide-react";
import { SwagItem, MerchandiseProduct, MerchandiseOrder } from "@/types/merchandise";

interface GuestMerchandiseViewProps {
  event: any;
}

const GuestMerchandiseView = ({ event }: GuestMerchandiseViewProps) => {
  const [promoCode, setPromoCode] = useState("");

  const mockSwagItems: SwagItem[] = useMemo(() => [
    { id: '1', name: 'Event T-Shirt', description: 'Premium cotton t-shirt with event logo', category: 'apparel', received: true, receivedDate: new Date() },
    { id: '2', name: 'Water Bottle', description: 'Insulated stainless steel water bottle', category: 'accessories', received: true, receivedDate: new Date() },
    { id: '3', name: 'Notebook', description: 'Leather-bound notebook with pen', category: 'stationery', received: true, receivedDate: new Date() },
    { id: '4', name: 'Tech Organizer', description: 'Cable organizer pouch', category: 'tech', received: true, receivedDate: new Date() },
    { id: '5', name: 'Sticker Pack', description: 'Event and sponsor stickers', category: 'accessories', received: true, receivedDate: new Date() },
    { id: '6', name: 'Phone Stand', description: 'Foldable phone stand', category: 'tech', received: true, receivedDate: new Date() },
    { id: '7', name: 'Tote Bag', description: 'Canvas tote bag', category: 'accessories', received: true, receivedDate: new Date() },
    { id: '8', name: 'Badge Holder', description: 'Premium badge holder with lanyard', category: 'accessories', received: true, receivedDate: new Date() },
  ], []);

  const mockStoreProducts: MerchandiseProduct[] = useMemo(() => [
    { id: '1', name: 'Premium Hoodie', description: 'High-quality hoodie with embroidered logo', price: 65, category: 'apparel', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'Gray'], inStock: true, stock: 50 },
    { id: '2', name: 'Baseball Cap', description: 'Adjustable cap with event branding', price: 25, category: 'apparel', colors: ['Black', 'White', 'Navy'], inStock: true, stock: 100 },
    { id: '3', name: 'Coffee Mug', description: 'Ceramic mug with event design', price: 15, category: 'accessories', inStock: true, stock: 200 },
    { id: '4', name: 'Tech Backpack', description: 'Laptop backpack with multiple compartments', price: 85, category: 'accessories', colors: ['Black', 'Gray'], inStock: true, stock: 30 },
    { id: '5', name: 'Wireless Charger', description: 'Fast wireless charging pad', price: 45, category: 'tech', inStock: true, stock: 75 },
    { id: '6', name: 'Bluetooth Speaker', description: 'Portable speaker with event branding', price: 55, category: 'tech', inStock: true, stock: 40 },
  ], []);

  const mockOrders: MerchandiseOrder[] = useMemo(() => [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: new Date(Date.now() - 7 * 86400000),
      items: [
        { product: mockStoreProducts[0], quantity: 1, size: 'L', color: 'Black' },
        { product: mockStoreProducts[2], quantity: 2 }
      ],
      subtotal: 95,
      tax: 8.55,
      shipping: 10,
      total: 113.55,
      status: 'delivered',
      trackingNumber: 'TRK123456789'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: new Date(Date.now() - 3 * 86400000),
      items: [
        { product: mockStoreProducts[1], quantity: 1, color: 'Navy' },
        { product: mockStoreProducts[4], quantity: 1 }
      ],
      subtotal: 70,
      tax: 6.30,
      shipping: 10,
      total: 86.30,
      status: 'shipped',
      trackingNumber: 'TRK987654321'
    },
  ], [mockStoreProducts]);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-600" />
            Merchandise & Swag
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            View your swag bag, shop event merchandise, and track orders
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-pink-600">{mockSwagItems.length}</div>
              <div className="text-sm text-muted-foreground">Swag Items</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{mockOrders.length}</div>
              <div className="text-sm text-muted-foreground">Orders Placed</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-green-600">${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="swag" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="swag">Swag Bag</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="redeem">Redeem Code</TabsTrigger>
        </TabsList>

        <TabsContent value="swag" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockSwagItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Gift className="w-8 h-8 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.received && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      {item.received && (
                        <p className="text-xs text-green-600 mt-2">✓ Received</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="store" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockStoreProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="text-lg font-bold text-pink-600">${product.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.colors?.map((color) => (
                          <Badge key={color} variant="outline" className="text-xs">{color}</Badge>
                        ))}
                        {product.sizes?.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs">{size}</Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    Order {order.orderNumber}
                  </span>
                  <Badge className={
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }>
                    {order.status === 'delivered' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {order.status === 'shipped' && <Truck className="w-3 h-3 mr-1" />}
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Order Date: {order.date.toLocaleDateString()}
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.product.name} {item.size && `(${item.size})`} {item.color && `- ${item.color}`} × {item.quantity}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-2 border-t">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  {order.trackingNumber && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tracking: </span>
                      <span className="font-mono">{order.trackingNumber}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                    {order.trackingNumber && (
                      <Button size="sm" variant="outline">Track Package</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="redeem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redeem Promo Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Have a promo code? Enter it below to unlock special discounts or free items!
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="uppercase"
                />
                <Button>Apply</Button>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Active Promotions:</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-green-700">VIP50</span>
                        <p className="text-sm text-muted-foreground">50% off all merchandise</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestMerchandiseView;
