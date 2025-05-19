import React, { useState, useEffect } from 'react';
import withAuth from '../hoc/withAuth';
import { FaBoxes, FaWarehouse, FaTruck, FaExclamationTriangle, FaChartLine, FaClipboardList, FaSearch, FaFilter, FaCalendarAlt, FaArrowUp, FaArrowDown, FaChartPie, FaChartBar } from 'react-icons/fa';

import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

 function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [inventoryData, setInventoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const allAlerts = [
    { id: 1, severity: 'error', message: 'Product SKU-1234 is out of stock', time: '2h ago', actionRequired: 'Restock', actionLink: '#' },
    { id: 2, severity: 'warning', message: 'Low stock for SKU-5678', time: '4h ago', actionRequired: 'Review', actionLink: '#' },
    { id: 3, severity: 'info', message: 'New shipment arrived', time: '6h ago', actionRequired: 'Process', actionLink: '#' },
    { id: 4, severity: 'error', message: 'Inventory discrepancy detected', time: '1d ago', actionRequired: 'Audit', actionLink: '#' },
    { id: 5, severity: 'warning', message: 'Product SKU-9012 near expiration', time: '1d ago', actionRequired: 'Check', actionLink: '#' },
  ];
  
  const alerts = showAllAlerts ? allAlerts : allAlerts.slice(0, 3);
  

  const topProducts = [
    { name: 'Wireless Headphones', stock: 145, percentage: 85, turnover: 3.2, daysInStock: 45 },
    { name: 'Ergonomic Chair', stock: 78, percentage: 65, turnover: 2.1, daysInStock: 62 },
    { name: 'Laptop Stand', stock: 124, percentage: 75, turnover: 4.5, daysInStock: 28 },
    { name: 'USB-C Hub', stock: 89, percentage: 55, turnover: 3.8, daysInStock: 37 },
  ];

  
  const inventoryStats = {
    totalItems: 1248,
    lowStock: 23,
    outOfStock: 7,
    categories: 15,
    change: 3.2,
   
    turnoverRate: 4.7,
    avgDaysInStock: 76,
    totalValue: 287650,
    stockDistribution: [
      { category: 'Electronics', percentage: 35, value: 100678 },
      { category: 'Furniture', percentage: 25, value: 71912 },
      { category: 'Office Supplies', percentage: 15, value: 43147 },
      { category: 'Clothing', percentage: 10, value: 28765 },
      { category: 'Other', percentage: 15, value: 43148 }
    ],
    monthlyTrend: [
      { month: 'Jan', inbound: 320, outbound: 280 },
      { month: 'Feb', inbound: 350, outbound: 310 },
      { month: 'Mar', inbound: 410, outbound: 390 },
      { month: 'Apr', inbound: 480, outbound: 420 },
      { month: 'May', inbound: 520, outbound: 490 },
      { month: 'Jun', inbound: 490, outbound: 470 }
    ]
  };
  
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(value);
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        setTimeout(() => {
          setInventoryData({
            labels: inventoryStats.monthlyTrend.map(item => item.month),
            datasets: [
              {
                label: 'Inbound',
                data: inventoryStats.monthlyTrend.map(item => item.inbound),
                borderColor: 'rgba(99, 102, 241, 1)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4
              },
              {
                label: 'Outbound',
                data: inventoryStats.monthlyTrend.map(item => item.outbound),
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
              }
            ]
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);

  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const pieData = {
    labels: inventoryStats.stockDistribution.map(item => item.category),
    datasets: [
      {
        data: inventoryStats.stockDistribution.map(item => item.percentage),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header with Date */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <select 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <FaClipboardList /> Generate Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Inventory</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{inventoryStats.totalItems}</p>
              <p className="text-xs text-gray-500 mt-1">Value: {formatCurrency(inventoryStats.totalValue)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaBoxes className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {inventoryStats.change > 0 ? (
              <FaArrowUp className="text-green-500 mr-1" />
            ) : (
              <FaArrowDown className="text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${inventoryStats.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(inventoryStats.change)}%
            </span>
            <span className="text-gray-500 text-sm ml-1">from last {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Warehouse Capacity</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">78%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaWarehouse className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">22% space available</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Shipments</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
              <p className="text-xs text-gray-500 mt-1">Est. value: {formatCurrency(42500)}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <FaTruck className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <FaArrowDown className="text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">4.3%</span>
            <span className="text-gray-500 text-sm ml-1">from last {timeRange}</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{allAlerts.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-red-500 font-medium">{allAlerts.filter(a => a.severity === 'error').length} critical</span>
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs">
              <span className="text-amber-600">{allAlerts.filter(a => a.severity === 'warning').length} warnings</span>
              <span className="text-blue-600">{allAlerts.filter(a => a.severity === 'info').length} info</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaChartLine className="mr-2 text-indigo-600" />
          Inventory Status Overview
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors">
            <p className="text-xs text-gray-500 mb-1">Total Products</p>
            <p className="text-lg font-bold text-gray-800">{inventoryStats.totalItems}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors">
            <p className="text-xs text-gray-500 mb-1">Categories</p>
            <p className="text-lg font-bold text-gray-800">{inventoryStats.categories}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors">
            <p className="text-xs text-gray-500 mb-1">Low Stock</p>
            <p className="text-lg font-bold text-amber-600">{inventoryStats.lowStock}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors">
            <p className="text-xs text-gray-500 mb-1">Out of Stock</p>
            <p className="text-lg font-bold text-red-600">{inventoryStats.outOfStock}</p>
          </div>
        </div>
        
        <div className="h-64 sm:h-72 rounded-lg border border-gray-100 relative p-4 bg-gray-50">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <Line data={inventoryData} options={chartOptions} />
          )}
        </div>
      </div>
      
      {/* Two-column layout for Inventory and Transaction data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Inventory Analytics Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartPie className="mr-2 text-purple-600" />
            Inventory by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 h-64">
            <div className="flex items-center justify-center">
              <Pie data={pieData} />
            </div>
            <div className="p-2 sm:p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Category Distribution</h3>
              <div className="space-y-1">
                {inventoryStats.stockDistribution.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: `rgba(99, 102, 241, ${0.4 + (index * 0.15)})` }}
                      ></div>
                      <span className="ml-2 text-xs text-gray-700">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-800">{category.percentage}%</span>
                      <p className="text-xs text-gray-500">{formatCurrency(category.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Inventory Performance Metrics */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 hover:shadow-md transition-shadow">
              <p className="text-xs text-indigo-700 font-medium mb-1">Turnover Rate</p>
              <p className="text-xl font-bold text-indigo-900">{inventoryStats.turnoverRate}x</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">12% from last period</span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">Avg Days in Stock</p>
              <p className="text-xl font-bold text-indigo-900">{inventoryStats.avgDaysInStock}</p>
              <div className="flex items-center mt-1">
                <FaArrowDown className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">5% from last period</span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">Total Value</p>
              <p className="text-xl font-bold text-indigo-900">{formatCurrency(inventoryStats.totalValue)}</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">8% from last period</span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">Stock Accuracy</p>
              <p className="text-xl font-bold text-indigo-900">97.5%</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">1.2% from last period</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transaction Analytics Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="mr-2 text-indigo-600" />
            Transaction Volume
          </h2>
          
          <div className="h-64 rounded-lg border border-gray-100 relative p-4 bg-gray-50 mb-6">
            <Bar 
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    label: 'Inbound',
                    data: [28, 35, 42, 38, 45, 32, 29],
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                  },
                  {
                    label: 'Outbound',
                    data: [22, 30, 36, 41, 38, 25, 20],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                  }
                ]
              }} 
              options={chartOptions} 
            />
          </div>
          
          {/* Transaction Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">Order Fulfillment Rate</p>
              <p className="text-xl font-bold text-indigo-900">94.8%</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">2.1% from last period</span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">Avg Processing Time</p>
              <p className="text-xl font-bold text-indigo-900">1.2 days</p>
              <div className="flex items-center mt-1">
                <FaArrowDown className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">0.3 days from last period</span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">On-Time Delivery</p>
              <p className="text-xl font-bold text-indigo-900">92.3%</p>
              <div className="flex items-center mt-1">
                <FaArrowUp className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">3.5% from last period</span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 font-medium mb-1">Return Rate</p>
              <p className="text-xl font-bold text-indigo-900">2.4%</p>
              <div className="flex items-center mt-1">
                <FaArrowDown className="text-green-500 mr-1 text-xs" />
                <span className="text-xs text-green-600">0.8% from last period</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom row with Top Products and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Products */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="mr-2 text-indigo-600" />
            Top Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{product.name}</span>
                  <span className="text-sm text-gray-500">{product.stock} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Turnover: {product.turnover}x</span>
                  <span>{product.daysInStock} days in stock</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            View All Products
          </button>
        </div>
        
        {/* Alerts Panel */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaExclamationTriangle className="mr-2 text-amber-500" />
              Recent Alerts
            </h2>
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {allAlerts.length} total
            </span>
          </div>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg ${
                  alert.severity === 'error' ? 'bg-red-50 border-l-4 border-red-500' : 
                  alert.severity === 'warning' ? 'bg-amber-50 border-l-4 border-amber-500' : 
                  'bg-blue-50 border-l-4 border-blue-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-sm ${
                    alert.severity === 'error' ? 'text-red-700' : 
                    alert.severity === 'warning' ? 'text-amber-700' : 
                    'text-blue-700'
                  }`}>
                    {alert.message}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.time}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Action required: {alert.actionRequired}</span>
                  <a href={alert.actionLink} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                    Take Action
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="mt-4 w-full py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
            onClick={() => setShowAllAlerts(!showAllAlerts)}
          >
            {showAllAlerts ? 'Show Less' : 'View All Alerts'}
          </button>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Dashboard);
