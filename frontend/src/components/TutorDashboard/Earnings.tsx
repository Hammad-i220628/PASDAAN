import React, { useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';

interface Transaction {
  id: string;
  studentName: string;
  subject: string;
  sessionType: string;
  duration: string;
  date: string;
  amount: number;
}

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedTransactionType, setSelectedTransactionType] = useState('All Transaction');
  const [selectedMonth, setSelectedMonth] = useState('March 2025');

  const monthlyData = [
    { month: 'Jan', amount: 12500, display: 'Rs. 12,500' },
    { month: 'Feb', amount: 18000, display: 'Rs. 18,000' },
    { month: 'Mar', amount: 16500, display: 'Rs. 16,500' },
    { month: 'Apr', amount: 21000, display: 'Rs. 21,000' },
    { month: 'May', amount: 24500, display: 'Rs. 24,500' },
    { month: 'Jun', amount: 19800, display: 'Rs. 19,800' }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      studentName: 'Ahmed K.',
      subject: 'Mathematics',
      sessionType: 'Calculus',
      duration: '2 hour session',
      date: 'March 18, 2025',
      amount: 1800
    },
    {
      id: '2',
      studentName: 'Fatima S.',
      subject: 'Physics',
      sessionType: 'Mechanics',
      duration: '1.5 hour session',
      date: 'March 16, 2025',
      amount: 1350
    },
    {
      id: '3',
      studentName: 'Zain M.',
      subject: 'Mathematics',
      sessionType: 'Algebra',
      duration: '2 hour session',
      date: 'March 15, 2025',
      amount: 1800
    },
    {
      id: '4',
      studentName: 'Ayesha M.',
      subject: 'Chemistry',
      sessionType: 'Organic Chemistry',
      duration: '2 hour session',
      date: 'March 14, 2025',
      amount: 1800
    },
    {
      id: '5',
      studentName: 'Bilal K.',
      subject: 'Physics',
      sessionType: 'Electromagnetism',
      duration: '1.5 hour session',
      date: 'March 10, 2025',
      amount: 1350
    }
  ];

  const maxAmount = Math.max(...monthlyData.map(item => item.amount));

  const totalEarnings = 124500;
  const thisMonth = 24800;
  const pendingPayout = 15600;
  const nextPayoutDate = 'Thursday, March 27, 2025';
  const estimatedAmount = 'Rs. 16,600';

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Earnings</h1>
          
          {/* Tabs */}
          <div className="flex space-x-4 md:space-x-8 border-b border-gray-200 overflow-x-auto">
            <button className="pb-3 md:pb-4 text-sm md:text-base text-blue-900 border-b-2 border-blue-900 font-medium whitespace-nowrap">
              Overview
            </button>
            <button className="pb-3 md:pb-4 text-sm md:text-base text-gray-500 hover:text-gray-700 whitespace-nowrap">
              Transactions
            </button>
            <button className="pb-3 md:pb-4 text-sm md:text-base text-gray-500 hover:text-gray-700 whitespace-nowrap">
              Payout Settings
            </button>
          </div>
        </div>

        {/* Payout Info */}
        <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <div className="text-xs md:text-sm text-gray-700">
            <p className="mb-1">
              <span className="font-semibold text-gray-900">Next payout:</span> {nextPayoutDate}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Estimated amount:</span> {estimatedAmount}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Total Earnings</h3>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">Rs. {totalEarnings.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2">This Month</h3>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">Rs. {thisMonth.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Pending Payout</h3>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">Rs. {pendingPayout.toLocaleString()}</p>
          </div>
        </div>

        {/* Monthly Earnings Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Monthly Earnings</h2>
            <button className="text-xs md:text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>

          {/* Chart Controls */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
            <div className="relative">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 md:px-4 py-2 pr-6 md:pr-8 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 md:px-4 py-2 pr-6 md:pr-8 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-end justify-between gap-1 md:gap-4 h-48 md:h-64">
              {monthlyData.map((data, index) => {
                const heightPercentage = (data.amount / maxAmount) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center mb-2 md:mb-4">
                      <span className="text-xs font-medium text-gray-900 mb-1 md:mb-2 hidden md:block">
                        {data.display}
                      </span>
                      <span className="text-xs font-medium text-gray-900 mb-1 block md:hidden">
                        {data.amount/1000}k
                      </span>
                      <div className="w-full bg-green-300 rounded-sm" style={{ height: `${heightPercentage * (window.innerWidth < 768 ? 1.2 : 1.8)}px` }}>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-xs md:text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>

          {/* Transaction Controls */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="relative">
              <select 
                value={selectedTransactionType}
                onChange={(e) => setSelectedTransactionType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 md:px-4 py-2 pr-6 md:pr-8 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Transaction</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Refunded</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 md:px-4 py-2 pr-6 md:pr-8 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>March 2025</option>
                <option>February 2025</option>
                <option>January 2025</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3 md:space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 md:py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 truncate">
                        {transaction.studentName} - {transaction.subject}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-1">
                        {transaction.sessionType} • {transaction.duration}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base md:text-lg font-semibold text-green-600 mb-1">
                        Rs. {transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
